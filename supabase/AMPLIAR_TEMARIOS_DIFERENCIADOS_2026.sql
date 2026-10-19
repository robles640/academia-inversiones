-- AMPLIACIÓN ACADÉMICA DIFERENCIADA · ELART ACADEMIA
-- Diseñado a partir de los 5 cursos existentes con 5 módulos y 25 lecciones cada uno.
-- Incorpora 38 lecciones nuevas: IA 31, Excel y Power BI 34, Marketing 29, Web 36, Inglés 33.
-- No elimina ni reescribe los 125 temas anteriores, videos, matrículas, órdenes o perfiles.
-- Las nuevas clases SON TEMARIO PLANIFICADO; no incluyen material audiovisual.
-- Si se vuelve a ejecutar, no duplica lecciones ya presentes por módulo y posición.

BEGIN;
DO $academia$
DECLARE
  item record;
  course_uuid uuid;
  module_uuid uuid;
BEGIN
  -- Comprobar existencia de los cinco cursos antes de insertar un solo registro.
  IF (SELECT COUNT(*) FROM public.courses
      WHERE slug IN ('ia-para-negocios','data-analytics-powerbi','marketing-digital-ads','desarrollo-web-fullstack','ingles-corporativo')) <> 5 THEN
    RAISE EXCEPTION 'No se localizaron los cinco cursos previstos: operación cancelada';
  END IF;

  -- Crear módulos nuevos de forma conservadora.
  FOR item IN SELECT * FROM (VALUES
 ('ia-para-negocios', 5, 'Herramientas avanzadas, documentos y agentes de IA'),
 ('data-analytics-powerbi', 5, 'Administración y rendimiento de Power BI'),
 ('data-analytics-powerbi', 6, 'Automatización y entrega profesional de dashboards'),
 ('marketing-digital-ads', 5, 'Estrategia multicanal y fidelización de clientes'),
 ('desarrollo-web-fullstack', 5, 'Pruebas automatizadas e integración continua'),
 ('desarrollo-web-fullstack', 6, 'Seguridad, operación y rendimiento en producción'),
 ('desarrollo-web-fullstack', 7, 'Gestión y entrega de proyectos para clientes'),
 ('ingles-corporativo', 5, 'Comunicación intercultural y equipos internacionales'),
 ('ingles-corporativo', 6, 'Prácticas integrales y fluidez empresarial')
  ) AS x(slug, module_position, module_title)
  LOOP
    SELECT id INTO course_uuid FROM public.courses WHERE slug=item.slug;
    IF NOT EXISTS (SELECT 1 FROM public.modules
                   WHERE course_id=course_uuid AND position=item.module_position) THEN
      INSERT INTO public.modules(course_id,title,position)
      VALUES(course_uuid,item.module_title,item.module_position);
    END IF;
  END LOOP;

  -- Agregar clases complementarias específicas, sin sobrescribir posiciones ocupadas.
  FOR item IN SELECT * FROM (VALUES
 ('ia-para-negocios', 0, 5, 'Evaluar proveedores de IA y proteger información', 'Comparar políticas de datos, costos, retención y riesgos en decisiones de compra de herramientas.'),
 ('ia-para-negocios', 5, 0, 'De texto a imagen: flujos multimodales', 'Diseñar un proceso para convertir documentos y briefs en propuestas visuales revisables.'),
 ('ia-para-negocios', 5, 1, 'Lectura de PDFs e informes complejos', 'Extraer información de documentos y validar cifras, referencias y contexto.'),
 ('ia-para-negocios', 5, 2, 'Asistentes con base de conocimiento', 'Organizar documentos propios y diseñar respuestas que citen las fuentes utilizadas.'),
 ('ia-para-negocios', 5, 3, 'Agentes, herramientas y aprobaciones humanas', 'Distinguir automatizaciones simples de agentes y definir límites de ejecución.'),
 ('ia-para-negocios', 5, 4, 'Costos y monitoreo del asistente', 'Medir uso, latencia, resultados y desviaciones en un piloto.'),
 ('data-analytics-powerbi', 1, 5, 'Consolidar archivos mensuales con Power Query', 'Unificar ventas de varios meses usando esquemas y transformaciones repetibles.'),
 ('data-analytics-powerbi', 2, 5, 'Medidas DAX para indicadores de negocio', 'Construir medidas de margen, participación y variación contra objetivos.'),
 ('data-analytics-powerbi', 5, 0, 'Optimizar modelos y tiempos de respuesta', 'Identificar relaciones innecesarias y reducir columnas de alta cardinalidad.'),
 ('data-analytics-powerbi', 5, 1, 'Parámetros, actualización e incrementalidad', 'Planificar cargas y refrescos de datos según el tamaño y la frecuencia.'),
 ('data-analytics-powerbi', 5, 2, 'Seguridad por filas y permisos en Power BI', 'Diseñar restricciones de acceso para vendedores, regiones y supervisores.'),
 ('data-analytics-powerbi', 5, 3, 'Publicación y espacios de trabajo', 'Organizar reportes, permisos, audiencias y versiones para compartir.'),
 ('data-analytics-powerbi', 6, 0, 'Automatizar alertas y reportes', 'Configurar un proceso de aviso basado en condiciones de negocio.'),
 ('data-analytics-powerbi', 6, 1, 'Integrar Excel, Power BI y presentaciones', 'Preparar un circuito entre datos, visualización y reuniones ejecutivas.'),
 ('data-analytics-powerbi', 6, 2, 'Entrega final: manual y tablero operativo', 'Documentar fuentes, medidas, actualizaciones, accesos y lecciones aprendidas.'),
 ('marketing-digital-ads', 5, 0, 'Google Ads: búsquedas con intención de compra', 'Diseñar grupos de anuncios por necesidad y analizar palabras clave relevantes.'),
 ('marketing-digital-ads', 5, 1, 'SEO y contenidos de captación sostenible', 'Estructurar páginas informativas para búsquedas y preguntas reales.'),
 ('marketing-digital-ads', 5, 2, 'Remarketing responsable y fidelización', 'Diseñar recorridos de retención respetando permisos y preferencias.'),
 ('marketing-digital-ads', 5, 3, 'Plan multicanal de 90 días', 'Integrar anuncios, contenido y seguimiento con objetivos por etapa.'),
 ('desarrollo-web-fullstack', 5, 0, 'Pruebas unitarias con Vitest', 'Probar validadores, funciones y estados relevantes con casos reproducibles.'),
 ('desarrollo-web-fullstack', 5, 1, 'Pruebas de interfaz y recorridos con Playwright', 'Verificar inicio de sesión, formularios y navegación con escenarios.'),
 ('desarrollo-web-fullstack', 5, 2, 'Integración continua con GitHub Actions', 'Configurar validación automática de lint y build antes de publicar.'),
 ('desarrollo-web-fullstack', 5, 3, 'Revisión de código y control de versiones', 'Aplicar ramas, pull requests y revisiones de cambios.'),
 ('desarrollo-web-fullstack', 6, 0, 'Seguridad de APIs y control de accesos', 'Revisar autorización por recurso, validación, limitación de solicitudes y registros.'),
 ('desarrollo-web-fullstack', 6, 1, 'Respaldo de datos y migraciones seguras', 'Planificar copias de seguridad, cambios de esquema y recuperación.'),
 ('desarrollo-web-fullstack', 6, 2, 'Observabilidad, logs y alertas', 'Medir errores, latencia y disponibilidad del entorno de producción.'),
 ('desarrollo-web-fullstack', 6, 3, 'Optimización y almacenamiento en caché', 'Distinguir datos públicos y privados y elegir estrategias de caché.'),
 ('desarrollo-web-fullstack', 7, 0, 'Definir el alcance de un proyecto real', 'Redactar requisitos, riesgos, cronograma e hitos verificables.'),
 ('desarrollo-web-fullstack', 7, 1, 'Documentación técnica y entrega al cliente', 'Crear guía de instalación, variables de entorno y manual básico.'),
 ('desarrollo-web-fullstack', 7, 2, 'Mantenimiento, soporte y evolución del producto', 'Organizar incidencias, mejoras y criterios para nuevas versiones.'),
 ('ingles-corporativo', 0, 5, 'Preguntar y confirmar instrucciones en el trabajo', 'Practicar aclaraciones y reformulación de tareas para evitar malentendidos.'),
 ('ingles-corporativo', 5, 0, 'Diferencias culturales en comunicación empresarial', 'Reconocer estilos de cortesía, jerarquía y acuerdos internacionales.'),
 ('ingles-corporativo', 5, 1, 'Participar en reuniones remotas con fluidez', 'Interrumpir con cortesía, pedir la palabra y resumir acuerdos.'),
 ('ingles-corporativo', 5, 2, 'Mensajes ante retrasos y cambios de prioridad', 'Comunicar problemas, renegociar fechas y proponer soluciones.'),
 ('ingles-corporativo', 5, 3, 'Presentar datos y resultados a un equipo global', 'Describir tendencias, comparaciones y recomendaciones sin ambigüedad.'),
 ('ingles-corporativo', 6, 0, 'Simulación de negociación comercial', 'Practicar propuestas, objeciones y cierres en distintos escenarios.'),
 ('ingles-corporativo', 6, 1, 'Simulación de presentación ante directivos', 'Construir una exposición breve con preguntas y respuestas.'),
 ('ingles-corporativo', 6, 2, 'Plan de práctica de 30 días', 'Evaluar comprensión, escritura y expresión oral para continuar mejorando.')
  ) AS x(slug,module_position,lesson_position,lesson_title,lesson_description)
  LOOP
    SELECT id INTO course_uuid FROM public.courses WHERE slug=item.slug;
    SELECT id INTO module_uuid FROM public.modules
      WHERE course_id=course_uuid AND position=item.module_position
      ORDER BY id LIMIT 1;
    IF module_uuid IS NULL THEN
      RAISE EXCEPTION 'No existe el módulo % para curso %',item.module_position,item.slug;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.lessons
                   WHERE module_id=module_uuid AND position=item.lesson_position) THEN
      INSERT INTO public.lessons(module_id,title,description,position,duration_label,is_preview)
      VALUES(module_uuid,item.lesson_title,item.lesson_description,
             item.lesson_position,'',false);
    END IF;
  END LOOP;
