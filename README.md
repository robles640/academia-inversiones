## IMPORTANTE PARA ELARTACADEMIA.COM: Supabase antiguo

Si deseas conservar cuentas y contraseñas actuales: mantén el MISMO proyecto Supabase (Project URL + `anon`/publishable key). Las credenciales no están dentro del ZIP. Usa tu `.env.local` original **solo en tu PC**, no lo compartas ni lo subas al repositorio.

**Nunca ejecutes `supabase/schema.sql` directamente sobre la base antigua.** Primero realiza un respaldo y audita las tablas y políticas actuales. Para un Supabase antiguo que solo usaba `profiles`, se incluye `supabase/schema-existing-supabase.sql`, que agrega las tablas de academia y la columna `profiles.role`, preserva los perfiles y crea un trigger propio SIN reemplazar el trigger de registro del proyecto antiguo. Este script NO ha sido ejecutado sobre tu base real: si ya tienes tablas llamadas `courses`, `orders`, `lessons` o políticas RLS personalizadas, debes revisar compatibilidad antes de usarlo. El script `seed.sql` se ejecuta después de migrar y no borra contenido.

**Primer administrador (Supabase antiguo):** tras migrar y verificar `public.profiles.role`, en SQL Editor ejecuta la asignación de rol indicada más abajo, sustituyendo el UUID real y usando el trigger `elart_protect_role` en vez de `protect_role`.

**Google Auth:** Activa Google en Supabase > Authentication > Sign In / Providers. En Google Cloud crea un OAuth Client tipo Web; como redirect autorizado registra **la URL de callback que muestra el panel Google de Supabase** (`https://TU-PROYECTO.supabase.co/auth/v1/callback`). Añade como orígenes `http://localhost:3000` y `https://elartacademia.com`. Copia Client ID y Client Secret en el provider de Supabase (NO al código ni a `.env.local`). En Supabase > Authentication > URL Configuration, añade `http://localhost:3000/auth/callback` y `https://elartacademia.com/auth/callback` como redirect URLs permitidos. La aplicación incluye `app/auth/callback/route.ts` y botones de Google en login y registro.

**Contraseñas:** altas y cambios de contraseña exigen de 10 a 72 caracteres, una mayúscula, una minúscula y un número tanto en el navegador como en el servidor. Configura también la regla equivalente en Supabase > Authentication > Settings > Password Security, para que no se eluda por API. El inicio de sesión con contraseñas antiguas no se bloquea por la validación de nuestro formulario.

**Vercel/GitHub:** mantén el proyecto Vercel y repositorio actuales. Crea una rama de pruebas antes de reemplazar archivos de la carpeta raíz, mantén `.git` y `.env.local` fuera de la copia, y verifica preview antes de fusionar a `main`. En Vercel, conserva los valores Supabase existentes y añade los parámetros de pago que vayas a usar. Confirma Root Directory `.` si los archivos de Next están en la raíz.

---

# ELART ACADEMIA PRO

Plataforma web multicurso para Bolivia y Latinoamérica. Reconstrucción de un proyecto original de Next.js con un nuevo diseño corporativo, campus privado y backoffice.

## Qué incluye

- Sitio institucional y catálogo de **6 cursos**.
- Páginas de detalle, temario público, precios y estado de publicación.
- Alta, inicio/cierre de sesión y recuperación de contraseña con Supabase Auth.
- Campus privado con videos, temario y seguimiento de clases completadas.
- Panel de administración de cursos, módulos, lecciones, videos, alumnos y pagos.
- Solicitud de inscripción, comprobantes privados de transferencia y aprobación manual.
- Activación automática de matrícula al aprobar el pago mediante trigger en la base de datos.
- SQL para crear tablas, claves foráneas, triggers, RLS y buckets privados.
- Migración de **48 lecciones del curso de bolsa**, 45 URL de YouTube y 3 MP4 originales para migración a Storage.
- Imágenes de las 48 lecciones optimizadas en WebP y archivo de brochure original.
- Código sin `node_modules`, `.next`, `.git` ni `.env.local`.

## Alcance real: no se inventaron grabaciones

El curso de Bolsa incluye 48 lecciones reconstruidas a partir del ZIP recibido: 45 enlaces a YouTube y 3 MP4 colocados en `media-import/` para su posterior subida privada. **Los otros cinco cursos contienen temarios propuestos y su estado inicial es «Próximamente»**: todavía no incluyen videos, y **no aceptan pagos**. Puedes grabarlos o cargar videos de los que tengas autorización y publicarlos desde `/admin/cursos`.

