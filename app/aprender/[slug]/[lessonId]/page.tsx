import {notFound, redirect} from 'next/navigation';
import {WorkSidebar} from '@/components/work-sidebar';
import {LessonWorkspace, type LessonItem, type LessonModule} from '@/components/lesson-workspace';
import {requireUser} from '@/lib/db';
import {createClient} from '@/utils/supabase/server';

export default async function LessonPage({params}: {params: Promise<{slug:string;lessonId:string}>}) {
  const {slug,lessonId} = await params;
  const user = await requireUser(`/login?next=/aprender/${slug}/${lessonId}`);
  const sb = await createClient();
  const {data:course,error:courseError} = await sb.from('courses').select('id,title,slug').eq('slug',slug).single();
  if (courseError || !course) notFound();

  // Una vez conocido el curso, matrícula y módulos se consultan en paralelo.
  const [enrollmentResult, modulesResult] = await Promise.all([
    sb.from('enrollments').select('id').eq('user_id',user.id).eq('course_id',course.id).maybeSingle(),
    sb.from('modules').select('id,title,position').eq('course_id',course.id).order('position'),
  ]);
  if (enrollmentResult.error || !enrollmentResult.data) redirect(`/cursos/${slug}`);
  if (modulesResult.error) throw new Error('No se pudo cargar el temario.');
  const modules = modulesResult.data ?? [];
  if (!modules.length) notFound();

  const [lessonsResult, progressResult] = await Promise.all([
    sb.from('lessons').select('id,module_id,title,description,position').in('module_id',modules.map(m=>m.id)).order('position'),
    sb.from('lesson_progress').select('lesson_id').eq('user_id',user.id),
  ]);
  if (lessonsResult.error || progressResult.error) throw new Error('No se pudo consultar el progreso del curso.');
  const lessons = lessonsResult.data ?? [];
  const grouped: LessonModule[] = modules.map(m=>({
    id:m.id,
    title:m.title,
    lessons: lessons.filter(l=>l.module_id===m.id).sort((a,b)=>a.position-b.position).map(l=>({
      id:l.id,title:l.title,description:l.description ?? '',moduleTitle:m.title,
    } satisfies LessonItem)),
  }));
  if (!grouped.some(m=>m.lessons.some(l=>l.id===lessonId))) notFound();
  return <div className="work-area">
    <WorkSidebar/>
    <LessonWorkspace
      slug={slug}
      courseTitle={course.title}
      modules={grouped}
      initialLessonId={lessonId}
      initiallyCompleted={(progressResult.data ?? []).map(p=>p.lesson_id)}
    />
  </div>;
}
