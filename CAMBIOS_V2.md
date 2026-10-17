# ELART ACADEMIA PRO v2 — autenticación y conexión al proyecto existente

## Cambios incluidos

- Botón «Continuar con Google» en `/login` y «Registrarme con Google» en `/registro`.
- Callback SSR `app/auth/callback/route.ts` con intercambio de código OAuth PKCE y cookies de sesión.
- Formulario de contraseña con reglas visibles: 10–72 caracteres, mayúscula, minúscula y número.
- Validación obligatoria en el servidor para crear cuentas y restablecer contraseñas.
- Inicio de sesión tradicional intacto para cuentas ya existentes: se recuperan conectando el MISMO Supabase.
- Archivo `supabase/schema-existing-supabase.sql`, alternativo a `schema.sql`, que preserva el trigger de perfiles antiguo y agrega el campo `role`.
- `GUIA_MIGRACION_SIN_PERDER_USUARIOS.md` con auditoría SQL, backup y publicación por rama en GitHub/Vercel.
- `media-import/` excluido de Git para evitar incluir videos privados en el repositorio.

## No incluido ni automatizado

- Client ID/Secret de Google (se configura en Google Cloud y Supabase, nunca dentro del ZIP).
- Cambio a base de datos real o despliegue en Vercel: requiere tu confirmación, backup y configurar tus propias credenciales.
- Pruebas reales contra tu Supabase porque no se tiene acceso a esa base.
- Compilación Next.js completa: requiere `npm ci` y `npm run build` en tu equipo.

## Orden mínimo

1. Reutiliza la URL de Supabase y anon/publishable key del sitio antiguo en `.env.local` del nuevo.
2. Reinicia `npm run dev` y prueba un login antiguo.
3. Audita el esquema actual con consultas de `GUIA_MIGRACION_SIN_PERDER_USUARIOS.md`; toma un backup.
4. En caso de tablas compatibles, aplica `schema-existing-supabase.sql` y luego `seed.sql`.
5. Asigna tu perfil de administrador por UUID en SQL Editor.
6. Activa Google provider y configura URLs de callback Google Cloud y Supabase.
7. Prueba el campus, compra de pruebas y backoffice, luego crea una rama en el repositorio de GitHub conectado a Vercel.
