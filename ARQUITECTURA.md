# Arquitectura y control de acceso

## Tecnologías

- Next.js App Router 16; React 19; TypeScript
- CSS corporativo responsivo + Tailwind 4 disponible
- Supabase Auth / PostgreSQL con RLS / Storage privado
- SSR con `@supabase/ssr` y sesión renovada en `proxy.ts`

## Modelo de datos

```text
auth.users ── 1:1 ── profiles (role: student | admin)
    │                  │
    ├── 1:N orders ────┼──── N:1 courses
    ├── N:N enrollments┘          │
    └── 1:N lesson_progress       └─ 1:N modules ── 1:N lessons ── 1:1 lesson_media
```

## Políticas

1. `courses`, `modules`, `lessons`: metadatos públicos solo si el curso está publicado o próximo a publicarse.
2. `lesson_media`: acceso únicamente a administradores, matriculados o lecciones marcadas expresamente como vista previa (tras autenticar).
3. `storage.objects`: los videos privados solo pueden ser leídos por el mismo conjunto de usuarios; el administrador es quien carga nuevos videos.
4. `orders`: cada alumno ve sus órdenes y puede añadir un comprobante; no puede modificar el importe o estado. Solo administradores aprueban o rechazan.
5. `enrollments`: inserción por administradores o trigger de aprobación, sin autoinscripción por petición del alumno.
6. `lesson_progress`: cada alumno registra progreso solo en lecciones de cursos donde está matriculado.
7. `profiles`: el alumno actualiza su nombre, pero no tiene permisos para asignarse el rol admin.

## Limitaciones deliberadas

- Un iframe de YouTube no se vuelve privado por ocultar su URL detrás de una API.
- URLs firmadas de video ofrecen control temporal, no DRM ni protección contra captura de pantalla.
- Los archivos grandes en Storage requieren cargas reanudables y potencialmente transcoding/streaming externo.
- Comprobantes transferidos requieren confirmación humana contra el banco.
- No hay cobro por tarjeta, suscripciones, facturación tributaria automática, exámenes certificados ni correos transaccionales personalizados integrados.
- No se incluyó contenido audiovisual inventado para los cinco cursos nuevos.

## Mejoras sugeridas después de la primera puesta en marcha

- Integrar streaming HLS adaptativo y expiración/rotación de URLs para videos largos.
- Gestión de contenido enriquecido, material PDF descargable privado y evaluaciones.
- Cupones y campañas con analítica de ventas.
- Email automático de matrícula y rechazo, integrando un proveedor SMTP/API.
- Pruebas E2E (Playwright) y monitoreo de errores.
- Facturación, reembolsos y pasarelas de pago según regulación de cada país.
