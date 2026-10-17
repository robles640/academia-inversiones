import Link from 'next/link';
import {ArrowRight, GraduationCap, BookOpen} from 'lucide-react';
import {WorkSidebar} from '@/components/work-sidebar';
import {CampusCourseCard} from '@/components/campus-course-card';
import {requireUser} from '@/lib/db';
import {getCampusData} from '@/lib/campus';

export default async function MisCursos() {
  const user = await requireUser();
  const data = await getCampusData(user.id);
  return <div className="elart-workspace"><WorkSidebar/><main className="elart-content" id="contenido">
    <header className="elart-workspace-header"><div><span className="elart-eyebrow">CAMPUS VIRTUAL</span><h1>Mi aprendizaje</h1><p>Todos tus cursos, lecciones y avances en un mismo lugar.</p></div><Link href="/cursos" prefetch className="elart-button elart-button-primary">Explorar catálogo <ArrowRight size={17}/></Link></header>
    {data.queryError ? <p className="elart-inline-warning">No pudimos obtener el catálogo de tu matrícula. Verifica la configuración de Supabase.</p> : null}
    <div className="elart-learning-strip"><BookOpen size={23}/><div><strong>{data.courses.length} {data.courses.length===1?'curso matriculado':'cursos matriculados'}</strong><span>{data.completedLessons} de {data.totalLessons} lecciones completadas</span></div></div>
    {data.courses.length ? <div className="elart-courses-grid">{data.courses.map(c=><CampusCourseCard key={c.id} course={c}/>)}</div> : <div className="elart-empty-state"><span className="elart-empty-icon"><GraduationCap size={30}/></span><h2>Tu biblioteca de aprendizaje está por comenzar</h2><p>En cuanto se verifique tu pago o un administrador te matricule, el curso aparecerá aquí con sus módulos y clases.</p><Link href="/cursos" prefetch className="elart-button elart-button-primary">Explorar cursos <ArrowRight size={17}/></Link></div>}
  </main></div>;
}
