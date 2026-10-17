'use client';

import Image from 'next/image';
import {useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {useFormStatus} from 'react-dom';
import {Camera,CheckCircle2,ImagePlus,Loader2,LockKeyhole,Mail,MapPin,ShieldCheck,UserRound} from 'lucide-react';
import {createClient} from '@/utils/supabase/client';
import {saveProfile} from '@/app/actions/auth';

export type EditableProfile={
  full_name:string|null;
  phone:string|null;
  country:string|null;
  city:string|null;
  address:string|null;
  birth_date:string|null;
  occupation:string|null;
  bio:string|null;
  avatar_path:string|null;
};

function SaveButton(){const {pending}=useFormStatus();return <button className="elart-button elart-button-primary" type="submit" disabled={pending}>{pending?<Loader2 size={17} className="elart-spin"/>:<CheckCircle2 size={17}/>} {pending?'Guardando cambios…':'Guardar cambios'}</button>}

export function ProfileEditor({userId,email,profile,createdAt}:{userId:string,email:string,profile:EditableProfile,createdAt:string}){
  const router=useRouter();
  const input=useRef<HTMLInputElement>(null);
  const [uploading,setUploading]=useState(false);
  const [feedback,setFeedback]=useState('');
  const sb=createClient();
  const publicUrl=profile.avatar_path ? sb.storage.from('elart-profile-avatars').getPublicUrl(profile.avatar_path).data.publicUrl : null;
  const initials=(profile.full_name||email).trim().split(/\s+/).slice(0,2).map(n=>n[0]?.toUpperCase()).join('') || 'EA';
  async function handlePhoto(file:File|undefined){
    if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){setFeedback('Utiliza una imagen JPG, PNG o WebP.');return;}
    if(file.size>2*1024*1024){setFeedback('La foto no puede superar los 2 MB.');return;}
    setFeedback('');setUploading(true);
    try{
      const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
      const path=`${userId}/${crypto.randomUUID()}.${ext}`;
      const {error:uploadError}=await sb.storage.from('elart-profile-avatars').upload(path,file,{contentType:file.type,upsert:false,cacheControl:'3600'});
      if(uploadError)throw uploadError;
      const {error:dbError}=await sb.from('profiles').update({avatar_path:path}).eq('id',userId);
      if(dbError){await sb.storage.from('elart-profile-avatars').remove([path]);throw dbError;}
      router.refresh();setFeedback('Tu foto de perfil se guardó correctamente.');
    }catch(e){setFeedback(e instanceof Error?`No se pudo subir tu foto: ${e.message}`:'No se pudo subir tu foto. Revisa la configuración de Supabase.');}
    finally{setUploading(false);if(input.current)input.current.value='';}
  }
  return <div className="elart-profile-layout">
    <aside className="elart-profile-card">
      <div className="elart-profile-cover"/>
      <div className="elart-profile-avatar-area">
        <div className="elart-profile-avatar">{publicUrl?<Image src={publicUrl} alt="Foto de perfil" fill sizes="112px" unoptimized/>:<span>{initials}</span>}</div>
        <button className="elart-avatar-camera" type="button" onClick={()=>input.current?.click()} disabled={uploading} aria-label="Subir foto de perfil">{uploading?<Loader2 size={18} className="elart-spin"/>:<Camera size={18}/>}</button>
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e=>void handlePhoto(e.target.files?.[0])}/>
      </div>
      <h2>{profile.full_name||'Mi perfil'}</h2><p>{email}</p>
      <div className="elart-profile-member"><ShieldCheck size={16}/> Miembro de Elart Academia</div>
      <div className="elart-profile-meta"><span>Miembro desde</span><strong>{createdAt}</strong></div>
      <button type="button" className="elart-button elart-button-outline elart-profile-change" onClick={()=>input.current?.click()} disabled={uploading}><ImagePlus size={17}/> {uploading?'Subiendo foto…':'Cambiar fotografía'}</button>
      <small className="elart-profile-image-hint">JPG, PNG o WebP · Máximo 2 MB. Tu foto será pública.</small>
      {feedback?<p className="elart-profile-feedback" role="status">{feedback}</p>:null}
    </aside>
    <div className="elart-profile-main">
      <section className="elart-profile-panel"><div className="elart-profile-panel-title"><UserRound size={20}/><div><h2>Información personal</h2><p>Completa los datos que quieres asociar a tu perfil de estudiante.</p></div></div>
        <form action={saveProfile} className="elart-profile-form">
          <div className="elart-profile-form-grid">
            <label>Nombre completo *<input name="full_name" defaultValue={profile.full_name||''} maxLength={150} required autoComplete="name"/></label>
            <label>Correo electrónico<input value={email} readOnly disabled autoComplete="email"/></label>
            <label>Teléfono (opcional)<input name="phone" type="tel" defaultValue={profile.phone||''} maxLength={30} autoComplete="tel" placeholder="+591 7xxxxxxx"/></label>
            <label>Fecha de nacimiento (opcional)<input name="birth_date" type="date" defaultValue={profile.birth_date||''} max={new Date().toISOString().slice(0,10)}/></label>
            <label>País<input name="country" defaultValue={profile.country||'Bolivia'} maxLength={80} autoComplete="country-name" placeholder="Bolivia"/></label>
            <label>Ciudad<input name="city" defaultValue={profile.city||''} maxLength={100} autoComplete="address-level2" placeholder="La Paz"/></label>
            <label className="elart-profile-form-full">Dirección (opcional)<input name="address" defaultValue={profile.address||''} maxLength={250} autoComplete="street-address" placeholder="Dirección de contacto"/></label>
            <label className="elart-profile-form-full">Ocupación o profesión<input name="occupation" defaultValue={profile.occupation||''} maxLength={120} placeholder="Ej. Ingeniero, estudiante, emprendedor"/></label>
            <label className="elart-profile-form-full">Sobre mí (opcional)<textarea name="bio" maxLength={500} rows={4} defaultValue={profile.bio||''} placeholder="Cuéntanos brevemente tus intereses de aprendizaje"/></label>
          </div>
          <div className="elart-profile-form-footer"><span><LockKeyhole size={15}/> Tus datos se almacenan en tu cuenta de Supabase.</span><SaveButton/></div>
        </form>
      </section>
      <section className="elart-profile-panel elart-security-panel"><div className="elart-profile-panel-title"><ShieldCheck size={20}/><div><h2>Seguridad de tu cuenta</h2><p>El correo y las credenciales se gestionan mediante Supabase Auth.</p></div></div><div className="elart-security-row"><Mail size={19}/><div><strong>Correo de acceso</strong><span>{email}</span></div><span className="elart-pill success">Registrado</span></div><div className="elart-security-row"><MapPin size={19}/><div><strong>Privacidad</strong><span>Completa solamente los datos que quieras compartir con la academia.</span></div></div></section>
    </div>
  </div>;
}
