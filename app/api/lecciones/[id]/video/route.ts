import {NextResponse,type NextRequest} from 'next/server';
import {createClient} from '@/utils/supabase/server';

export async function GET(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const sb=await createClient();
  const {data:{user}}=await sb.auth.getUser();
  if(!user)return NextResponse.json({error:'No autenticado'},{status:401});
  const {data:lesson}=await sb.from('lessons').select('id,is_preview,module_id').eq('id',id).single();
  if(!lesson)return NextResponse.json({error:'Lección no encontrada'},{status:404});
  const {data:module}=await sb.from('modules').select('course_id').eq('id',lesson.module_id).single();
  if(!module)return NextResponse.json({error:'Módulo no encontrado'},{status:404});

  // En vez de tres consultas en serie, las comprobaciones independientes se hacen en paralelo.
  const [enrollment,profile,mediaResult]=await Promise.all([
    sb.from('enrollments').select('id').eq('user_id',user.id).eq('course_id',module.course_id).maybeSingle(),
    sb.from('profiles').select('role').eq('id',user.id).maybeSingle(),
    sb.from('lesson_media').select('storage_path,external_url').eq('lesson_id',id).maybeSingle(),
  ]);
  if(enrollment.error||profile.error||mediaResult.error){
    return NextResponse.json({error:'No se pudo verificar el acceso a la lección'},{status:503});
  }
  if(!enrollment.data&&profile.data?.role!=='admin'&&!lesson.is_preview){
    return NextResponse.json({error:'No matriculado'},{status:403});
  }
  const media=mediaResult.data;
  const headers={'Cache-Control':'private,no-store'};
  if(!media)return NextResponse.json({kind:'none'},{headers});
  if(media.storage_path){
    const {data,error}=await sb.storage.from('lesson-videos').createSignedUrl(media.storage_path,15*60);
    if(error||!data)return NextResponse.json({error:'No se pudo generar la reproducción'},{status:404});
    return NextResponse.json({kind:'video',url:data.signedUrl},{headers});
  }
  if(media.external_url?.startsWith('https://www.youtube.com/embed/')){
    return NextResponse.json({kind:'embed',url:media.external_url},{headers});
  }
  return NextResponse.json({kind:'none'},{headers});
}
