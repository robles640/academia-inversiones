-- AMPLIACIÓN CONSERVADORA DEL TEMARIO: 5 cursos, 5 módulos y 25 lecciones previstos por curso.
-- Sólo crea contenido que falte y actualiza títulos genéricos de lecciones SIN material asociado.
-- No altera matrículas, alumnos, órdenes, videos ni los estados de publicación.
-- Las lecciones añadidas son un PLAN FORMATIVO: todavía requieren videos/materiales originales.
-- Ejecutar desde Supabase SQL Editor tras revisar y respaldar datos.
BEGIN;
DO $expand$
DECLARE r record; cid uuid; mid uuid; lid uuid;
BEGIN
FOR r IN
 SELECT * FROM (VALUES
  ('ia-para-negocios', 0, 'Fundamentos y herramientas de IA', 0, 'Qué puede resolver la IA en una empresa', 'Distinguir tareas automatizables, límites técnicos y oportunidades reales por área.'),
  ('ia-para-negocios', 0, 'Fundamentos y herramientas de IA', 1, 'Crear cuentas y configurar asistentes', 'Preparar entornos de trabajo, idioma, privacidad y ajustes de las herramientas.'),
  ('ia-para-negocios', 0, 'Fundamentos y herramientas de IA', 2, 'Comparar modelos y elegir herramientas', 'Seleccionar asistentes según calidad, costo, confidencialidad y necesidades.'),
  ('ia-para-negocios', 0, 'Fundamentos y herramientas de IA', 3, 'Protección de datos y uso responsable', 'Aplicar criterios de seguridad y evitar exponer datos de clientes en prompts.'),
  ('ia-para-negocios', 0, 'Fundamentos y herramientas de IA', 4, 'Diseñar un plan de adopción de IA', 'Identificar tres procesos y definir metas, responsables e indicadores.'),
  ('ia-para-negocios', 1, 'Prompts y tareas productivas', 0, 'Estructura de instrucciones eficaces', 'Redactar prompts con rol, objetivo, contexto, formato y restricciones.'),
  ('ia-para-negocios', 1, 'Prompts y tareas productivas', 1, 'Investigación y verificación de respuestas', 'Contrastar referencias y reducir errores o respuestas inventadas.'),
  ('ia-para-negocios', 1, 'Prompts y tareas productivas', 2, 'Redacción comercial y correos profesionales', 'Preparar y revisar respuestas, propuestas, anuncios y comunicaciones.'),
  ('ia-para-negocios', 1, 'Prompts y tareas productivas', 3, 'Análisis de documentos y hojas de cálculo', 'Extraer hallazgos, resumir reportes y revisar cifras con supervisión.'),
  ('ia-para-negocios', 1, 'Prompts y tareas productivas', 4, 'Crear plantillas de prompts reutilizables', 'Organizar una biblioteca de tareas frecuentes con ejemplos evaluables.'),
  ('ia-para-negocios', 2, 'Automatización aplicada y casos', 0, 'Mapa de procesos repetitivos', 'Representar pasos de atención, ventas y operaciones con entradas y salidas.'),
  ('ia-para-negocios', 2, 'Automatización aplicada y casos', 1, 'Conectar formularios y hojas de cálculo', 'Organizar flujos simples con validación de datos y registro de resultados.'),
  ('ia-para-negocios', 2, 'Automatización aplicada y casos', 2, 'Asistente para atención al cliente', 'Diseñar respuestas frecuentes, escalamiento a personas y control de calidad.'),
  ('ia-para-negocios', 2, 'Automatización aplicada y casos', 3, 'Automatización de reportes semanales', 'Definir informes automáticos con métricas, periodicidad y comprobación humana.'),
  ('ia-para-negocios', 2, 'Automatización aplicada y casos', 4, 'Caso práctico de automatización integral', 'Construir un flujo de ejemplo y medir el tiempo ahorrado.'),
  ('ia-para-negocios', 3, 'Marketing, contenido y ventas con IA', 0, 'Investigar clientes y propuesta de valor', 'Definir perfiles de cliente usando entrevistas y datos verificables.'),
  ('ia-para-negocios', 3, 'Marketing, contenido y ventas con IA', 1, 'Plan editorial con apoyo de IA', 'Diseñar un calendario de contenidos sin duplicaciones y con objetivos.'),
  ('ia-para-negocios', 3, 'Marketing, contenido y ventas con IA', 2, 'Guiones y piezas publicitarias', 'Crear borradores de anuncios y validarlos con las normas de cada plataforma.'),
  ('ia-para-negocios', 3, 'Marketing, contenido y ventas con IA', 3, 'Embudo comercial y seguimiento', 'Organizar contactos, mensajes y etapas de conversión con consentimiento.'),
  ('ia-para-negocios', 3, 'Marketing, contenido y ventas con IA', 4, 'Medir resultados de campañas asistidas', 'Analizar tasas de respuesta, costo y aprendizajes para optimizar.'),
  ('ia-para-negocios', 4, 'Proyecto final y escalamiento', 0, 'Diagnóstico inicial del negocio', 'Elegir un caso medible con problema, alcance y requisitos.'),
  ('ia-para-negocios', 4, 'Proyecto final y escalamiento', 1, 'Prototipo del flujo de IA', 'Documentar herramientas, prompts, datos, riesgos y resultados esperados.'),
  ('ia-para-negocios', 4, 'Proyecto final y escalamiento', 2, 'Pruebas de calidad y seguridad', 'Evaluar ejemplos correctos, incorrectos, ambiguos y datos sensibles.'),
  ('ia-para-negocios', 4, 'Proyecto final y escalamiento', 3, 'Indicadores de productividad y costos', 'Comparar antes y después, incluyendo horas invertidas y suscripciones.'),
  ('ia-para-negocios', 4, 'Proyecto final y escalamiento', 4, 'Presentación del proyecto final', 'Entregar un procedimiento replicable y plan de mejoras trimestral.'),
  ('data-analytics-powerbi', 0, 'Excel desde cero y funciones', 0, 'Estructura de datos y tablas de Excel', 'Organizar registros con encabezados, tipos de datos y formatos coherentes.'),
  ('data-analytics-powerbi', 0, 'Excel desde cero y funciones', 1, 'Funciones de búsqueda y referencias', 'Aplicar BUSCARX, INDICE y COINCIDIR a un ejercicio de inventario.'),
  ('data-analytics-powerbi', 0, 'Excel desde cero y funciones', 2, 'Validación y limpieza de datos', 'Detectar duplicados, vacíos, errores de entrada y registros inconsistentes.'),
  ('data-analytics-powerbi', 0, 'Excel desde cero y funciones', 3, 'Funciones lógicas y condicionales', 'Construir indicadores con SI, SI.ERROR, SUMAR.SI.CONJUNTO y CONTAR.SI.'),
  ('data-analytics-powerbi', 0, 'Excel desde cero y funciones', 4, 'Caso práctico de control de ventas', 'Modelar una hoja de ventas con fórmulas verificables.'),
  ('data-analytics-powerbi', 1, 'Tablas dinámicas, Power Query', 0, 'Crear y personalizar tablas dinámicas', 'Resumir ventas por producto, región y fecha con filtros.'),
  ('data-analytics-powerbi', 1, 'Tablas dinámicas, Power Query', 1, 'Segmentadores, cronologías y gráficos', 'Construir una vista interactiva de un conjunto de datos.'),
  ('data-analytics-powerbi', 1, 'Tablas dinámicas, Power Query', 2, 'Introducción a Power Query', 'Importar CSV y combinar archivos sin copiar manualmente.'),
  ('data-analytics-powerbi', 1, 'Tablas dinámicas, Power Query', 3, 'Transformaciones y tipos de datos', 'Dividir columnas, limpiar valores y manejar fechas y nulos.'),
  ('data-analytics-powerbi', 1, 'Tablas dinámicas, Power Query', 4, 'Automatizar una actualización de datos', 'Crear un flujo reproducible de limpieza y carga a Excel.'),
  ('data-analytics-powerbi', 2, 'Modelos de datos y Power BI', 0, 'Importación de fuentes en Power BI', 'Conectar archivos y revisar la calidad del modelo importado.'),
  ('data-analytics-powerbi', 2, 'Modelos de datos y Power BI', 1, 'Relaciones y modelo en estrella', 'Diferenciar hechos y dimensiones con claves y cardinalidad.'),
  ('data-analytics-powerbi', 2, 'Modelos de datos y Power BI', 2, 'Introducción a DAX', 'Crear medidas con SUM, COUNTROWS y CALCULATE.'),
  ('data-analytics-powerbi', 2, 'Modelos de datos y Power BI', 3, 'Contexto de filtro y medidas de tiempo', 'Comparar periodos y explicar filtros y acumulados.'),
  ('data-analytics-powerbi', 2, 'Modelos de datos y Power BI', 4, 'Construir un modelo de análisis comercial', 'Integrar tablas de productos, clientes, fechas y transacciones.'),
  ('data-analytics-powerbi', 3, 'Visualización y storytelling de datos', 0, 'Principios de visualización ejecutiva', 'Elegir gráficos adecuados y evitar escalas engañosas.'),
  ('data-analytics-powerbi', 3, 'Visualización y storytelling de datos', 1, 'Diseñar indicadores y tarjetas KPI', 'Definir metas y diferencias entre métricas de actividad y resultado.'),
  ('data-analytics-powerbi', 3, 'Visualización y storytelling de datos', 2, 'Filtros, interacción y navegación', 'Crear un reporte con segmentadores y páginas vinculadas.'),
  ('data-analytics-powerbi', 3, 'Visualización y storytelling de datos', 3, 'Diseño accesible de dashboards', 'Cuidar contraste, jerarquía, etiquetas y visualización móvil.'),
  ('data-analytics-powerbi', 3, 'Visualización y storytelling de datos', 4, 'Presentar conclusiones para decisiones', 'Explicar hallazgos, riesgos y recomendaciones respaldadas por datos.'),
  ('data-analytics-powerbi', 4, 'Proyecto profesional de analítica', 0, 'Definir preguntas del negocio', 'Traducir objetivos comerciales en métricas y fuentes.'),
  ('data-analytics-powerbi', 4, 'Proyecto profesional de analítica', 1, 'Preparar un conjunto de datos realista', 'Documentar origen, limpieza, supuestos y limitaciones.'),
  ('data-analytics-powerbi', 4, 'Proyecto profesional de analítica', 2, 'Construir el dashboard integral', 'Integrar páginas de ventas, clientes y evolución temporal.'),
  ('data-analytics-powerbi', 4, 'Proyecto profesional de analítica', 3, 'Control de calidad y publicación', 'Verificar cifras y permisos antes de compartir el reporte.'),
  ('data-analytics-powerbi', 4, 'Proyecto profesional de analítica', 4, 'Exposición del proyecto final', 'Entregar informe ejecutivo, conclusiones y archivo documentado.'),
  ('marketing-digital-ads', 0, 'Estrategia, audiencia y oferta', 0, 'Fundamentos del marketing digital', 'Relacionar objetivos comerciales, canales y tipos de contenido.'),
  ('marketing-digital-ads', 0, 'Estrategia, audiencia y oferta', 1, 'Segmentar clientes y necesidades', 'Elaborar perfiles de audiencia sustentados en investigación.'),
  ('marketing-digital-ads', 0, 'Estrategia, audiencia y oferta', 2, 'Propuesta de valor y posicionamiento', 'Diferenciar una oferta con beneficios y pruebas concretas.'),
  ('marketing-digital-ads', 0, 'Estrategia, audiencia y oferta', 3, 'Análisis de competencia y mercado', 'Comparar anuncios, mensajes y ofertas sin copiar contenido.'),
  ('marketing-digital-ads', 0, 'Estrategia, audiencia y oferta', 4, 'Diseñar un plan de adquisición', 'Elegir objetivos, presupuesto y métricas de un embudo.'),
  ('marketing-digital-ads', 1, 'Meta Ads: configuración y campaña', 0, 'Estructura del administrador de anuncios', 'Reconocer cuentas, campañas, conjuntos de anuncios y anuncios.'),
  ('marketing-digital-ads', 1, 'Meta Ads: configuración y campaña', 1, 'Objetivos y eventos de conversión', 'Elegir entre tráfico, contactos, ventas y medición de eventos.'),
  ('marketing-digital-ads', 1, 'Meta Ads: configuración y campaña', 2, 'Audiencias y segmentación ética', 'Configurar públicos respetando privacidad y restricciones.'),
  ('marketing-digital-ads', 1, 'Meta Ads: configuración y campaña', 3, 'Creatividades y textos persuasivos', 'Preparar anuncios adecuados para pruebas A/B.'),
  ('marketing-digital-ads', 1, 'Meta Ads: configuración y campaña', 4, 'Publicar una campaña de ejemplo', 'Revisar presupuesto, ubicaciones, enlaces y vista previa.'),
  ('marketing-digital-ads', 2, 'Métricas, optimización y ventas', 0, 'Interpretar CPM, CPC, CTR y CPA', 'Calcular y distinguir indicadores de entrega y conversión.'),
  ('marketing-digital-ads', 2, 'Métricas, optimización y ventas', 1, 'Medir con píxel y eventos', 'Revisar conceptos de implementación, atribución y consentimiento.'),
  ('marketing-digital-ads', 2, 'Métricas, optimización y ventas', 2, 'Diseñar pruebas A/B', 'Probar variables con objetivos claros y presupuesto controlado.'),
  ('marketing-digital-ads', 2, 'Métricas, optimización y ventas', 3, 'Optimizar campañas sin decisiones impulsivas', 'Identificar patrones y esperar evidencia suficiente.'),
  ('marketing-digital-ads', 2, 'Métricas, optimización y ventas', 4, 'Reportar resultados y retorno estimado', 'Construir un cuadro de seguimiento y explicar limitaciones.'),
  ('marketing-digital-ads', 3, 'Contenido y embudos de conversión', 0, 'Planificación de contenido orgánico', 'Definir pilares, frecuencia y calendario editorial.'),
  ('marketing-digital-ads', 3, 'Contenido y embudos de conversión', 1, 'Landing pages orientadas a conversiones', 'Escribir secciones, formularios y llamadas a la acción.'),
  ('marketing-digital-ads', 3, 'Contenido y embudos de conversión', 2, 'Email marketing y seguimiento', 'Diseñar mensajes de bienvenida y nutrición con consentimiento.'),
  ('marketing-digital-ads', 3, 'Contenido y embudos de conversión', 3, 'Automatización básica de prospectos', 'Organizar etapas, etiquetas y seguimiento sin spam.'),
  ('marketing-digital-ads', 3, 'Contenido y embudos de conversión', 4, 'Mejoras en la experiencia del cliente', 'Revisar fricciones desde el clic hasta la inscripción.'),
  ('marketing-digital-ads', 4, 'Proyecto final de campaña digital', 0, 'Brief comercial de campaña', 'Documentar objetivo, audiencia, propuesta y restricciones.'),
  ('marketing-digital-ads', 4, 'Proyecto final de campaña digital', 1, 'Plan de presupuesto y proyección', 'Distribuir inversión y definir metas realistas.'),
  ('marketing-digital-ads', 4, 'Proyecto final de campaña digital', 2, 'Producir piezas y anuncios', 'Preparar creatividades y textos con variantes para prueba.'),
  ('marketing-digital-ads', 4, 'Proyecto final de campaña digital', 3, 'Tablero de métricas y optimización', 'Simular y analizar resultados para decidir ajustes.'),
  ('marketing-digital-ads', 4, 'Proyecto final de campaña digital', 4, 'Presentar una estrategia integral', 'Entregar el plan operativo, seguimiento y aprendizajes.'),
  ('desarrollo-web-fullstack', 0, 'HTML, CSS y diseño responsivo', 0, 'Estructura semántica con HTML5', 'Construir encabezados, secciones y formularios accesibles.'),
  ('desarrollo-web-fullstack', 0, 'HTML, CSS y diseño responsivo', 1, 'Fundamentos de CSS y selectores', 'Aplicar estilos mantenibles con clases y variables.'),
  ('desarrollo-web-fullstack', 0, 'HTML, CSS y diseño responsivo', 2, 'Flexbox y CSS Grid', 'Organizar tarjetas y secciones con diseños fluidos.'),
  ('desarrollo-web-fullstack', 0, 'HTML, CSS y diseño responsivo', 3, 'Adaptación móvil y accesibilidad', 'Crear interfaces legibles y navegables en pantallas pequeñas.'),
  ('desarrollo-web-fullstack', 0, 'HTML, CSS y diseño responsivo', 4, 'Proyecto de landing page profesional', 'Construir una página informativa con navegación y contacto.'),
  ('desarrollo-web-fullstack', 1, 'JavaScript y React', 0, 'Variables, funciones y estructuras', 'Resolver pequeñas interacciones con JavaScript moderno.'),
  ('desarrollo-web-fullstack', 1, 'JavaScript y React', 1, 'Manipulación del DOM y eventos', 'Crear validación visual, menús y controles interactivos.'),
  ('desarrollo-web-fullstack', 1, 'JavaScript y React', 2, 'Asincronía y consumo de APIs', 'Trabajar con fetch, promesas y manejo de errores.'),
  ('desarrollo-web-fullstack', 1, 'JavaScript y React', 3, 'Componentes y propiedades en React', 'Dividir una interfaz en piezas reutilizables.'),
  ('desarrollo-web-fullstack', 1, 'JavaScript y React', 4, 'Estado, formularios y efectos', 'Implementar formularios y listas con actualización de datos.'),
  ('desarrollo-web-fullstack', 2, 'Backend, bases de datos y despliegue', 0, 'HTTP, rutas y arquitectura cliente servidor', 'Comprender peticiones, respuestas y endpoints.'),
  ('desarrollo-web-fullstack', 2, 'Backend, bases de datos y despliegue', 1, 'Crear una API con validación', 'Implementar operaciones CRUD con control de entradas.'),
  ('desarrollo-web-fullstack', 2, 'Backend, bases de datos y despliegue', 2, 'Modelado relacional y SQL', 'Definir tablas, claves y relaciones para una aplicación.'),
  ('desarrollo-web-fullstack', 2, 'Backend, bases de datos y despliegue', 3, 'Autenticación y autorización', 'Distinguir identidad, sesión y permisos de recursos.'),
  ('desarrollo-web-fullstack', 2, 'Backend, bases de datos y despliegue', 4, 'Variables de entorno y despliegue', 'Configurar producción sin exponer credenciales privadas.'),
  ('desarrollo-web-fullstack', 3, 'Aplicación full stack en Next.js', 0, 'Enrutamiento y layouts en Next.js', 'Construir páginas públicas y privadas con navegación.'),
  ('desarrollo-web-fullstack', 3, 'Aplicación full stack en Next.js', 1, 'Componentes de servidor y cliente', 'Determinar dónde realizar lecturas y acciones interactivas.'),
  ('desarrollo-web-fullstack', 3, 'Aplicación full stack en Next.js', 2, 'Integración de formularios y base de datos', 'Guardar y consultar información con validación de servidor.'),
  ('desarrollo-web-fullstack', 3, 'Aplicación full stack en Next.js', 3, 'Gestión de carga, errores y estados vacíos', 'Crear mensajes claros ante problemas de red y datos.'),
  ('desarrollo-web-fullstack', 3, 'Aplicación full stack en Next.js', 4, 'Diseño de panel de administración', 'Construir listas, filtros y formularios de gestión.'),
  ('desarrollo-web-fullstack', 4, 'Calidad, seguridad y proyecto final', 0, 'Pruebas unitarias y de integración', 'Verificar reglas de negocio y rutas críticas.'),
  ('desarrollo-web-fullstack', 4, 'Calidad, seguridad y proyecto final', 1, 'Pruebas responsivas y accesibilidad', 'Evaluar navegación por teclado y tamaños de pantalla.'),
  ('desarrollo-web-fullstack', 4, 'Calidad, seguridad y proyecto final', 2, 'Seguridad básica de aplicaciones', 'Revisar validación, permisos y exposición de secretos.'),
  ('desarrollo-web-fullstack', 4, 'Calidad, seguridad y proyecto final', 3, 'Optimización, SEO y rendimiento', 'Medir carga, imágenes, metadatos y caché.'),
  ('desarrollo-web-fullstack', 4, 'Calidad, seguridad y proyecto final', 4, 'Entrega y documentación del proyecto', 'Publicar una aplicación funcional con README y demostración.'),
  ('ingles-corporativo', 0, 'Fundamentos y comunicación cotidiana', 0, 'Saludos y presentaciones laborales', 'Practicar presentaciones personales y fórmulas de cortesía.'),
  ('ingles-corporativo', 0, 'Fundamentos y comunicación cotidiana', 1, 'Preguntas frecuentes en el trabajo', 'Construir respuestas sobre funciones, horarios y objetivos.'),
  ('ingles-corporativo', 0, 'Fundamentos y comunicación cotidiana', 2, 'Pronunciación y escucha guiada', 'Identificar sonidos frecuentes y practicar claridad al hablar.'),
  ('ingles-corporativo', 0, 'Fundamentos y comunicación cotidiana', 3, 'Vocabulario de oficina y tecnología', 'Utilizar términos habituales en mensajes y tareas.'),
  ('ingles-corporativo', 0, 'Fundamentos y comunicación cotidiana', 4, 'Diálogos cotidianos y comprensión', 'Simular conversaciones de equipo con preguntas y respuestas.'),
  ('ingles-corporativo', 1, 'Correos y reuniones laborales', 0, 'Estructura de un correo profesional', 'Redactar asunto, saludo, solicitud y cierre adecuados.'),
  ('ingles-corporativo', 1, 'Correos y reuniones laborales', 1, 'Solicitudes, recordatorios y seguimiento', 'Escribir mensajes breves con tono cordial y preciso.'),
  ('ingles-corporativo', 1, 'Correos y reuniones laborales', 2, 'Vocabulario para reuniones virtuales', 'Usar expresiones para abrir, participar y cerrar reuniones.'),
  ('ingles-corporativo', 1, 'Correos y reuniones laborales', 3, 'Acordar tareas y fechas de entrega', 'Confirmar responsabilidades, plazos y prioridades en inglés.'),
  ('ingles-corporativo', 1, 'Correos y reuniones laborales', 4, 'Práctica de reunión y minuta', 'Simular una reunión y resumir decisiones por escrito.'),
  ('ingles-corporativo', 2, 'Entrevistas y presentaciones', 0, 'Preparación para una entrevista', 'Presentar experiencia y objetivos profesionales con claridad.'),
  ('ingles-corporativo', 2, 'Entrevistas y presentaciones', 1, 'Responder preguntas por competencias', 'Estructurar ejemplos usando situación, acción y resultado.'),
  ('ingles-corporativo', 2, 'Entrevistas y presentaciones', 2, 'Describir fortalezas y experiencia', 'Hablar de proyectos, habilidades y logros verificables.'),
  ('ingles-corporativo', 2, 'Entrevistas y presentaciones', 3, 'Presentaciones ejecutivas breves', 'Organizar introducción, datos, ideas clave y cierre.'),
  ('ingles-corporativo', 2, 'Entrevistas y presentaciones', 4, 'Simulación de entrevista y feedback', 'Evaluar fluidez, vocabulario y respuesta a preguntas.'),
  ('ingles-corporativo', 3, 'Negociación y atención al cliente', 0, 'Escucha activa y aclaraciones', 'Pedir precisiones y confirmar información sin confusiones.'),
  ('ingles-corporativo', 3, 'Negociación y atención al cliente', 1, 'Atención de consultas y reclamaciones', 'Responder de forma empática y proponer siguientes pasos.'),
  ('ingles-corporativo', 3, 'Negociación y atención al cliente', 2, 'Expresiones para negociación básica', 'Plantear condiciones, alternativas y acuerdos.'),
  ('ingles-corporativo', 3, 'Negociación y atención al cliente', 3, 'Conversaciones telefónicas profesionales', 'Practicar identificación, transferencia y toma de mensajes.'),
  ('ingles-corporativo', 3, 'Negociación y atención al cliente', 4, 'Caso práctico con un cliente internacional', 'Resolver una solicitud combinando oralidad y escritura.'),
  ('ingles-corporativo', 4, 'Proyecto final de inglés profesional', 0, 'Preparar perfil y currículum en inglés', 'Redactar resumen profesional con vocabulario apropiado.'),
  ('ingles-corporativo', 4, 'Proyecto final de inglés profesional', 1, 'Crear una propuesta comercial breve', 'Presentar servicios, alcance y beneficios con claridad.'),
  ('ingles-corporativo', 4, 'Proyecto final de inglés profesional', 2, 'Ensayar una reunión de presentación', 'Comunicar objetivos, avances y preguntas de los asistentes.'),
  ('ingles-corporativo', 4, 'Proyecto final de inglés profesional', 3, 'Realizar una entrevista simulada', 'Practicar respuestas y corregir errores de pronunciación.'),
  ('ingles-corporativo', 4, 'Proyecto final de inglés profesional', 4, 'Evaluación integral y plan de mejora', 'Organizar metas de práctica y recursos para el siguiente nivel.')
 ) AS v(slug,module_pos,module_title,lesson_pos,lesson_title,lesson_description)
 ORDER BY slug,module_pos,lesson_pos