Los precios en los cursos son valores iniciales configurables, no resultados de un estudio estadístico de ventas.

## 1. Requisitos

- Node.js 20.9+ o 22 LTS (recomendado).
- npm y Visual Studio Code.
- Un proyecto de Supabase.
- Cuenta de Vercel (solo si vas a publicarlo).

## 2. Abrir y ejecutar

1. Extrae el ZIP en una carpeta.
2. Abre esa carpeta con Visual Studio Code.
3. Abre una terminal integrada y ejecuta:

```bash
npm ci
npm run dev
```

4. Abre <http://localhost:3000>.

**Sin configurar Supabase**, las páginas públicas presentan el catálogo de demostración; el registro, los pagos, la administración y el campus requieren las variables y tablas descritas abajo.

Otros comandos:

```bash
npm run build
npm run lint
npm run typecheck
```

## 3. Configurar Supabase (obligatorio para autenticación, campus y backoffice)

1. Crea un proyecto nuevo en Supabase, de preferencia antes de tocar tu base de datos productiva.
2. Abre **SQL Editor**.
3. Ejecuta **todo** `supabase/schema.sql`.
4. Ejecuta `supabase/seed.sql` **después** del schema. Inserta el catálogo, las 10 unidades del curso de inversión y sus 48 lecciones. También añade planes preliminares de los cinco cursos nuevos.
5. En **Project Settings / API Keys**, copia la URL y la **publishable key** (o la antigua `anon` key). **No copies `service_role` en variables `NEXT_PUBLIC_*`.**
6. Copia `.env.example` a `.env.local` y completa:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICA
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

7. Reinicia `npm run dev`.
8. En Supabase > Authentication > URL Configuration, configura Site URL `http://localhost:3000` en local y añade las URL de producción a los redirect permitidos.
9. Configura los emails de confirmación y recuperación con el callback SSR siguiente cuando uses `token_hash`:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

Para emails de restablecimiento, usa `type=recovery`. Confirma que los templates coincidan con la modalidad de Supabase Auth activada.

**Recomendación:** habilita confirmación de email, controles de abuso y MFA para administradores.

## 4. Dar permisos al primer administrador

1. Registra tu propia cuenta desde `/registro` y confírmala.
2. Ve a Supabase > Authentication > Users y copia el UUID de **tu** usuario.
3. En SQL Editor, ejecuta sustituyendo `TU-UUID`:

```sql
begin;
alter table public.profiles disable trigger elart_protect_role;
update public.profiles set role='admin' where id='TU-UUID';
alter table public.profiles enable trigger elart_protect_role;
commit;
```

4. Inicia sesión y visita `/admin`.

**Importante:** esto permite modificar el rol exclusivamente mediante el SQL Editor de un proyecto del que seas propietario. Nunca pongas en el frontend una función pública que convierta usuarios en administradores.

## 5. Cargar los videos existentes de Bolsa

Los archivos originales se encuentran en `media-import/video1.mp4`, `media-import/video2.mp4`, `media-import/video3.mp4` y **no están dentro de `public/`**.

1. Entra a `/admin/cursos`, abre el curso Bolsa.
2. Busca las tres lecciones preliminares (primera, segunda y tercera).
3. Utiliza el control **Subir al bucket privado** para cargar cada archivo.
4. Copia la ruta generada en el campo **Ruta del video** de la misma lección.
5. Deja vacío el enlace de YouTube si usas la ruta privada.
6. Haz clic en **Guardar lección y video**.
7. Crea una matrícula de prueba desde `/admin/alumnos` y comprueba la reproducción en el campus.

Los videos de YouTube de las otras 45 lecciones se migran como enlaces embebidos y solo se entregan a usuarios con permisos, pero un video alojado públicamente en YouTube **no puede considerarse un archivo protegido**. Verifica los derechos de uso de todos los materiales antes de comercializarlos.

Las cargas convencionales del navegador son para archivos moderados (máximo 250 MB por la interfaz actual y sujeto al límite real de Supabase). Para videos grandes implementa Supabase resumable upload (TUS) o contrata Cloudflare Stream, Bunny Stream o Mux. Los enlaces firmados de Storage duran 15 minutos; la reproducción de un video prolongado puede requerir renovación del enlace.

## 6. Datos bancarios y pagos en Bolivia

La solución dispone de **transferencia manual con comprobante**. No existe una pasarela automática ni validación bancaria automática. Define tus datos bancarios antes de aceptar pagos:

```dotenv
NEXT_PUBLIC_PAYMENT_BANK_NAME=Tu banco
NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME=Titular de la cuenta
NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER=Tu número de cuenta
NEXT_PUBLIC_PAYMENT_QR_URL=/mi-qr-publico.png
```

