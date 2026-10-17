'use client';

import {useEffect, useMemo, useState, useTransition, type MouseEvent} from 'react';
import Link from 'next/link';
import {BookOpen,CheckCircle2,ChevronLeft,ChevronRight,LoaderCircle} from 'lucide-react';
import {LessonPlayer} from '@/components/lesson-player';
import {markComplete} from '@/app/actions/orders';

export type LessonItem={id:string;title:string;description:string;moduleTitle:string};
export type LessonModule={id:string;title:string;lessons:LessonItem[]};
type Props={slug:string;courseTitle:string;modules:LessonModule[];initialLessonId:string;initiallyCompleted:string[]};

export function LessonWorkspace({slug,courseTitle,modules,initialLessonId,initiallyCompleted}:Props){
  // El temario ya fue autorizado y cargado por el servidor. Cambiar de lección no lo vuelve a descargar.
  const ordered = useMemo(()=>modules.flatMap(m=>m.lessons),[modules]);
  const [activeId,setActiveId]=useState(initialLessonId);
  const [completed,setCompleted]=useState(()=>new Set(initiallyCompleted));
  const [saving,startSaving]=useTransition();
  const [error,setError]=useState('');
  const idx=Math.max(0,ordered.findIndex(l=>l.id===activeId));
  const lesson=ordered[idx];

  useEffect(()=>{
    const syncBackForward=()=>{
      const fromUrl=window.location.pathname.split('/').pop();
      if(fromUrl && ordered.some(l=>l.id===fromUrl))setActiveId(fromUrl);
    };
    window.addEventListener('popstate',syncBackForward);
    return()=>window.removeEventListener('popstate',syncBackForward);
  },[ordered]);

  function selectLesson(id:string){
    if(!ordered.some(l=>l.id===id)||activeId===id)return;
    setActiveId(id); // respuesta visual inmediata, sin navegación de servidor
    setError('');
    // Next.js integra la History API nativa. La URL sirve también para compartir una clase.
    window.history.pushState(null,'',`/aprender/${slug}/${id}`);
    window.scrollTo({top:0,behavior:'auto'});
  }

  function interceptNavigation(e:MouseEvent<HTMLAnchorElement>,id:string){
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
    e.preventDefault();
    selectLesson(id);
  }

  function complete(){
    if(!lesson||completed.has(lesson.id)||saving)return;
    const id=lesson.id;
    startSaving(async()=>{
      try{
        setError('');
        await markComplete(id); // se verifica la matrícula mediante RLS en Supabase
        setCompleted(prev=>new Set([...prev,id]));
      }catch{
        setError('No se pudo guardar el progreso. Intenta nuevamente.');
      }
    });
  }
  if(!lesson)return <main className="work-content">No se encontraron lecciones disponibles.</main>;
  return <main className="work-content">
    <div className="page-heading">
      <div>
        <Link href="/mis-cursos" className="breadcrumbs dark">← Volver a mis cursos</Link>
        <h1 style={{fontSize:31}}>{courseTitle}</h1>
        <p>{lesson.moduleTitle} · Lección {idx+1} de {ordered.length}</p>
      </div>
    </div>
    <div className="lesson-page">
      <section aria-label="Contenido de la lección">
        <LessonPlayer key={lesson.id} lessonId={lesson.id}/>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:30,margin:'25px 0 10px'}}>{lesson.title}</h2>
        <p style={{color:'#617582',lineHeight:1.85}}>{lesson.description}</p>
        <button type="button" onClick={complete} className="btn btn-dark" disabled={completed.has(lesson.id)||saving}>
          {saving?<LoaderCircle size={18}/>:<CheckCircle2 size={18}/>}
          {completed.has(lesson.id)?'Lección completada':saving?'Guardando...':'Marcar como completada'}
        </button>
        {error&&<p role="alert" style={{color:'#b42318',marginTop:9}}>{error}</p>}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:35,gap:12}}>
          {idx>0?<a href={`/aprender/${slug}/${ordered[idx-1].id}`} onClick={e=>interceptNavigation(e,ordered[idx-1].id)} className="btn btn-outline-dark"><ChevronLeft size={17}/>Anterior</a>:<span/>}
          {idx+1<ordered.length?<a href={`/aprender/${slug}/${ordered[idx+1].id}`} onClick={e=>interceptNavigation(e,ordered[idx+1].id)} className="btn btn-dark">Siguiente<ChevronRight size={17}/></a>:null}
        </div>
      </section>
      <aside className="lesson-list" aria-label="Temario del curso">
        <b style={{display:'flex',gap:8,alignItems:'center',margin:'0 0 16px'}}><BookOpen size={17}/>Temario · {ordered.length} clases</b>
        {modules.map(m=><div key={m.id}>
          <div className="small-kicker" style={{margin:'17px 5px 8px'}}>{m.title}</div>
          {m.lessons.map(l=><a key={l.id} className={l.id===activeId?'current':''} aria-current={l.id===activeId?'page':undefined} href={`/aprender/${slug}/${l.id}`} onClick={e=>interceptNavigation(e,l.id)}>{l.title}{completed.has(l.id)?' ✓':''}</a>)}
        </div>)}
      </aside>
    </div>
  </main>;
}
