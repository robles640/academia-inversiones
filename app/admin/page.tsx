import Link from 'next/link';
import {ArrowRight, BookOpen, CheckCircle2, CreditCard, LayoutDashboard, ShieldCheck, Users, Activity, ArrowUpRight} from 'lucide-react';
import {WorkSidebar} from '@/components/work-sidebar';
import {requireAdmin} from '@/lib/db';
import {createClient} from '@/utils/supabase/server';

export default async function Admin() {
  await requireAdmin();
  const sb=await createClient();
  const [{count:courses},{count:students},{count:orders},{count:enroll},recentRes]=await Promise.all([
    sb.from('courses').select('*',{count:'exact',head:true}),
    sb.from('profiles').select('*',{count:'exact',head:true}),
    sb.from('orders').select('*',{count:'exact',head:true}).eq('status','pending'),
    sb.from('enrollments').select('*',{count:'exact',head:true}),
    sb.from('orders').select('id,status,amount_usd,created_at,courses(title)').order('created_at',{ascending:false}).limit(5),
  ]);
  const blocks=[
    {label:'Programas creados',value:courses??0,icon:BookOpen,description:'Cursos en la plataforma'},
    {label:'Cuentas registradas',value:students??0,icon:Users,description:'Comunidad de alumnos'},
    {label:'Pagos por verificar',value:orders??0,icon:CreditCard,description:'Requieren tu revisión'},
    {label:'Matrículas activas',value:enroll??0,icon:CheckCircle2,description:'Accesos concedidos'},
  ];
  return <div className="elart-workspace"><WorkSidebar admin/><main className="elart-content" id="contenido">
    <header className="elart-workspace-header"><div><span className="elart-eyebrow">ELART ACADEMIA · OPERACIONES</span><h1>Centro de administración</h1><p>Control centralizado de contenidos, alumnos y matrículas.</p></div><Link href="/" prefetch className="elart-button elart-button-outline">Ver academia <ArrowUpRight size={17}/></Link></header>
    <section className="elart-overview elart-overview-four" aria-label="Indicadores de la academia">{blocks.map(b=><div className="elart-metric-card" key={b.label}><span className="elart-metric-icon"><b.icon size={22}/></span><span className="elart-metric-caption">{b.label}</span><strong>{b.value}</strong><small>{b.description}</small></div>)}</section>
    <section className="elart-focus-banner"><div className="elart-focus-symbol"><ShieldCheck size={24}/></div><div><span className="elart-eyebrow">ACCIÓN RECOMENDADA</span><h2>Verifica y habilita el acceso de tus alumnos</h2><p>Confirma el abono en tu banco antes de aprobar una solicitud. La aprobación concede una matrícula.</p></div><Link href="/admin/pagos" prefetch className="elart-button elart-button-light">Revisar pagos <ArrowRight size={17}/></Link></section>
    <section className="elart-panel-section"><div className="elart-section-heading"><div><span className="elart-eyebrow">GESTIÓN CENTRALIZADA</span><h2>Herramientas de administración</h2><p>Accesos directos a las operaciones esenciales.</p></div></div><div className="elart-admin-actions-grid">
      <Link href="/admin/cursos" prefetch className="elart-admin-tool"><span><BookOpen size={24}/></span><h3>Cursos y lecciones</h3><p>Administra programas, precios, módulos, videos y materiales.</p><strong>Gestionar contenido <ArrowRight size={17}/></strong></Link>
      <Link href="/admin/pagos" prefetch className="elart-admin-tool"><span><CreditCard size={24}/></span><h3>Solicitudes de pago</h3><p>Consulta comprobantes, verifica ingresos y aprueba pedidos.</p><strong>Revisar operaciones <ArrowRight size={17}/></strong></Link>
      <Link href="/admin/alumnos" prefetch className="elart-admin-tool"><span><Users size={24}/></span><h3>Alumnos y matrículas</h3><p>Consulta estudiantes registrados y concede acceso manual.</p><strong>Administrar alumnos <ArrowRight size={17}/></strong></Link>
    </div></section>
    <section className="elart-panel-section"><div className="elart-section-heading"><div><span className="elart-eyebrow">ACTIVIDAD RECIENTE</span><h2>Últimas solicitudes</h2></div><Link href="/admin/pagos" prefetch className="elart-text-link">Ver todos <ArrowRight size={16}/></Link></div>
      <div className="elart-table-shell"><table className="elart-table"><thead><tr><th>Curso</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>{(recentRes.data??[]).map(o=>{const c=Array.isArray(o.courses)?o.courses[0]:o.courses;return <tr key={o.id}><td><strong>{c?.title||'Curso'}</strong></td><td>{new Date(o.created_at).toLocaleDateString('es-BO')}</td><td><span className={`elart-pill ${o.status==='approved'?'success':o.status==='rejected'?'error':'pending'}`}>{o.status==='approved'?'Aprobado':o.status==='rejected'?'Rechazado':'Pendiente'}</span></td></tr>})}{!recentRes.data?.length&&<tr><td colSpan={3}><div className="elart-table-empty"><Activity size={20}/> Sin pedidos registrados todavía.</div></td></tr>}</tbody></table></div>
    </section>
    <div className="elart-admin-security"><LayoutDashboard size={18}/> El panel requiere rol de administrador en Supabase. Activa autenticación de dos factores para tu cuenta antes del lanzamiento.</div>
  </main></div>;
}
