'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';
import { LogOut } from 'lucide-react';

// 🛠️ BASE DE DATOS DEL CURSO
const courseModules = [
  {
    id: 0,
    title: 'MÓDULO 0 — INTRODUCCIÓN SEGÚN TU PAÍS',
    lessons: [
      { id: 991, title: 'Lección Preliminar 1', duration: '10:00', description: 'Define tu camino inicial y elige las herramientas adecuadas.', videoUrl: '/video1.mp4', thumbnailUrl: '/imagen46.png' },
      { id: 992, title: 'Lección Preliminar 2', duration: '12:30', description: 'Registro y Uso de Hapi y plan de acción inicial para usar el broker.', videoUrl: '/video2.mp4', thumbnailUrl: '/imagen47.png' },
      { id: 993, title: 'Lección Preliminar 3', duration: '15:20', description: 'Uso y configuración de XTB para invertir y superar restricciones locales.', videoUrl: '/video3.mp4', thumbnailUrl: '/imagen48.png' },

      { id: 1, title: 'Lección 0: Ruta estratégica según tu país de residencia', duration: '10:00', description: 'Define tu camino inicial y elige las herramientas adecuadas.', videoUrl: 'https://www.youtube.com/embed/OD5Gz6_x4sA?rel=0&modestbranding=1', thumbnailUrl: '/imagen1.png' },
      { id: 2, title: 'Lección 0.1: Broker XTB (Recomendado para LATAM y Europa)', duration: '12:30', description: 'Configuración de XTB y plan de acción inicial.', videoUrl: 'https://www.youtube.com/embed/fAVVsmOXjEQ?rel=0&modestbranding=1', thumbnailUrl: '/imagen2.png' },
      { id: 3, title: 'Lección 0.2: Broker Admirals (Depósitos con criptomonedas)', duration: '15:20', description: 'Uso de Admirals para superar restricciones locales.', videoUrl: 'https://www.youtube.com/embed/mKJXT9U8BBM?rel=0&modestbranding=1', thumbnailUrl: '/imagen3.png' },
      { id: 4, title: 'Lección 0.3: Interactive Brokers (Recomendado para EE. UU.)', duration: '11:45', description: 'Guía rápida para residentes en Estados Unidos.', videoUrl: 'https://www.youtube.com/embed/xXKDOBr4YeQ?rel=0&modestbranding=1', thumbnailUrl: '/imagen4.png' },
      { id: 5, title: 'Lección 0.4: Estrategia mensual (Para personas con poco tiempo)', duration: '14:10', description: 'Plan de inversión simplificado y automatizado.', videoUrl: 'https://www.youtube.com/embed/drCE-Lx8c8U?rel=0&modestbranding=1', thumbnailUrl: '/imagen5.png' },
      { id: 6, title: 'Lección 0.5: Gestión de riesgo: Porcentaje según tu edad', duration: '09:50', description: 'Distribución de capital según el horizonte temporal.', videoUrl: 'https://www.youtube.com/embed/a-oJZgoJjCw?rel=0&modestbranding=1', thumbnailUrl: '/imagen6.png' },
      { id: 7, title: 'Lección 0.6: Análisis con InvestingPro (IA)', duration: '13:20', description: 'Herramientas avanzadas de análisis fundamental.', videoUrl: 'https://www.youtube.com/embed/JDF-E4I9KdQ?rel=0&modestbranding=1', thumbnailUrl: '/imagen7.png' },
      { id: 8, title: 'Lección 0.7: Bitget: Adquirir Bitcoin para fondear', duration: '16:05', description: 'Cómo fondear cuentas mediante activos digitales.', videoUrl: 'https://www.youtube.com/embed/GyAqVfWPQtE?rel=0&modestbranding=1', thumbnailUrl: '/imagen8.png' }
    ]
  },
  {
    id: 1,
    title: 'MÓDULO 1 — BASES DE LA BOLSA',
    lessons: [
      { id: 9, title: 'Lección 1: Vocabulario esencial de Bolsa', duration: '10:15', description: 'Conceptos clave antes de empezar.', videoUrl: 'https://www.youtube.com/embed/u48Vn2pRNjg?rel=0&modestbranding=1', thumbnailUrl: '/imagen9.png' },
      { id: 10, title: 'Lección 2: ¿Cómo se gana dinero realmente?', duration: '12:40', description: 'Plusvalía y Dividendos explicados.', videoUrl: 'https://www.youtube.com/embed/pyh3lVWx0vg?rel=0&modestbranding=1', thumbnailUrl: '/imagen10.png' },
      { id: 11, title: 'Lección 3: Tipos de empresas en el mercado', duration: '08:55', description: 'Clasificación por capitalización y sector.', videoUrl: 'https://www.youtube.com/embed/4lhW1cUk_Ls?rel=0&modestbranding=1', thumbnailUrl: '/imagen11.png' },
      { id: 12, title: 'Lección 4: Definiendo tu perfil de inversor', duration: '11:20', description: 'Test de riesgo y objetivos.', videoUrl: 'https://www.youtube.com/embed/SqfISbvdVrE?rel=0&modestbranding=1', thumbnailUrl: '/imagen12.png' },
      { id: 13, title: 'Lección 5: Errores comunes del principiante', duration: '14:30', description: 'Qué NO hacer en el mercado.', videoUrl: 'https://www.youtube.com/embed/fQm7-osiQM4?rel=0&modestbranding=1', thumbnailUrl: '/imagen13.png' },
      { id: 14, title: 'Lección 6: La verdad sobre el trading', duration: '15:10', description: 'Expectativa vs Realidad.', videoUrl: 'https://www.youtube.com/embed/GNxuifEc9tM?rel=0&modestbranding=1', thumbnailUrl: '/imagen14.png' },
      { id: 15, title: 'Lección 7: Guía para elegir el broker adecuado', duration: '13:45', description: 'Criterios de seguridad y regulación.', videoUrl: 'https://www.youtube.com/embed/AD4g-FX-1Ws?rel=0&modestbranding=1', thumbnailUrl: '/imagen15.png' },
      { id: 16, title: 'Lección 8: Análisis actualizado de brokers 2026', duration: '18:20', description: 'Comparativa de plataformas actuales.', videoUrl: 'https://www.youtube.com/embed/pOOHeZSIcVE?rel=0&modestbranding=1', thumbnailUrl: '/imagen16.png' }
    ]
  },
  {
    id: 2,
    title: 'MÓDULO 2 — INTERACTIVE BROKERS',
    lessons: [
      { id: 17, title: 'Lección 10: Cómo abrir cuenta en IBKR', duration: '20:15', description: 'Registro paso a paso.', videoUrl: 'https://www.youtube.com/embed/ccj73lG5qR4?rel=0&modestbranding=1', thumbnailUrl: '/imagen17.png' },
      { id: 18, title: 'Lección 11: IBKR Key (Seguridad 2FA)', duration: '07:30', description: 'Configuración de la verificación en dos pasos.', videoUrl: 'https://www.youtube.com/embed/fH0-4QFr9JQ?rel=0&modestbranding=1', thumbnailUrl: '/imagen18.png' },
      { id: 19, title: 'Lección 12: Payoneer para depósitos y tarjeta virtual', duration: '15:50', description: 'Fondeo desde Latinoamérica.', videoUrl: 'https://www.youtube.com/embed/geoibQF6lbI?rel=0&modestbranding=1', thumbnailUrl: '/imagen19.png' },
      { id: 20, title: 'Lección 13: Depósitos, retiros y compra en IBKR', duration: '22:10', description: 'Gestión operativa de fondos.', videoUrl: 'https://www.youtube.com/embed/XrlbitkQJ2Y?rel=0&modestbranding=1', thumbnailUrl: '/imagen20.png' },
      { id: 21, title: 'Lección 14: Uso de la plataforma desde cero', duration: '25:40', description: 'Dominio de la interfaz de IBKR.', videoUrl: 'https://www.youtube.com/embed/FR84P4dn-tA?rel=0&modestbranding=1', thumbnailUrl: '/imagen21.png' },
      { id: 22, title: 'Lección 15: Depósitos mediante Meru', duration: '12:00', description: 'Alternativa rápida de depósito.', videoUrl: 'https://www.youtube.com/embed/iOrazvtIRVc?rel=0&modestbranding=1', thumbnailUrl: '/imagen22.png' },
      { id: 23, title: 'Lección 16: Depósitos mediante Takenos', duration: '11:15', description: 'Uso de billeteras virtuales.', videoUrl: 'https://www.youtube.com/embed/tNCpLmlcFU0?rel=0&modestbranding=1', thumbnailUrl: '/imagen23.png' }
    ]
  },
  {
    id: 3,
    title: 'MÓDULO 3 — XTB',
    lessons: [
      { id: 24, title: 'Lección 17: Cómo abrir una cuenta en XTB', duration: '14:20', description: 'Proceso de registro en XTB.', videoUrl: 'https://www.youtube.com/embed/AkAeJHDuWj4?rel=0&modestbranding=1', thumbnailUrl: '/imagen24.png' },
      { id: 25, title: 'Lección 18: Uso de la plataforma XTB desde cero', duration: '18:50', description: 'Manejo de xStation.', videoUrl: 'https://www.youtube.com/embed/OhVRzSbdBA0?rel=0&modestbranding=1', thumbnailUrl: '/imagen25.png' }
    ]
  },
  {
    id: 4,
    title: 'MÓDULO 4 — ADMIRALS Y MÉTODOS DE DEPÓSITO',
    lessons: [
      { id: 26, title: 'Lección 19: Depositar con Airtm, Wise y Skrill', duration: '19:10', description: 'Pasarelas de pago externas.', videoUrl: 'https://www.youtube.com/embed/4uxzoRJbawE?rel=0&modestbranding=1', thumbnailUrl: '/imagen26.png' },
      { id: 27, title: 'Lección 20: Admirals: Depósitos vía Binance Pay', duration: '13:40', description: 'Ahorro máximo en transferencias.', videoUrl: 'https://www.youtube.com/embed/T_4VSFBz__4?rel=0&modestbranding=1', thumbnailUrl: '/imagen27.png' }
    ]
  },
  {
    id: 5,
    title: 'MÓDULO 5 — CRIPTOMONEDAS',
    lessons: [
      { id: 28, title: 'Lección 21: Compra de Bitcoin y cuenta Binance', duration: '22:30', description: 'Entrada al ecosistema cripto.', videoUrl: 'https://www.youtube.com/embed/z5K44EGqzd8?rel=0&modestbranding=1', thumbnailUrl: '/imagen28.png' },
      { id: 29, title: 'Lección 22: Configuración de billetera fría (Trezor)', duration: '16:55', description: 'Seguridad máxima de activos.', videoUrl: 'https://www.youtube.com/embed/2AEoYpnbykA?rel=0&modestbranding=1', thumbnailUrl: '/imagen29.png' }
    ]
  },
  {
    id: 6,
    title: 'MÓDULO 6 — ANÁLISIS DE ACCIONES',
    lessons: [
      { id: 30, title: 'Lección 23: Cómo elegir la acción correcta', duration: '25:10', description: 'Análisis cualitativo y cuantitativo.', videoUrl: 'https://www.youtube.com/embed/EjcRauPKGE4?rel=0&modestbranding=1', thumbnailUrl: '/imagen30.png' },
      { id: 31, title: 'Lección Extra: Estrategias de bajas comisiones', duration: '10:45', description: 'Tips de ahorro de costos.', videoUrl: 'https://www.youtube.com/embed/RUkivHoAKa4?rel=0&modestbranding=1', thumbnailUrl: '/imagen31.png' },
      { id: 32, title: 'Lección 24: Ejecución de compra (3 Brokers)', duration: '19:20', description: 'Práctica real de compra.', videoUrl: 'https://www.youtube.com/embed/TDXt8UOX4GU?rel=0&modestbranding=1', thumbnailUrl: '/imagen32.png' },
      { id: 33, title: 'Lección 25: Cuándo cerrar una operación', duration: '14:30', description: 'Estrategias de salida.', videoUrl: 'https://www.youtube.com/embed/BMTGmarfBlo?rel=0&modestbranding=1', thumbnailUrl: '/imagen33.png' },
      { id: 34, title: 'Lección 26: Cierres parciales de ganancias', duration: '11:15', description: 'Gestión de beneficios.', videoUrl: 'https://www.youtube.com/embed/_fixFcIqGs4?rel=0&modestbranding=1', thumbnailUrl: '/imagen34.png' },
      { id: 35, title: 'Lección 27: Retirar dinero hacia tu banco', duration: '12:50', description: 'Retorno de capital al banco.', videoUrl: 'https://www.youtube.com/embed/qsSrvxUjZGA?rel=0&modestbranding=1', thumbnailUrl: '/imagen35.png' }
    ]
  },
  {
    id: 7,
    title: 'MÓDULO 7 — ANÁLISIS TÉCNICO Y FUNDAMENTAL',
    lessons: [
      { id: 36, title: 'Lección 28: Fundamentos del Análisis Técnico', duration: '28:40', description: 'Gráficos y patrones.', videoUrl: 'https://www.youtube.com/embed/tVBIY4dZFxs?rel=0&modestbranding=1', thumbnailUrl: '/imagen36.png' },
      { id: 37, title: 'Lección 29: Fundamentos del Análisis Fundamental', duration: '32:10', description: 'Valoración intrínseca.', videoUrl: 'https://www.youtube.com/embed/XPLBOSMY8t8?rel=0&modestbranding=1', thumbnailUrl: '/imagen37.png' },
      { id: 38, title: 'Lección 30: Herramientas: Seeking Alpha', duration: '18:15', description: 'Uso de software profesional.', videoUrl: 'https://www.youtube.com/embed/I8noUsD434g?rel=0&modestbranding=1', thumbnailUrl: '/imagen38.png' }
    ]
  },
  {
    id: 8,
    title: 'MÓDULO 8 — DIVERSIFICACIÓN',
    lessons: [
      { id: 39, title: 'Lección 31: Estrategias para diversificar', duration: '17:25', description: 'Equilibrio de riesgos.', videoUrl: 'https://www.youtube.com/embed/aW4Vpd0pECE?rel=0&modestbranding=1', thumbnailUrl: '/imagen39.png' },
      { id: 40, title: 'Lección 32: Modelo Swensen', duration: '15:50', description: 'Estrategia de gestión institucional.', videoUrl: 'https://www.youtube.com/embed/uGBGtqxSk18?rel=0&modestbranding=1', thumbnailUrl: '/imagen40.png' },
      { id: 41, title: 'Lección 33: All Weather Portfolio (Ray Dalio)', duration: '21:10', description: 'Cartera para toda estación.', videoUrl: 'https://www.youtube.com/embed/hAHyj5yCIiI?rel=0&modestbranding=1', thumbnailUrl: '/imagen41.png' },
      { id: 42, title: 'Lección 34: Alternativas de inversión pasiva', duration: '13:40', description: 'Sistemas para poco tiempo.', videoUrl: 'https://www.youtube.com/embed/2jz3sk9GyxI?rel=0&modestbranding=1', thumbnailUrl: '/imagen42.png' }
    ]
  },
  {
    id: 9,
    title: 'MÓDULO 9 — ETFs Y ESTRATEGIAS FINALES',
    lessons: [
      { id: 43, title: 'Lección 35: Selección de los mejores ETFs', duration: '24:50', description: 'Top fondos indexados.', videoUrl: 'https://www.youtube.com/embed/jahJWfXL0ws?rel=0&modestbranding=1', thumbnailUrl: '/imagen43.png' },
      { id: 44, title: 'Lección 36: Análisis de subyacentes de un ETF', duration: '16:15', description: 'Cómo ver qué hay dentro de un fondo.', videoUrl: 'https://www.youtube.com/embed/mvkZ8bBxCtw?rel=0&modestbranding=1', thumbnailUrl: '/imagen44.png' },
      { id: 45, title: 'Lección 37: Interés Compuesto: Acumulación vs Distribución', duration: '20:30', description: 'Maximización de retornos a largo plazo.', videoUrl: 'https://www.youtube.com/embed/urQ30-Ou9AU?rel=0&modestbranding=1', thumbnailUrl: '/imagen45.png' }
    ]
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState(courseModules[0].lessons[0]);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  
  const [userName, setUserName] = useState('Alumno');
  const [userInitials, setUserInitials] = useState('AL');
  const [userEmail, setUserEmail] = useState('');
  
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  // 🟢 ESTADOS PARA EL CONTROL DEL VIDEO Y TIEMPO
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [savedTimes, setSavedTimes] = useState<Record<number, number>>({});
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  // 1. CARGAR DATOS Y TIEMPOS GUARDADOS
  useEffect(() => {
    async function getUserData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user && user.email) {
        setUserEmail(user.email);
        const emailName = user.email.split('@')[0];
        const cleanName = emailName.replace(/[\.\-\_]/g, ' ');
        const formattedName = cleanName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        setUserName(formattedName);
        setUserInitials(formattedName.substring(0, 2).toUpperCase());

        // Cargar progreso de lecciones completadas
        const savedProgress = localStorage.getItem(`progreso_${user.email}`);
        if (savedProgress) {
          setCompletedLessons(JSON.parse(savedProgress));
        }

        // Cargar los tiempos guardados de los videos
        const savedTimesLocal = localStorage.getItem(`yt_times_${user.email}`);
        if (savedTimesLocal) {
          setSavedTimes(JSON.parse(savedTimesLocal));
        }
      }
    }
    getUserData();

    // Inyectar el script oficial de YouTube para la API
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  }, []);

  // 2. RESETEAR EL REPRODUCTOR AL CAMBIAR DE LECCIÓN
  useEffect(() => {
    setIsVideoPlaying(false);
  }, [activeLesson]);

  // 3. LA MAGIA: CONTROLAR EL REPRODUCTOR Y GUARDAR EL TIEMPO
  useEffect(() => {
    if (isVideoPlaying && activeLesson.videoUrl) {
      // Extraemos el ID del video de tu enlace embebido
      const videoIdMatch = activeLesson.videoUrl.match(/\/embed\/([^?&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) return;

      // Leemos el tiempo guardado (si no hay, arranca en 0)
      const startSeconds = savedTimes[activeLesson.id] || 0;

      const initPlayer = () => {
        playerRef.current = new (window as any).YT.Player(`yt-player-${activeLesson.id}`, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            start: Math.floor(startSeconds) // 🟢 AQUÍ LE DECIMOS A YT DÓNDE ARRANCAR
          },
          events: {
            onStateChange: (event: any) => {
              // Si el video se está reproduciendo, guardamos el progreso cada 5 segundos
              if (event.data === (window as any).YT.PlayerState.PLAYING) {
                intervalRef.current = setInterval(() => {
                  if (playerRef.current && playerRef.current.getCurrentTime) {
                    const currentTime = playerRef.current.getCurrentTime();
                    setSavedTimes(prev => {
                      const newTimes = { ...prev, [activeLesson.id]: currentTime };
                      if (userEmail) {
                        localStorage.setItem(`yt_times_${userEmail}`, JSON.stringify(newTimes));
                      }
                      return newTimes;
                    });
                  }
                }, 5000);
              } else {
                // Si el video se pausa, detenemos el guardado constante
                if (intervalRef.current) clearInterval(intervalRef.current);
              }
            }
          }
        });
      };

      // Inicializamos cuando la API de YT esté lista
      if ((window as any).YT && (window as any).YT.Player) {
        initPlayer();
      } else {
        (window as any).onYouTubeIframeAPIReady = () => {
          initPlayer();
        };
      }

      // Limpieza al desmontar el reproductor
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy();
        }
      };
    }
  }, [isVideoPlaying, activeLesson, userEmail]);

  const toggleModule = (moduleId: number) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const toggleCompletion = (e: React.MouseEvent, lessonId: number) => {
    e.stopPropagation(); 
    setCompletedLessons(prev => {
      const isCompleted = prev.includes(lessonId);
      const newCompleted = isCompleted ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      if (userEmail) {
        localStorage.setItem(`progreso_${userEmail}`, JSON.stringify(newCompleted));
      }
      return newCompleted;
    });
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500 selection:text-slate-900 scroll-smooth">
      
      {/* NAVBAR */}
      <nav className="w-full bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        
        {/* Logo ElartInversiones */}
        <Link href="/" className="flex items-center group cursor-pointer transition-all duration-300 hover:opacity-95 active:scale-95 shrink-0 overflow-visible">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-700 shadow-[0_5px_25px_rgba(0,0,0,0.5)] group-hover:shadow-emerald-500/50 transition-all duration-500 mr-3 border-2 border-white/10 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <svg className="w-10 h-10 text-cyan-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 6l10-5 10 5v1.5H2V6zM4 8.5h16v1H4v-1z" />
              <path d="M4.5 7.5h1v1h-1zM7 7.5h1v1H7zM9.5 7.5h1v1h-1zM12 7.5h1v1h-1zM14.5 7.5h1v1h-1zM17 7.5h1v1h-1zM19.5 7.5h1v1h-1z" />
              <path d="M4.5 10h1.5v8h-1.5v-8zM9 10h1.5v8h-1.5v-8zM13.5 10h1.5v8h-1.5v-8zM18 10h1.5v8h-1.5v-8z" />
              <path d="M2 18.5h20v1H2v-1zM1.5 20.5h21v1.5h-21v-1.5z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight overflow-visible pr-8">
            <div className="flex items-end gap-1.5 transform -skew-x-12 origin-left overflow-visible">
              <span className="text-2xl font-black tracking-tighter text-white uppercase whitespace-nowrap">Elart</span>
              <span className="text-2xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:from-emerald-300 group-hover:to-cyan-300 transition-colors duration-300 whitespace-nowrap">Inversiones</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors duration-300 whitespace-nowrap transform -skew-x-12 origin-left">Academia de Finanzas</span>
          </div>
        </Link>

        {/* Usuario y Botón Salir */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/30">
              {userInitials}
            </div>
            <span className="font-medium text-slate-200">{userName}</span>
          </div>
          
          {/* BOTÓN DE SALIR DUAL */}
          <button 
            onClick={handleLogout}
            className="relative inline-flex w-fit h-10 items-center justify-center overflow-hidden rounded-xl bg-slate-950 px-5 py-2 font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(225,29,72,0.4)] active:scale-95 border border-slate-800 hover:border-rose-500/30 group"
          >
            <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#e11d48_0%,#4c0519_25%,#e11d48_50%,#4c0519_75%,#e11d48_100%)] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5 text-emerald-400 group-hover:text-rose-500 group-hover:scale-110 transition-all duration-300" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:from-rose-400 group-hover:to-red-500 drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)] group-hover:drop-shadow-[0_2px_8px_rgba(225,29,72,0.3)] whitespace-nowrap transition-all duration-300">
                Salir
              </span>
            </span>
            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent group-hover:via-rose-500/40 transition-all duration-300"></span>
          </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SIDEBAR ACORDEÓN */}
        <section className="bg-slate-800 border border-slate-700 rounded-2xl flex flex-col h-fit lg:sticky lg:top-24 shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden order-last lg:order-first lg:col-span-3">
          <div className="p-4 border-b border-slate-700 bg-slate-800 flex flex-col gap-3">
            {/* Título Original (Ultra Compacto) */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-white leading-none flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Contenido
              </h2>
              {/* Pasamos el subtítulo aquí como etiqueta para ahorrar una línea vertical */}
              <span className="text-[9px] uppercase tracking-widest text-slate-300 font-bold bg-slate-900 px-2 py-1 rounded-md border border-slate-700 shrink-0">
                45 Lecciones
              </span>
            </div>

            {/* 🟢 TARJETA DE SOPORTE WHATSAPP (Versión Slim) */}
            <a 
              href="https://wa.me/59164077551?text=Hola,%20Necesito%20Soporte." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg py-2 px-3 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_5px_15px_-5px_rgba(37,211,102,0.3)]"
            >
              <div className="flex items-center gap-2.5">
                {/* Ícono de WhatsApp animado (más pequeño) */}
                <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <svg className="w-4 h-4 text-white ml-[1px] mt-[1px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.46-1.656-1.758-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                {/* Textos de Soporte (Márgenes reducidos) */}
                <div className="flex flex-col leading-none gap-1">
                  <span className="text-[9px] uppercase tracking-widest font-black text-[#25D366] group-hover:text-white transition-colors">
                    Soporte
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-300 group-hover:text-white transition-colors">
                    +591 64077551
                  </span>
                </div>
              </div>
              {/* Flechita decorativa (más pequeña) */}
              <div className="w-5 h-5 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#25D366]/30 transition-all shrink-0">
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </div>
            </a>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-250px)] lg:max-h-[65vh] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500 transition-colors">
            {courseModules.map((module) => (
              <div key={module.id} className="border-b border-slate-700/50 last:border-0">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700/80 transition-all text-left group"
                >
                  <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors leading-tight pr-4">
                    {module.title}
                  </span>
                  <div className={`p-1 rounded-md transition-colors shrink-0 ${expandedModules.includes(module.id) ? 'bg-emerald-500/10' : 'bg-slate-700 group-hover:bg-slate-600'}`}>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${expandedModules.includes(module.id) ? 'rotate-180 text-emerald-500' : 'text-slate-400'}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedModules.includes(module.id) ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-slate-900/50 py-2">
                    {module.lessons.map((lesson) => {
                      const isActive = activeLesson.id === lesson.id;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full flex items-center gap-3 p-3 pl-5 text-left transition-all duration-200 border-l-4 relative group ${
                            isActive 
                              ? 'border-emerald-500 bg-slate-800/80' 
                              : 'border-transparent hover:border-slate-600 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-6 h-6 shrink-0 rounded-full transition-colors shadow-sm ${
                            isActive ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-400 group-hover:text-white border border-slate-600'
                          }`}>
                            {isActive ? (
                              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            ) : (
                              <span className="text-[9px] font-bold">▶</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className={`text-xs truncate transition-colors ${
                              isActive ? 'text-white font-bold' : isCompleted ? 'text-slate-500' : 'text-slate-300 group-hover:text-slate-100'
                            }`}>
                              {lesson.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-3 ml-auto">
                            <div className="text-[10px] font-mono text-slate-500 shrink-0">
                              {lesson.duration}
                            </div>
                            <div 
                              onClick={(e) => toggleCompletion(e, lesson.id)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110 ${
                                isCompleted 
                                  ? 'bg-emerald-500 border-emerald-500 text-slate-900' 
                                  : 'border-slate-600 hover:border-emerald-500 text-transparent hover:text-emerald-500/30'
                              }`}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ZONA DE VIDEO Y DETALLES */}
        <section className="lg:col-span-9 flex flex-col gap-4">
          
          
          {/* // --- BLOQUE GUARDADO: REPRODUCTOR ORIGINAL (SOLO YOUTUBE) ---
          <div className="w-full aspect-video bg-black rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl ring-1 ring-slate-800/50">
            {activeLesson.videoUrl ? (
              !isVideoPlaying ? (
                
                // ESTADO 1: MINIATURA (FACADE) - 100% NÍTIDA
                <div 
                  className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center bg-black"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img 
                    src={(activeLesson as any).thumbnailUrl || '/imagen.png'} 
                    alt={activeLesson.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                  />
                  
                  // Botón de Play Flotante
                  <div className="relative z-10 w-20 h-20 bg-emerald-500/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300 border border-emerald-400/50">
                     <svg className="w-8 h-8 text-slate-950 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  
                  <div className="absolute bottom-6 text-slate-400 text-xs font-mono tracking-widest uppercase bg-slate-950/80 px-5 py-2.5 rounded-lg backdrop-blur-md border border-slate-800 z-10 group-hover:border-emerald-500/30 transition-colors">
                    Haz clic para reproducir
                  </div>
                  
                  // 🟢 INDICADOR DE PROGRESO GUARDADO
                  {savedTimes[activeLesson.id] > 5 && (
                    <div className="absolute top-6 left-6 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20 backdrop-blur-sm shadow-lg">
                      Se reanudará tu progreso guardado
                    </div>
                  )}
                </div>
              ) : (
                // ESTADO 2: REPRODUCTOR INTELIGENTE DE YOUTUBE
                <div 
                  id={`yt-player-${activeLesson.id}`} 
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></div>
              )
            ) : (
              // ESTADO 3: SIN VIDEO
              <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Video en preparación</p>
              </div>
            )}
          </div>
          */}

          {/* 🟢 REPRODUCTOR HÍBRIDO (YOUTUBE + MP4 NORMA TEMPORALL) */}
          <div className="w-full aspect-video bg-black rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl ring-1 ring-slate-800/50">
            {activeLesson.videoUrl ? (
              !isVideoPlaying ? (
                /* ESTADO 1: MINIATURA 100% NÍTIDA */
                <div 
                  className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center bg-black"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img 
                    src={(activeLesson as any).thumbnailUrl || '/imagen.png'} 
                    alt={activeLesson.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                  />
                  
                  <div className="relative z-10 w-20 h-20 bg-emerald-500/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300 border border-emerald-400/50">
                     <svg className="w-8 h-8 text-slate-950 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  
                  <div className="absolute bottom-6 text-slate-400 text-xs font-mono tracking-widest uppercase bg-slate-950/80 px-5 py-2.5 rounded-lg backdrop-blur-md border border-slate-800 z-10 group-hover:border-emerald-500/30 transition-colors">
                    Haz clic para reproducir
                  </div>
                </div>
              ) : (
                /* ESTADO 2: REPRODUCTOR INTELIGENTE */
                activeLesson.videoUrl.includes('youtube.com') ? (
                  // Si es YouTube, usa el reproductor pro
                  <div id={`yt-player-${activeLesson.id}`} className="absolute top-0 left-0 w-full h-full border-0"></div>
                ) : (
                  // Si NO es YouTube (tus MP4 locales), usa un reproductor normal
                  <video src={activeLesson.videoUrl} controls autoPlay className="absolute top-0 left-0 w-full h-full object-contain bg-black"></video>
                )
              )
            ) : (
              /* ESTADO 3: SIN VIDEO */
              <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Video en preparación</p>
              </div>
            )}
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
              {activeLesson.description}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}