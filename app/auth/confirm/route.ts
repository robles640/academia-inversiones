import {NextRequest,NextResponse} from 'next/server';import {createClient} from '@/utils/supabase/server';
export async function GET(req:NextRequest){const token_hash=req.nextUrl.searchParams.get('token_hash');const type=req.nextUrl.searchParams.get('type') as 'signup'|'recovery'|'email'|null;const base=req.nextUrl.origin;
 if(token_hash&&type){const sb=await createClient();const {error}=await sb.auth.verifyOtp({token_hash,type});if(!error)return NextResponse.redirect(new URL(type==='recovery'?'/nueva-contrasena':'/dashboard',base));}
 return NextResponse.redirect(new URL('/login?error=No%20se%20pudo%20confirmar%20el%20correo.',base));}
