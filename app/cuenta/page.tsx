import {WorkSidebar} from '@/components/work-sidebar';
import {ProfileEditor,type EditableProfile} from '@/components/profile-editor';
import {requireUser} from '@/lib/db';
import {createClient} from '@/utils/supabase/server';

export default async function MiPerfil({searchParams}:{searchParams:Promise<{notice?:string,error?:string}>}) {
  const user=await requireUser();
  const sb=await createClient();
  const [profileRes,params]=await Promise.all([
    sb.from('profiles').select('full_name,phone,country,city,address,birth_date,occupation,bio,avatar_path').eq('id',user.id).maybeSingle(),
    searchParams,
  ]);
  const profile:EditableProfile=profileRes.data||{
    full_name:user.user_metadata?.full_name??null,phone:null,country:null,city:null,address:null,birth_date:null,occupation:null,bio:null,avatar_path:null,
  };
  return <div className="elart-workspace"><WorkSidebar/><main className="elart-content" id="contenido">
    <header className="elart-workspace-header"><div><span className="elart-eyebrow">MI CUENTA</span><h1>Mi perfil</h1><p>Tu identidad dentro de Elart Academia, bajo tu control.</p></div></header>
    {params.notice?<div className="alert success" role="status">{params.notice}</div>:null}
    {params.error?<div className="alert error" role="alert">{params.error}</div>:null}
    {profileRes.error?<div className="elart-inline-warning">La base de datos todavía no tiene los campos del perfil avanzado. Ejecuta la migración incluida en el parche.</div>:null}
    <ProfileEditor userId={user.id} email={user.email||''} profile={profile} createdAt={new Date(user.created_at).toLocaleDateString('es-BO',{month:'long',year:'numeric'})}/>
  </main></div>;
}
