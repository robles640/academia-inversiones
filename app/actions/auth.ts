'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {createClient} from '@/utils/supabase/server';
import {isConfigured} from '@/lib/db';
import {isStrongPassword,PASSWORD_HINT} from '@/lib/password-policy';
function errorUrl(path:string,error:string){return `${path}?error=${encodeURIComponent(error)}`}
export async function login(formData:FormData){if(!isConfigured())redirect(errorUrl('/login','Configura Supabase en .env.local para iniciar sesión.'));
 const sb=await createClient();const email=String(formData.get('email')||'').trim();const password=String(formData.get('password')||'');const {error}=await sb.auth.signInWithPassword({email,password});if(error)redirect(errorUrl('/login','No se pudo iniciar sesión. Revisa tus credenciales y confirma tu correo.'));
 revalidatePath('/','layout');const next=String(formData.get('next')||'/dashboard');redirect(next.startsWith('/')&&!next.startsWith('//')&&!next.includes('\\')?next:'/dashboard');}
export async function register(formData:FormData){if(!isConfigured())redirect(errorUrl('/registro','Configura Supabase antes de registrar usuarios.'));
 const sb=await createClient();const full_name=String(formData.get('full_name')||'').trim().slice(0,160);const email=String(formData.get('email')||'').trim();const password=String(formData.get('password')||'');if(!isStrongPassword(password))redirect(errorUrl('/registro',PASSWORD_HINT));
 const {data,error}=await sb.auth.signUp({email,password,options:{data:{full_name},emailRedirectTo:`${process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'}/dashboard`}});if(error)redirect(errorUrl('/registro','No pudimos crear la cuenta. Revisa los datos o prueba con otro correo.'));if(!data.session)redirect('/login?notice=Revisa tu correo para confirmar la cuenta.');redirect('/dashboard');}
export async function recover(formData:FormData){if(!isConfigured())redirect('/recuperar?error=Configura Supabase.');const sb=await createClient();const email=String(formData.get('email')||'').trim();const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:`${process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'}/nueva-contrasena`});if(error){console.error('Supabase no pudo tramitar la solicitud de recuperación:',error.message);redirect(errorUrl('/recuperar','No pudimos tramitar la solicitud. Reintenta en unos minutos o contacta a soporte.'));}redirect('/recuperar?notice=Si el correo está registrado, recibirás instrucciones.');}
export async function logout(){if(isConfigured()){const sb=await createClient();await sb.auth.signOut();}revalidatePath('/','layout');redirect('/');}
export async function saveProfile(formData:FormData){
 const sb=await createClient();
 const {data:{user}}=await sb.auth.getUser();
 if(!user)redirect('/login');
 const str=(key:string,max:number)=>String(formData.get(key)||'').trim().slice(0,max);
 const name=str('full_name',150);
 if(name.length<2)redirect('/cuenta?error=Ingresa%20tu%20nombre%20completo');
 const rawDate=str('birth_date',10);
 const validDate=!rawDate||(/^\d{4}-\d{2}-\d{2}$/.test(rawDate)&&!Number.isNaN(Date.parse(rawDate))&&rawDate<=new Date().toISOString().slice(0,10)&&rawDate>='1900-01-01');
 if(!validDate)redirect('/cuenta?error=Fecha%20de%20nacimiento%20invalida');
 const {error}=await sb.from('profiles').update({
  full_name:name,
  phone:str('phone',30),
  country:str('country',80),
  city:str('city',100),
  address:str('address',250),
  birth_date:rawDate||null,
  occupation:str('occupation',120),
  bio:str('bio',500),
 }).eq('id',user.id);
 if(error)redirect('/cuenta?error='+encodeURIComponent('No se pudo guardar: '+error.message));
 revalidatePath('/cuenta');revalidatePath('/dashboard');
 redirect('/cuenta?notice=Tus%20datos%20se%20guardaron%20correctamente');
}
export async function updatePassword(formData:FormData){const sb=await createClient();const {data:{user}}=await sb.auth.getUser();if(!user)redirect('/login');const password=String(formData.get('password')||'');if(!isStrongPassword(password))redirect('/nueva-contrasena?error='+encodeURIComponent(PASSWORD_HINT));const {error}=await sb.auth.updateUser({password});if(error)redirect('/nueva-contrasena?error=No se pudo actualizar la contraseña.');redirect('/dashboard?notice=Contraseña actualizada');}
