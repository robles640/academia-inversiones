# Migración sin perder alumnos ni credenciales

1. **Mantén tu sitio actual en producción.** No hagas `git push origin main` hasta validar.
2. Haz respaldo completo de tu Supabase actual (base de datos, Auth, buckets de Storage y claves de configuración) y conserva un punto de restauración del repositorio.
3. En la carpeta nueva coloca tu antiguo `.env.local` **solo localmente**. Comprueba que la URL `NEXT_PUBLIC_SUPABASE_URL` apunta al mismo project ref que tu Supabase original. Conserva los nombres de variables `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `NEXT_PUBLIC_SITE_URL`.
4. Confirma el inicio de sesión local con un usuario real. Si aún no instalaste nuevas tablas, puede permitir login pero fallar `/admin`: es normal.
5. En SQL Editor del Supabase original inspecciona tablas públicas y políticas antes de migrar:

```sql
select table_name from information_schema.tables where table_schema='public' order by table_name;
select column_name,data_type from information_schema.columns where table_schema='public' and table_name='profiles' order by ordinal_position;
select tablename,policyname,cmd,roles,qual,with_check from pg_policies where schemaname='public' order by tablename,policyname;
select tgname from pg_trigger where tgrelid='auth.users'::regclass and not tgisinternal;
```

Si ya existen las tablas `courses`, `modules`, `lessons`, `orders`, `enrollments` o `lesson_media`, NO ejecutes automáticamente el esquema: requieren adaptación específica para evitar incompatibilidades. Igualmente audita políticas RLS de `profiles` (las anteriores pueden continuar activas).

6. Si las tablas del LMS no existen, **tras tener backup confirmado**, ejecuta `supabase/schema-existing-supabase.sql` en SQL Editor. No ejecutes el `schema.sql` de instalación nueva. Luego ejecuta `supabase/seed.sql`.
7. En Authentication > Users identifica tu UUID. Asegúrate de que existe una fila con ese `id` en `public.profiles`. El SQL siguiente es únicamente para tu propia cuenta (ajusta el UUID, no uses email en el SQL):

```sql
begin;
alter table public.profiles disable trigger elart_protect_role;
update public.profiles set role='admin' where id='TU-UUID-AQUI';
alter table public.profiles enable trigger elart_protect_role;
commit;
```

8. Configura Google OAuth según las instrucciones del README. Verifica login correo, Google, campus, y prueba autorización de estudiante frente a admin.
9. **Despliegue:** trabaja primero en una rama `preview-academia-pro` de tu repositorio original. Haz copia de respaldo del proyecto anterior; introduce el código nuevo en la raíz del repositorio pero NO reemplaces `.git` ni `.env.local` y NO subas `media-import/` si hay videos privados. Ejecuta `npm ci`, `npm run typecheck`, `npm run build`. Haz commit/push a rama para Vercel Preview. Solo si aprueba, fusiona esa rama a `main` y Vercel actualizará el mismo dominio.
10. **Seguridad:** no publiques `.env.local` ni secretos, revisa las políticas RLS existentes de tu proyecto y los derechos de videos antes de publicar. Los usuarios existentes conservan sus UUID en el mismo proyecto Supabase. Las matrículas antiguas, si existieran, requieren migración por separado.

Para Google Cloud, en Redirect URI de Google se usa el callback de **Supabase**; en Supabase Auth URL Configuration se agregan los callbacks de la web (`/auth/callback`). Son dos URLs diferentes y ambas son necesarias.