LOOP
 SELECT id INTO cid FROM public.courses WHERE slug=r.slug;
 IF cid IS NULL THEN RAISE EXCEPTION 'Curso no encontrado en Supabase: %',r.slug; END IF;
 SELECT id INTO mid FROM public.modules WHERE course_id=cid AND position=r.module_pos ORDER BY id LIMIT 1;
 IF mid IS NULL THEN
   INSERT INTO public.modules(course_id,title,position) VALUES(cid,r.module_title,r.module_pos) RETURNING id INTO mid;
 END IF;
 SELECT id INTO lid FROM public.lessons WHERE module_id=mid AND position=r.lesson_pos ORDER BY id LIMIT 1;
 IF lid IS NULL THEN
   INSERT INTO public.lessons(module_id,title,description,position,duration_label,is_preview)
   VALUES(mid,r.lesson_title,r.lesson_description,r.lesson_pos,'',false);
 ELSIF r.lesson_pos < 3 THEN
   -- Sólo actualizar las antiguas fichas genéricas, siempre que no haya un video vinculado.
   UPDATE public.lessons l SET title=r.lesson_title,description=r.lesson_description
   WHERE l.id=lid
   AND l.description='Lección planificada: aún no se ha incorporado el video.'
   AND (l.title LIKE 'Introducción:%' OR l.title LIKE 'Conceptos y herramientas:%' OR l.title LIKE 'Práctica guiada:%')
   AND NOT EXISTS (SELECT 1 FROM public.lesson_media lm WHERE lm.lesson_id=l.id);
 END IF;
