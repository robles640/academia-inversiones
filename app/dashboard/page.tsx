import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';
import { WorkSidebar } from '@/components/work-sidebar';
import { CampusCourseCard } from '@/components/campus-course-card';
import { requireUser } from '@/lib/db';
import { getCampusData } from '@/lib/campus';
import { money } from '@/lib/catalog';

export default async function Dashboard({searchParams}:{searchParams:Promise<{notice?:string}>}) {
  const u = await requireUser();
  const [data, query] = await Promise.all([getCampusData(u.id),searchParams]);
  
const nombreCompleto = (
  data.profile?.full_name ||
  u.user_metadata?.full_name ||
  u.user_metadata?.name ||
  ''
).trim();

const greeting =
  nombreCompleto.split(/\s+/).filter(Boolean).slice(0, 2).join(' ') ||
  'estudiante';

  const admin = data.profile?.role === 'admin';
  return (
    <div className="elart-workspace">
      <WorkSidebar/>
      <main className="elart-content" id="contenido">
        <header className="elart-workspace-header">
          <div><span className="elart-eyebrow">TU ESPACIO DE FORMACIÓN</span><h1>Hola, {greeting} <span className="elart-wave">👋</span></h1><p>Tu crecimiento profesional, en un solo lugar.</p></div>
          <div className="elart-header-actions">
            {admin ? <Link href="/admin" prefetch className="elart-button elart-button-outline"><ShieldCheck size={17}/> Administración</Link> : null}
            <Link href="/cursos" prefetch className="elart-button elart-button-primary">Explorar cursos <ArrowRight size={17}/></Link>
          </div>
        </header>
        {query.notice ? <div className="alert success" role="status">{query.notice}</div> : null}
        {data.queryError ? <p className="elart-inline-warning">No se pudieron consultar todos los datos académicos. Revisa que las tablas de la academia estén configuradas en Supabase.</p> : null}
        <section className="elart-overview" aria-label="Resumen académico">
          <div className="elart-metric-card"><span className="elart-metric-icon"><BookOpen size={21}/></span><span className="elart-metric-caption">Cursos activos</span><strong>{data.courses.length}</strong><small>Tus formaciones matriculadas</small></div>
          <div className="elart-metric-card"><span className="elart-metric-icon"><CheckCircle2 size={21}/></span><span className="elart-metric-caption">Lecciones completadas</span><strong>{data.completedLessons}<span className="elart-metric-divider"> / {data.totalLessons}</span></strong><small>Progreso académico acumulado</small></div>
          <div className="elart-metric-card"><span className="elart-metric-icon"><Clock3 size={21}/></span><span className="elart-metric-caption">Pagos en revisión</span><strong>{data.pendingOrders}</strong><small>Solicitudes por confirmar</small></div>
        </section>
        <section className="elart-focus-banner">
          <span className="elart-focus-symbol"><Sparkles size={23}/></span>
          <div><span className="elart-eyebrow">TU PRÓXIMO PASO</span><h2>{data.courses.length ? 'Continúa donde te quedaste' : 'Tu próxima habilidad comienza aquí'}</h2><p>{data.courses.length ? 'La constancia convierte las lecciones en habilidades profesionales.' : 'Explora nuestros programas y empieza a construir conocimientos aplicables.'}</p></div>
          <Link href={data.courses[0]?.href || '/cursos'} prefetch className="elart-button elart-button-light">{data.courses.length ? 'Continuar aprendiendo' : 'Ver catálogo'} <ArrowRight size={17}/></Link>
        </section>
        <section className="elart-panel-section" aria-labelledby="titulo-mis-cursos">
          <div className="elart-section-heading"><div><span className="elart-eyebrow">FORMACIÓN ACTIVA</span><h2 id="titulo-mis-cursos">Mi aprendizaje</h2><p>Tus programas y el progreso de cada uno.</p></div><Link href="/mis-cursos" prefetch className="elart-text-link">Ver mi aprendizaje <ArrowRight size={16}/></Link></div>
          {data.courses.length ? <div className="elart-courses-grid">{data.courses.slice(0,3).map(course=><CampusCourseCard key={course.id} course={course}/>)}</div> : <div className="elart-empty-state"><div className="elart-empty-icon"><GraduationCap size={26}/></div><h3>Aún no tienes cursos activos</h3><p>Cuando se apruebe tu primera matrícula, aquí verás tus clases y podrás seguir tu progreso.</p><Link href="/cursos" prefetch className="elart-button elart-button-primary">Descubrir programas <ArrowRight size={16}/></Link></div>}
        </section>
        <section className="elart-panel-section" aria-labelledby="titulo-solicitudes">
          <div className="elart-section-heading"><div><span className="elart-eyebrow">TU ACTIVIDAD</span><h2 id="titulo-solicitudes">Solicitudes recientes</h2><p>Estado de tus inscripciones y pagos.</p></div></div>
          <div className="elart-table-shell"><table className="elart-table"><thead><tr><th>Curso</th><th>Fecha</th><th>Importe</th><th>Estado</th><th></th></tr></thead><tbody>
            {data.orders.map(o=>{const c=Array.isArray(o.courses)?o.courses[0]:o.courses;return <tr key={o.id}><td><strong>{c?.title || 'Curso de Elart Academia'}</strong></td><td>{new Date(o.created_at).toLocaleDateString('es-BO')}</td><td>{money(Number(o.amount_usd))}</td><td><span className={`elart-pill ${o.status==='approved'?'success':o.status==='rejected'?'error':'pending'}`}>{o.status==='approved'?'Aprobado':o.status==='rejected'?'Rechazado':'En revisión'}</span></td><td><Link href={`/pago/${o.id}`} prefetch aria-label="Ver solicitud" className="elart-text-link">Ver <ArrowRight size={15}/></Link></td></tr>})}
            {!data.orders.length ? <tr><td colSpan={5}><div className="elart-table-empty"><LayoutDashboard size={20}/> Todavía no registras solicitudes de inscripción.</div></td></tr> : null}
          </tbody></table></div>
        </section>
      </main>
    </div>
  );
}