END $academia$;

-- Mantener una secuencia pedagógica: el proyecto final queda después de los temas avanzados.
-- Solo cambia el orden del módulo existente, nunca sus lecciones ni sus identificadores.
UPDATE public.modules m
SET position = (SELECT MAX(x.position) + 1 FROM public.modules x WHERE x.course_id=m.course_id)
WHERE m.position=4
  AND m.title ILIKE '%proyecto%'
  AND m.course_id IN (
    SELECT id FROM public.courses WHERE slug IN
      ('ia-para-negocios','data-analytics-powerbi','marketing-digital-ads',
       'desarrollo-web-fullstack','ingles-corporativo')
  );

-- Duración curricular: no presenta los temas como videos grabados.
UPDATE public.courses c
SET duration_label =
  (SELECT count(*) FROM public.lessons l
   JOIN public.modules m ON m.id=l.module_id WHERE m.course_id=c.id)::text
  || ' lecciones del temario · '
  || (SELECT count(*) FROM public.modules m WHERE m.course_id=c.id)::text
  || ' módulos'
WHERE c.slug IN ('ia-para-negocios','data-analytics-powerbi',
                 'marketing-digital-ads','desarrollo-web-fullstack','ingles-corporativo');

-- Verificación detallada; las cifras reales se obtienen de Supabase.
SELECT c.slug,c.title,c.status,
       count(DISTINCT m.id) AS modulos,
       count(DISTINCT l.id) AS lecciones,
       count(DISTINCT lm.lesson_id) AS clases_con_video
FROM public.courses c
LEFT JOIN public.modules m ON m.course_id=c.id
LEFT JOIN public.lessons l ON l.module_id=m.id
LEFT JOIN public.lesson_media lm ON lm.lesson_id=l.id
WHERE c.slug IN ('ia-para-negocios','data-analytics-powerbi',
                 'marketing-digital-ads','desarrollo-web-fullstack','ingles-corporativo')
GROUP BY c.slug,c.title,c.status
ORDER BY c.slug;
COMMIT;
