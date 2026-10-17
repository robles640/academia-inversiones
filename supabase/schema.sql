-- ELART ACADEMIA · Esquema inicial. Ejecutar en SQL Editor de un proyecto nuevo de Supabase.
-- Activar verificación de email según tus reglas de negocio en Authentication > Providers.
create extension if not exists pgcrypto;
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 email text not null default '',
 role text not null default 'student' check (role in ('student','admin')),
 created_at timestamptz not null default now()
);
create table if not exists public.courses (
 id uuid primary key default gen_random_uuid(),
 slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
 title text not null, category text not null default '', summary text not null default '',description text not null default '',
 price_usd numeric(10,2) not null default 0 check (price_usd >= 0),
 level text not null default 'Desde cero',duration_label text not null default '',cover_url text not null default '',
 badge text not null default '',featured boolean not null default false,
 status text not null default 'draft' check(status in ('published','coming_soon','draft')),
 sort_order int not null default 100,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create table if not exists public.modules(
 id uuid primary key default gen_random_uuid(),course_id uuid not null references public.courses(id) on delete cascade,
 title text not null,position int not null default 0
);
create table if not exists public.lessons(
 id uuid primary key default gen_random_uuid(),module_id uuid not null references public.modules(id) on delete cascade,
 title text not null,description text not null default '',duration_label text not null default '',
 thumbnail_url text not null default '',position int not null default 0,is_preview boolean not null default false
);
-- Separar archivos del temario público evita revelar URLs privadas a visitantes.
create table if not exists public.lesson_media(
 lesson_id uuid primary key references public.lessons(id) on delete cascade,
 storage_path text, external_url text,
 constraint one_media check (storage_path is null or external_url is null)
);
create table if not exists public.enrollments(
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 course_id uuid not null references public.courses(id) on delete cascade,
 created_at timestamptz not null default now(),unique(user_id,course_id)
);
create table if not exists public.orders(
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 course_id uuid not null references public.courses(id),amount_usd numeric(10,2) not null,
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 proof_path text,customer_note text not null default '',created_at timestamptz not null default now(),reviewed_at timestamptz,
 reviewed_by uuid references auth.users(id)
);
create table if not exists public.lesson_progress(
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id uuid not null references public.lessons(id) on delete cascade,
 completed_at timestamptz not null default now(),primary key(user_id,lesson_id)
);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;
create or replace function public.is_enrolled(p_course uuid) returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.enrollments where user_id=auth.uid() and course_id=p_course);
$$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
 begin insert into public.profiles(id,full_name,email) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),coalesce(new.email,''));return new;end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
-- El comprador no puede manipular el precio ni aprobar su orden desde el cliente.
create or replace function public.lock_order_fields() returns trigger language plpgsql security definer set search_path = '' as $$
 declare v_price numeric(10,2);v_state text;
 begin
 if tg_op='INSERT' then
   select price_usd,status into v_price,v_state from public.courses where id=new.course_id;
   if v_state is distinct from 'published' then raise exception 'Este curso no admite inscripciones';end if;
   new.amount_usd:=v_price;new.status:='pending';new.user_id:=auth.uid();
   new.proof_path:=null;new.reviewed_at:=null;new.reviewed_by:=null;
 elsif not public.is_admin() then
   if new.user_id<>old.user_id or new.course_id<>old.course_id or new.status<>old.status or new.amount_usd<>old.amount_usd or new.reviewed_by is distinct from old.reviewed_by then
     raise exception 'No puedes modificar los campos protegidos de una orden';
   end if;
 end if;
 return new;
 end;
$$;
drop trigger if exists orders_lock on public.orders;
create trigger orders_lock before insert or update on public.orders for each row execute function public.lock_order_fields();
create or replace function public.grant_access_on_approval() returns trigger language plpgsql security definer set search_path = '' as $$
 begin
 if new.status='approved' and old.status is distinct from 'approved' then
  if new.proof_path is null or length(trim(new.proof_path))=0 then raise exception 'Falta comprobante del pago';end if;
  insert into public.enrollments(user_id,course_id) values(new.user_id,new.course_id) on conflict do nothing;
  new.reviewed_at:=now();new.reviewed_by:=auth.uid();
 end if;
 return new;
 end;
$$;
drop trigger if exists approved_order_grants_enrollment on public.orders;
create trigger approved_order_grants_enrollment before update of status on public.orders for each row execute function public.grant_access_on_approval();
-- El rol se administra en SQL Editor; estudiantes no pueden autoproclamarse admins.
create or replace function public.protect_profile_role() returns trigger language plpgsql security definer set search_path = '' as $$
 begin if (new.role<>old.role or new.email<>old.email or new.id<>old.id) and not public.is_admin() then raise exception 'Solo un administrador puede cambiar roles, email o identificadores';end if;return new;end;