Coloca tu QR legítimo en `public/mi-qr-publico.png`. Los valores `NEXT_PUBLIC_*` son **públicos** en el navegador: solo debes usar datos de cobro que deseas mostrar a clientes; nunca contraseñas o tokens privados. El sistema muestra el precio de los cursos en **USD**; debes definir una política de tipo de cambio y mostrar al cliente el monto exacto en BOB antes de la transferencia.

Pasos del alumno:

1. Accede al curso publicado y solicita la inscripción.
2. Se crea una orden en estado `pending` con importe tomado **desde la base de datos**.
3. Ve los datos bancarios configurados, realiza el pago y carga un comprobante privado.
4. El administrador compara el comprobante con el abono **efectivamente recibido en el banco**.
5. En `/admin/pagos` aprueba; un trigger inserta la matrícula y habilita el campus.

La aceptación de un comprobante no significa que el pago se haya recibido. **Nunca apruebes sin verificar el movimiento bancario real.**

## 7. Publicar los otros cursos

1. En `/admin/cursos` edita el curso.
2. Mantén `coming_soon` mientras produzcas las clases.
3. Crea, edita y ordena módulos/lecciones.
4. Carga material audiovisual; comprueba permisos y reproducción.
5. Cuando todo funcione, cambia el estado a `published`.

Los temarios preliminares son un punto de partida: no constituyen contenido formativo completo.

## 8. Despliegue Vercel

1. Sube **la carpeta del proyecto**, excluyendo `.env.local`, a un repositorio privado de GitHub.
2. En Vercel, importa el repositorio Next.js.
3. Configura las variables de entorno listadas en `.env.example` en **Project Settings > Environment Variables**.
4. Cambia `NEXT_PUBLIC_SITE_URL` al dominio real, por ejemplo `https://elartacademia.com`.
5. Configura ese dominio y los redirect permitidos en Supabase Authentication.
6. Ejecuta un deploy y prueba: registro, verificación de correo, acceso, autorización a cursos, subida de comprobantes, aprobación administrativa y reproductor.
7. Configura SMTP confiable para correos transaccionales y un respaldo periódico de Supabase.

## 9. Seguridad y comprobaciones recomendadas antes de vender

- No publiques `.env.local`, secretos, `service_role` ni datos bancarios privados.
- No pongas videos de pago en la carpeta `public/`.
- RLS protege tablas y buckets, pero debes probar sus políticas con usuarios de prueba diferentes.
- Revisa que un alumno sin matrícula no acceda a `/aprender/...` ni al endpoint `/api/lecciones/:id/video`.
- Exige 2FA para administradores y revisa registros de auditoría.
- Revisa legalmente términos, política de privacidad, reembolsos y obligaciones tributarias.
- Adquiere los derechos de distribución del contenido y utiliza solo materiales propios o licenciados.
- Prepara soporte al alumno, backups y monitoreo antes de cobrar en producción.

## 10. Rutas importantes

| Ruta | Uso |
|---|---|
| `/` | Inicio corporativo |
| `/cursos` | Catálogo público |
| `/cursos/[slug]` | Página de venta de cada curso |
| `/registro`, `/login` | Autenticación |
| `/dashboard` | Campus del alumno |
| `/aprender/[slug]/[lessonId]` | Reproductor con acceso controlado |
| `/checkout/[slug]` | Solicitar inscripción |
| `/pago/[id]` | Adjuntar comprobante |
| `/admin` | Backoffice |
| `/admin/cursos` | Gestión de contenidos |
| `/admin/pagos` | Aprobación de pagos |
| `/admin/alumnos` | Gestión de alumnos y matrículas |

## Licencias y derechos

El archivo PDF, los MP4, imágenes y las referencias a videos de YouTube provienen del proyecto entregado por el propietario. Este proyecto no acredita derechos sobre los contenidos de terceros, marcas o plataformas mencionadas.

## Validación del ZIP

- Se verificó que todos los archivos TypeScript y TSX sean sintácticamente parseables.
- Se incluyeron `package.json` y `package-lock.json` compatibles con el proyecto original.
- No se incluyeron `.env.local`, `.git`, `.next` ni `node_modules`.
- **Limitación del entorno de generación:** no se logró instalar dependencias desde npm aquí por falta de conectividad efectiva. Por tanto, la compilación de Next.js, el despliegue y las pruebas end-to-end con Supabase **aún deben ejecutarse localmente** siguiendo los pasos anteriores.

