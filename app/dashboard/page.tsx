'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

const courseModules = [
  {
    id: 1,
    title: 'Módulo 1: Cimientos del Inversor',
    lessons: [
      { id: 101, title: 'Bienvenida y mentalidad', duration: '08:45' },
      { id: 102, title: '¿Cómo funciona la Bolsa de Valores?', duration: '15:20' },
      { id: 103, title: 'Riesgo vs. Beneficio', duration: '12:10' },
    ]
  },
  {
    id: 2,
    title: 'Módulo 2: Dominando los ETFs',
    lessons: [
      { id: 201, title: '¿Qué es un ETF y por qué es el rey?', duration: '18:30' },
      { id: 202, title: 'Análisis del sector tecnológico (VGT)', duration: '22:15' },
      { id: 203, title: 'Semiconductores al detalle (SOXX y SMH)', duration: '25:40' },
    ]
  },
  {
    id: 3,
    title: 'Módulo 3: Tu Broker Internacional',
    lessons: [
      { id: 301, title: 'Creando y verificando tu cuenta en Hapi', duration: '14:05' },
      { id: 302, title: 'Cómo fondear desde tu país sin comisiones altas', duration: '19:50' },
      { id: 303, title: 'Tu primera orden de compra en vivo', duration: '16:25' },
    ]
  },
  {
    id: 4,
    title: 'Módulo 4: Renta Fija y SAFIs Locales',
    lessons: [
      { id: 401, title: 'Protegiendo liquidez con fondos de inversión', duration: '17:10' },
      { id: 402, title: 'Análisis de SAFI Fortaleza y SAFI BNB', duration: '24:00' },
      { id: 403, title: 'Interés compuesto en bolivianos vs. dólares', duration: '20:45' },
    ]
  },
  {
    id: 5,
    title: 'Módulo 5: Gestión de Portafolio',
    lessons: [
      { id: 501, title: 'Diversificación: La regla de oro', duration: '15:30' },
      { id: 502, title: 'Rebalanceo de cartera paso a paso', duration: '21:15' },
      { id: 503, title: 'Fiscalidad y retiro de ganancias', duration: '18:50' },
    ]
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState(courseModules[0].lessons[0]);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  
  // NUEVO: Estados para guardar los datos del usuario
  const [userName, setUserName] = useState('Alumno');
  const [userInitials, setUserInitials] = useState('AL');

  // NUEVO: Efecto para buscar al usuario al cargar la página
  useEffect(() => {
    async function getUserData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user && user.email) {
        // Tomamos la parte antes del @ (ej. roberto.carlos de roberto.carlos@gmail.com)
        const emailName = user.email.split('@')[0];
        
        // Limpiamos el nombre (quitamos puntos o guiones y ponemos mayúscula inicial)
        const cleanName = emailName.replace(/[\.\-\_]/g, ' ');
        const formattedName = cleanName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        setUserName(formattedName);
        setUserInitials(formattedName.substring(0, 2).toUpperCase());
      }
    }
    
    getUserData();
  }, []);

  const toggleModule = (moduleId: number) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500 selection:text-slate-900 scroll-smooth">
      
      {/* Navbar Superior Compacta */}
      <nav className="w-full bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="text-xl font-black tracking-tighter text-white">
          Inversión<span className="text-emerald-500">Capital</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            {/* NUEVO: Iniciales dinámicas */}
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/30">
              {userInitials}
            </div>
            {/* NUEVO: Nombre dinámico */}
            <span className="font-medium text-slate-200">{userName}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 transition-colors text-sm font-semibold border border-slate-800 hover:border-red-900/50 px-4 py-2 rounded-lg bg-slate-950"
          >
            Salir
          </button>
        </div>
      </nav>

      {/* CONTENEDOR AJUSTADO: max-w-[1440px] y lg:grid-cols-12 */}
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA: Menú reducido (lg:col-span-3 = 25%) */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-fit lg:sticky lg:top-24 shadow-2xl overflow-hidden order-last lg:order-first lg:col-span-3">
          
          <div className="p-5 border-b border-slate-800 bg-slate-950/50">
            <h2 className="text-base font-bold text-white leading-tight">Contenido del Curso</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">15 Lecciones</p>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-250px)] lg:max-h-[65vh] custom-scrollbar">
            {courseModules.map((module) => (
              <div key={module.id} className="border-b border-slate-800/50 last:border-0">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left group"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors leading-tight">
                    {module.title}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${expandedModules.includes(module.id) ? 'rotate-180 text-emerald-500' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="bg-slate-950/30 pb-2">
                    {module.lessons.map((lesson) => {
                      const isActive = activeLesson.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full flex items-start gap-3 p-3 pl-6 text-left hover:bg-slate-800/50 transition-colors border-l-2 ${
                            isActive ? 'border-emerald-500 bg-slate-800/80' : 'border-transparent'
                          }`}
                        >
                          <div className={`mt-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {isActive ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-xs ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>
                              {lesson.title}
                            </h4>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* COLUMNA DERECHA: Video más ancho (lg:col-span-9 = 75%) */}
        <section className="lg:col-span-9 flex flex-col gap-4">
          
          <div className="w-full aspect-video bg-black rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group ring-1 ring-slate-800/50">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-emerald-500/30 group-hover:scale-110 transition-transform cursor-pointer shadow-lg">
               <svg className="w-8 h-8 text-emerald-500 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            
            <div className="absolute bottom-6 text-slate-500 text-xs font-mono tracking-widest uppercase bg-slate-950/80 px-4 py-2 rounded-lg backdrop-blur-md border border-slate-800">
              Contenido Protegido • InversiónCapital
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mt-2 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                 Módulo Activo
               </span>
               <span className="text-xs text-slate-500 flex items-center gap-1">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 {activeLesson.duration} Min
               </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              {activeLesson.title}
            </h1>
            <p className="text-slate-400 leading-relaxed max-w-3xl text-sm md:text-base">
              Estás visualizando el contenido exclusivo de tu membresía. Recuerda que puedes descargar los materiales complementarios en la sección de recursos (próximamente). Si tienes dudas sobre los ETFs mencionados, revisa el glosario.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}