$$;
drop trigger if exists protect_role on public.profiles;
create trigger protect_role before update on public.profiles for each row execute function public.protect_profile_role();
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_media enable row level security;
alter table public.enrollments enable row level security;
alter table public.orders enable row level security;
alter table public.lesson_progress enable row level security;
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated using (id=auth.uid() or public.is_admin());
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated using (id=auth.uid() or public.is_admin()) with check (id=auth.uid() or public.is_admin());
drop policy if exists courses_read on public.courses;
create policy courses_read on public.courses for select to anon,authenticated using(status in ('published','coming_soon') or public.is_admin());
drop policy if exists courses_admin on public.courses;
create policy courses_admin on public.courses for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists modules_read on public.modules;
create policy modules_read on public.modules for select to anon,authenticated using(public.is_admin() or exists(select 1 from public.courses c where c.id=course_id and c.status in ('published','coming_soon')));
drop policy if exists modules_admin on public.modules;
create policy modules_admin on public.modules for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists lessons_read on public.lessons;
create policy lessons_read on public.lessons for select to anon,authenticated using(public.is_admin() or exists(select 1 from public.modules m join public.courses c on c.id=m.course_id where m.id=module_id and c.status in ('published','coming_soon')));
drop policy if exists lessons_admin on public.lessons;
create policy lessons_admin on public.lessons for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists media_read on public.lesson_media;
create policy media_read on public.lesson_media for select to authenticated using(public.is_admin() or exists(select 1 from public.lessons l join public.modules m on l.module_id=m.id where l.id=lesson_id and (l.is_preview or public.is_enrolled(m.course_id))));
drop policy if exists media_admin on public.lesson_media;
create policy media_admin on public.lesson_media for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists enrollments_read on public.enrollments;
create policy enrollments_read on public.enrollments for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists enrollments_admin on public.enrollments;
create policy enrollments_admin on public.enrollments for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists orders_read on public.orders;
create policy orders_read on public.orders for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists orders_insert on public.orders;
create policy orders_insert on public.orders for insert to authenticated with check(user_id=auth.uid());
drop policy if exists orders_update on public.orders;
create policy orders_update on public.orders for update to authenticated using(user_id=auth.uid() or public.is_admin()) with check(user_id=auth.uid() or public.is_admin());
drop policy if exists progress_select on public.lesson_progress;
create policy progress_select on public.lesson_progress for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists progress_insert on public.lesson_progress;
create policy progress_insert on public.lesson_progress for insert to authenticated with check(user_id=auth.uid() and exists(select 1 from public.lessons l join public.modules m on l.module_id=m.id where l.id=lesson_id and public.is_enrolled(m.course_id)));
drop policy if exists progress_delete on public.lesson_progress;
create policy progress_delete on public.lesson_progress for delete to authenticated using(user_id=auth.uid());
-- Crear buckets privados; las políticas comprueban el vínculo con matrícula.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('lesson-videos','lesson-videos',false,1073741824,array['video/mp4','video/webm','video/quicktime']),
 ('payment-proofs','payment-proofs',false,8388608,array['image/jpeg','image/png','image/webp','application/pdf']),
 ('course-covers','course-covers',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
drop policy if exists videos_admin_upload on storage.objects;
create policy videos_admin_upload on storage.objects for insert to authenticated with check(bucket_id='lesson-videos' and public.is_admin());
drop policy if exists videos_admin_delete on storage.objects;
create policy videos_admin_delete on storage.objects for delete to authenticated using(bucket_id='lesson-videos' and public.is_admin());
drop policy if exists videos_read on storage.objects;
create policy videos_read on storage.objects for select to authenticated using(bucket_id='lesson-videos' and (public.is_admin() or exists(select 1 from public.lesson_media lm join public.lessons l on l.id=lm.lesson_id join public.modules m on m.id=l.module_id where lm.storage_path=name and (l.is_preview or public.is_enrolled(m.course_id)))));
drop policy if exists payment_upload on storage.objects;
create policy payment_upload on storage.objects for insert to authenticated with check(bucket_id='payment-proofs' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists payment_read on storage.objects;
create policy payment_read on storage.objects for select to authenticated using(bucket_id='payment-proofs' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_admin()));
create index if not exists idx_module_course on public.modules(course_id,position);
create index if not exists idx_lesson_module on public.lessons(module_id,position);
create index if not exists idx_orders_user on public.orders(user_id);
create index if not exists idx_enroll_user on public.enrollments(user_id);

-- Portadas públicas: visibles para todos; solo el administrador puede publicarlas.
drop policy if exists covers_admin_insert on storage.objects;
create policy covers_admin_insert on storage.objects for insert to authenticated with check(bucket_id='course-covers' and public.is_admin());
drop policy if exists covers_admin_delete on storage.objects;
create policy covers_admin_delete on storage.objects for delete to authenticated using(bucket_id='course-covers' and public.is_admin());
