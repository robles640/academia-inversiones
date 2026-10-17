import { createClient } from '@/utils/supabase/server';

export type CampusCourse = {
  id: string;
  slug: string;
  title: string;
  category: string;
  cover_url: string;
  completed: number;
  total: number;
  progress: number;
  href: string;
  enrolled_at: string;
};

export async function getCampusData(userId: string) {
  const sb = await createClient();
  const [profileRes, enrollmentRes, progressRes, ordersRes] = await Promise.all([
    sb.from('profiles').select('full_name,role,avatar_path').eq('id', userId).maybeSingle(),
    sb.from('enrollments').select('course_id,created_at,courses(id,slug,title,cover_url,category)').eq('user_id',userId).order('created_at',{ascending:false}),
    sb.from('lesson_progress').select('lesson_id').eq('user_id',userId),
    sb.from('orders').select('id,status,amount_usd,created_at,courses(title)').eq('user_id',userId).order('created_at',{ascending:false}).limit(10),
  ]);
  const enrollments = enrollmentRes.data ?? [];
  const courseIds = enrollments.map(e => e.course_id);
  const {data:modules} = courseIds.length
    ? await sb.from('modules').select('id,course_id').in('course_id',courseIds)
    : {data: [] as {id:string,course_id:string}[]};
  const moduleIds = (modules ?? []).map(m => m.id);
  const {data:lessons} = moduleIds.length
    ? await sb.from('lessons').select('id,module_id').in('module_id',moduleIds)
    : {data: [] as {id:string,module_id:string}[]};
  const completedSet = new Set((progressRes.data ?? []).map(p=>p.lesson_id));
  const courseList: CampusCourse[] = enrollments.flatMap(e => {
    const c = Array.isArray(e.courses) ? e.courses[0] : e.courses;
    if (!c) return [];
    const modIds = new Set((modules ?? []).filter(m=>m.course_id===e.course_id).map(m=>m.id));
    const courseLessons = (lessons ?? []).filter(l=>modIds.has(l.module_id));
    const completed = courseLessons.filter(l=>completedSet.has(l.id)).length;
    const total = courseLessons.length;
    return [{
      id: c.id, slug: c.slug, title: c.title, category: c.category,
      cover_url: c.cover_url, completed, total,
      progress: total ? Math.round(100 * completed / total) : 0,
      href: `/aprender/${c.slug}`,
      enrolled_at:e.created_at,
    }];
  });
  const orders = ordersRes.data ?? [];
  const totalLessons=courseList.reduce((n,c)=>n+c.total,0);
  const completedLessons=courseList.reduce((n,c)=>n+c.completed,0);
  return {
    profile: profileRes.data,
    courses: courseList,
    orders,
    totalLessons,
    completedLessons,
    pendingOrders: orders.filter(o=>o.status==='pending').length,
    queryError: enrollmentRes.error ?? progressRes.error ?? ordersRes.error,
  };
}