END LOOP;
END $expand$;

-- Sólo muestra una duración curricular real; NO marca un curso como listo o publicado.
UPDATE public.courses c SET
 duration_label=(SELECT count(*) FROM public.lessons l JOIN public.modules m ON m.id=l.module_id WHERE m.course_id=c.id)::text
 || ' lecciones · ' || (SELECT count(*) FROM public.modules m WHERE m.course_id=c.id)::text || ' módulos'
WHERE c.slug IN ('ia-para-negocios','data-analytics-powerbi','marketing-digital-ads','desarrollo-web-fullstack','ingles-corporativo');

-- Resumen para verificar cuántos módulos y lecciones quedaron en cada curso.
SELECT c.slug,c.title,c.status,COUNT(DISTINCT m.id) AS modules,COUNT(DISTINCT l.id) AS lessons,
 COUNT(DISTINCT lm.lesson_id) AS lessons_with_video
FROM public.courses c LEFT JOIN public.modules m ON m.course_id=c.id
LEFT JOIN public.lessons l ON l.module_id=m.id
LEFT JOIN public.lesson_media lm ON lm.lesson_id=l.id
WHERE c.slug IN ('ia-para-negocios','data-analytics-powerbi','marketing-digital-ads','desarrollo-web-fullstack','ingles-corporativo')
GROUP BY c.slug,c.title,c.status ORDER BY c.slug;
COMMIT;
