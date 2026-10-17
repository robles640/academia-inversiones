import {cache} from 'react';
import {redirect} from 'next/navigation';
import type {User} from '@supabase/supabase-js';
import { courses, type Course } from '@/lib/catalog';
import { createClient } from '@/utils/supabase/server';
export const isConfigured=()=>Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function allCourses(): Promise<Course[]> {
  if (!isConfigured()) return courses;
  try {
    const sb=await createClient();
    const {data,error}=await sb.from('courses').select('id,slug,title,category,summary,description,price_usd,level,duration_label,cover_url,status,badge,featured').in('status',['published','coming_soon']).order('sort_order');
    if (error || !data?.length) return courses;
    return data as Course[];
  } catch { return courses; }
}
export async function findCourse(slug:string) {
 const list=await allCourses();return list.find(c=>c.slug===slug);
}
export const getSessionUser=cache(async function getSessionUser(){
 if(!isConfigured()) return null;
 try {const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();return user;}catch{return null;}
});
export async function requireUser(redirectTo='/login'): Promise<User> {
 const user=await getSessionUser();
 if (!user) redirect(redirectTo);
 return user;
}
export async function isAdmin(userId:string) {
 if (!isConfigured()) return false;
 const sb=await createClient(); const {data}=await sb.from('profiles').select('role').eq('id',userId).single();return data?.role==='admin';
}
export async function requireAdmin(): Promise<User> {
 const u=await requireUser('/login?next=/admin');
 if (!(await isAdmin(u.id))) redirect('/dashboard');
 return u;
}
