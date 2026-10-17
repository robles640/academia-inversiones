export type Course = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  price_usd: number;
  level: string;
  duration_label: string;
  cover_url: string;
  status: 'published' | 'coming_soon' | 'draft';
  badge: string;
  featured?: boolean;
};
export const courses: Course[] = [
  { slug:'bolsa-de-valores', title:'Inversiones en Bolsa de Valores y Criptomonedas',category:'Finanzas e inversiones',summary:'Aprende a invertir en acciones, ETFs y activos digitales con criterio, disciplina y control del riesgo.',description:'De los fundamentos del mercado y la elección de plataformas a la construcción de una cartera diversificada. Un recorrido práctico con lecciones y casos reales.',price_usd:35,level:'Desde cero',duration_label:'48 lecciones',cover_url:'/courses/bolsa-de-valores.svg',status:'published',badge:'Curso principal',featured:true},
  {slug:'ia-para-negocios',title:'Inteligencia Artificial para Negocios',category:'IA y productividad',summary:'Utiliza ChatGPT, asistentes y automatizaciones para resolver tareas reales en tu trabajo o negocio.',description:'Aprende prompting, creación de contenido, investigación, flujos de automatización y productividad aplicada.',price_usd:39,level:'Principiante a intermedio',duration_label:'Programa en preparación',cover_url:'/courses/ia-para-negocios.svg',status:'coming_soon',badge:'Alta demanda'},
  {slug:'data-analytics-powerbi',title:'Excel Avanzado y Power BI',category:'Análisis de datos',summary:'Domina Excel, modelos de datos, dashboards y reportes para tomar mejores decisiones.',description:'Fórmulas, tablas dinámicas, Power Query, modelos de datos y visualización con casos prácticos.',price_usd:39,level:'Desde cero',duration_label:'Programa en preparación',cover_url:'/courses/data-analytics-powerbi.svg',status:'coming_soon',badge:'Habilidad profesional'},
  {slug:'marketing-digital-ads',title:'Marketing Digital y Publicidad Online',category:'Marketing y ventas',summary:'Planifica campañas en Meta Ads y aprende a generar clientes mediante estrategias medibles.',description:'Construye una estrategia de adquisición con contenido, anuncios, analítica y embudos de venta.',price_usd:45,level:'Desde cero',duration_label:'Programa en preparación',cover_url:'/courses/marketing-digital-ads.svg',status:'coming_soon',badge:'Para emprendedores'},
  {slug:'desarrollo-web-fullstack',title:'Desarrollo Web Full Stack',category:'Tecnología',summary:'Construye sitios y aplicaciones con HTML, CSS, JavaScript, React y bases de datos.',description:'Del diseño web responsivo a aplicaciones con autenticación, APIs y despliegue.',price_usd:49,level:'Desde cero',duration_label:'Programa en preparación',cover_url:'/courses/desarrollo-web-fullstack.svg',status:'coming_soon',badge:'Carrera digital'},
  {slug:'ingles-corporativo',title:'Inglés Profesional y para Entrevistas',category:'Idiomas',summary:'Desarrolla inglés práctico para entrevistas, reuniones, correos y oportunidades laborales.',description:'Lecciones enfocadas en vocabulario de trabajo, conversación y comunicación profesional.',price_usd:39,level:'Desde cero',duration_label:'Programa en preparación',cover_url:'/courses/ingles-corporativo.svg',status:'coming_soon',badge:'Desarrollo profesional'},
];
export const money=(value:number)=> new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
export const whatsappLink='https://wa.me/59174173222';
