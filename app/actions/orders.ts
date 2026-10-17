'use server';
import {redirect} from 'next/navigation';import {revalidatePath} from 'next/cache';
import {requireUser,isConfigured} from '@/lib/db';import {createClient} from '@/utils/supabase/server';
export async function createOrder(formData:FormData){const slug=String(formData.get('slug')||'');if(!isConfigured())redirect('/checkout/'+slug+'?error=Configura Supabase para recibir inscripciones.');const user=await requireUser('/login?next=/checkout/'+slug);const sb=await createClient();const {data:course}=await sb.from('courses').select('id,status').eq('slug',slug).single();if(!course||course.status!=='published')redirect('/cursos/'+slug);
 const {data:enrollment}=await sb.from('enrollments').select('id').eq('course_id',course.id).eq('user_id',user.id).maybeSingle();if(enrollment)redirect('/dashboard');
 const {data:previous}=await sb.from('orders').select('id').eq('course_id',course.id).eq('user_id',user.id).eq('status','pending').order('created_at',{ascending:false}).limit(1).maybeSingle();if(previous)redirect('/pago/'+previous.id);
 const {data:order,error}=await sb.from('orders').insert({user_id:user.id,course_id:course.id,amount_usd:0}).select('id').single();if(error||!order)redirect('/checkout/'+slug+'?error=No se pudo crear la solicitud. Inténtalo nuevamente.');redirect('/pago/'+order.id);
}
export async function markComplete(lessonId:string){const user=await requireUser();const sb=await createClient();const {error}=await sb.from('lesson_progress').upsert({user_id:user.id,lesson_id:lessonId},{onConflict:'user_id,lesson_id'});if(error)throw new Error('No se pudo guardar el progreso');revalidatePath('/dashboard');}
