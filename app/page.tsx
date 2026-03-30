'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  PlayCircle, 
  CheckCircle2, 
  Mail, 
  ArrowRight,
  ChevronDown,
  BarChart3,
  Lock
} from 'lucide-react';

// Datos de las Preguntas Frecuentes (FAQ) - NIVEL GLOBAL
const faqs = [
  {
    question: "¿Necesito una fortuna para comenzar a invertir?",
    answer: "Absolutamente no. La ventaja de los mercados modernos es que puedes empezar con fracciones de activos desde montos mínimos (como $5 o $10 USD). Te enseñaremos a escalar tu capital sin importar tu punto de partida."
  },
  {
    question: "¿Desde qué países puedo aplicar este conocimiento?",
    answer: "Este es un programa de alcance global. El mercado de capitales no tiene fronteras; te enseñamos a operar en las bolsas más líquidas del mundo utilizando plataformas accesibles desde prácticamente cualquier lugar del planeta."
  },
  {
    question: "¿Es seguro operar en mercados internacionales?",
    answer: "La seguridad es nuestro pilar. Te mostramos cómo identificar y utilizar brokers regulados por las autoridades financieras de mayor prestigio mundial, garantizando que tu capital y tus activos estén protegidos bajo estándares internacionales."
  },
  {
    question: "¿En cuánto tiempo veré resultados financieros?",
    answer: "Nosotros no vendemos magia, enseñamos ingeniería financiera. Nos enfocamos en el crecimiento sólido mediante el interés compuesto. Empezarás a ver la evolución de tu portafolio desde el primer mes, construyendo riqueza real a mediano y largo plazo."
  },
  {
    question: "¿Qué pasa si el mercado cae o hay crisis?",
    answer: "El curso incluye módulos de Gestión de Riesgo y Blindaje. Aprenderás que las caídas del mercado son, en realidad, las mayores oportunidades de compra para los inversores preparados. Sabrás exactamente qué hacer en cada ciclo económico."
  },
  {
    question: "¿Tendré apoyo si me surgen dudas técnicas?",
    answer: "Sí. Al ser alumno, obtienes acceso a nuestra comunidad privada de inversores. Allí podrás consultar dudas sobre la plataforma, análisis de activos y compartir estrategias con otros miembros de la academia."
  },
  {
    question: "¿Recibiré actualizaciones sobre nuevas estrategias?",
    answer: "El mundo financiero evoluciona. Como alumno de ELART INVERSIONES, tendrás acceso a las actualizaciones del programa para que tu operativa nunca quede obsoleta frente a los cambios de la economía global."
  }
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500 selection:text-slate-900 scroll-smooth">
      
      {/* 1. NAVEGACIÓN PREMIUM */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/50">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          
          {/* LOGO INSTITUCIONAL ELARTINVERSIONES */}
          <Link href="/" className="flex items-center group cursor-pointer transition-all duration-300 shrink-0 overflow-visible">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-700 shadow-[0_5px_20px_rgba(16,185,129,0.3)] group-hover:shadow-emerald-500/50 transition-all duration-500 mr-3 border-2 border-white/10 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-8 h-8 text-cyan-100 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 6l10-5 10 5v1.5H2V6zM4 8.5h16v1H4v-1z" />
                <path d="M4.5 7.5h1v1h-1zM7 7.5h1v1H7zM9.5 7.5h1v1h-1zM12 7.5h1v1h-1zM14.5 7.5h1v1h-1zM17 7.5h1v1h-1zM19.5 7.5h1v1h-1z" />
                <path d="M4.5 10h1.5v8h-1.5v-8zM9 10h1.5v8h-1.5v-8zM13.5 10h1.5v8h-1.5v-8zM18 10h1.5v8h-1.5v-8z" />
                <path d="M2 18.5h20v1H2v-1zM1.5 20.5h21v1.5h-21v-1.5z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight overflow-visible pr-6">
              <div className="flex items-end gap-1 transform -skew-x-12 origin-left overflow-visible">
                <span className="text-xl font-black tracking-tighter text-white uppercase whitespace-nowrap">Elart</span>
                <span className="text-xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:from-emerald-300 group-hover:to-cyan-300 transition-colors whitespace-nowrap">Inversiones</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors transform -skew-x-12 origin-left">Academia de Finanzas</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            <a href="#metodo" className="hover:text-emerald-400 transition-colors">Método</a>
            <a href="#temario" className="hover:text-emerald-400 transition-colors">Temario</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>

          <Link 
            href="/login" 
            // 🛠️ LA CORRECCIÓN CLAVE: Agregamos w-fit y mx-auto para que en móvil no se estire y se centre
            className="relative inline-flex w-fit mx-auto sm:mx-0 h-11 items-center justify-center overflow-hidden rounded-xl bg-slate-900 px-6 py-3 font-black text-xs uppercase tracking-widest shadow-[0_15px_50px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] active:scale-95 border border-white/5 group"
          >
            {/* Resplandor de fondo ultra sutil */}
            <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#059669_0%,#0c4a6e_25%,#059669_50%,#0c4a6e_75%,#059669_100%)] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300"></span>

            {/* Texto y Candado con efecto de profundidad */}
            <span className="relative flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 group-hover:text-cyan-400 transition-all" />
              
              {/* 🟢 NUEVO TEXTO GRADIENTE TIPO "INVERSIONES" */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)] whitespace-nowrap">
                Iniciar Sesión
              </span>
            </span>
            
            {/* Borde de luz láser en la parte inferior */}
            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent group-hover:via-cyan-500/40 transition-all duration-300"></span>
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION PREMIUM */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden flex flex-col items-center justify-center">
        {/* Luces de fondo decorativas */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto text-center w-full flex flex-col items-center">
          {/* Badge de Inscripciones */}
          <div className="inline-flex items-center gap-3 py-2 px-5 rounded-2xl bg-slate-900/50 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase mb-10 backdrop-blur-sm shadow-[0_4px_15px_rgba(16,185,129,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Matrículas Disponibles • 2026
          </div>
          
          {/* TÍTULO CON GENERA RIQUEZA EN CURSIVA */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] text-white uppercase text-center flex flex-col items-center">
            <span className="block italic">GENERA RIQUEZA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 animate-gradient-x block leading-[1.1] mt-2">
              Y ASEGURA TU FUTURO
            </span>
          </h1>
          
          {/* TU DESCRIPCIÓN EXACTA */}
          <p className="text-base md:text-lg text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium text-center">
            Deja de ser un esclavo de la economía. Aprende la fórmula exacta para Invertir tu dinero en las empresas más grandes del mundo y proteger tu capital con fondos regulados y enriquecedores. Te enseñamos a operar en la Bolsa de Valores con estrategias probadas, blindando tu dinero de la inflación y tomando el control total de tu futuro financiero.
          </p>
          
          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <a 
              href="#temario" 
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl transition-all flex items-center justify-center gap-2 group shadow-[0_10px_40px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95"
            >
              Ver Programa
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
            <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
              <PlayCircle className="w-6 h-6 text-emerald-400" />
              Ver Método
            </button>
          </div>
        </div>
      </section>

      {/* 3. GRID DE VALORES (INGENIERÍA FINANCIERA) */}
      <section id="metodo" className="py-24 border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <BarChart3 className="w-10 h-10 text-emerald-500 mx-auto md:mx-0" />
            <h4 className="font-black text-white uppercase tracking-tighter">Análisis Real</h4>
            <p className="text-sm text-slate-500">Sin humo. Basado en fundamentales y datos reales de mercado.</p>
          </div>
          <div className="space-y-4">
            <Lock className="w-10 h-10 text-cyan-500 mx-auto md:mx-0" />
            <h4 className="font-black text-white uppercase tracking-tighter">Custodia Segura</h4>
            <p className="text-sm text-slate-500">Tu dinero siempre en brokers regulados por la SIPC de EE.UU.</p>
          </div>
          <div className="space-y-4">
            <Globe className="w-10 h-10 text-emerald-500 mx-auto md:mx-0" />
            <h4 className="font-black text-white uppercase tracking-tighter">Acceso Global</h4>
            <p className="text-sm text-slate-500">Opera desde cualquier país de LATAM sin restricciones.</p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="w-10 h-10 text-cyan-500 mx-auto md:mx-0" />
            <h4 className="font-black text-white uppercase tracking-tighter">Patrimonio</h4>
            <p className="text-sm text-slate-500">Estrategias diseñadas para el largo plazo y el interés compuesto.</p>
          </div>
        </div>
      </section>

      {/* 4. TEMARIO (TARJETAS PREMIUM) */}
      <section id="temario" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px]">Estructura Educativa</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 italic">Programa Profesional 2026</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Tarjeta 1 */}
            <div className="group relative p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
              <TrendingUp className="w-12 h-12 text-emerald-500 mb-8" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Mercado de Capitales</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Domina los ETFs que agrupan a las 500 empresas más rentables del mundo. Aprende a ser dueño de Apple, Microsoft y Amazon.
              </p>
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Interés Compuesto
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Análisis Tech
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="group relative p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
              <Globe className="w-12 h-12 text-cyan-500 mb-8" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Operativa Global</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Tutoriales prácticos sobre fondeo, retiro y gestión de impuestos internacionales. Tu capital siempre en movimiento.
              </p>
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Brokers Regulados
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Retiros Eficientes
                </div>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="group relative p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
              <ShieldCheck className="w-12 h-12 text-emerald-500 mb-8" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Gestión de Riesgo</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Blindaje de capital. Aprende a equilibrar tu portafolio para que crezca en mercados alcistas y se proteja en crisis.
              </p>
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Renta Variable/Fija
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Rebalanceo Pro
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ (ACORDEÓN PROFESIONAL) */}
      <section id="faq" className="py-32 px-4 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black italic mb-6">Preguntas Frecuentes</h2>
            <p className="text-slate-500 font-medium">Resolvemos todas tus dudas para que te sientas en confianza.</p>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border border-white/5 rounded-[24px] bg-slate-900/50 overflow-hidden transition-all duration-500 ${isOpen ? 'ring-2 ring-emerald-500/20 bg-slate-900' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-7 text-left"
                  >
                    <span className={`font-black text-lg uppercase tracking-tighter transition-colors ${isOpen ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-6 h-6 text-slate-600 transition-transform duration-500 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                  </button>
                  {/* AQUÍ ESTÁ EL CAMBIO A max-h-96 PARA QUE NO SE CORTEN LAS RESPUESTAS MÁS LARGAS */}
                  <div className={`px-7 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-400 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenedor principal centrado en móvil, grid en escritorio */}
        <div className="flex flex-col items-center text-center md:grid md:grid-cols-4 md:items-start md:text-left gap-12 mb-16">
          
          {/* Columna Logo */}
          <div className="flex flex-col items-center md:items-start overflow-visible">
            <div className="flex items-center mb-6 overflow-visible pr-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-700 mr-3 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-cyan-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 6l10-5 10 5v1.5H2V6zM1.5 20.5h21v1.5h-21v-1.5z" />
                  <path d="M4.5 10h1.5v8h-1.5v-8zM9 10h1.5v8h-1.5v-8zM13.5 10h1.5v8h-1.5v-8zM18 10h1.5v8h-1.5v-8z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none overflow-visible">
                <span className="text-xl font-black italic text-white uppercase tracking-tighter transform -skew-x-12 origin-left whitespace-nowrap">
                  ELART <span className="text-emerald-500">INVERSIONES</span>
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              La ingeniería de la riqueza aplicada a tus finanzas personales. Formando inversores globales con seguridad y estrategia.
            </p>
          </div>

          {/* Academia */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Academia</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li><a href="#metodo" className="hover:text-emerald-500 transition-colors">Nuestro Método</a></li>
              <li><a href="#temario" className="hover:text-emerald-500 transition-colors">Programas</a></li>
              <li><a href="#faq" className="hover:text-emerald-500 transition-colors">Preguntas Frecuentes</a></li>
              <li><Link href="/login" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold uppercase tracking-tighter italic">Acceso al Curso</Link></li>
            </ul>
          </div>

          {/* Contacto Uniforme */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" /> 
                elartinversiones@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                +591 64077551
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Atención Lunes a Domingo
              </li>
            </ul>
          </div>

          {/* Redes Sociales con TikTok */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" target="_blank" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com/@robles640" target="_blank" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" target="_blank" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright y Links Legales con Funcionalidad */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 order-last md:order-first italic">
            © 2026 ELART INVERSIONES. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/terminos" className="text-slate-600 hover:text-emerald-400 transition-colors">Términos y Condiciones</Link>
            <Link href="/privacidad" className="text-slate-600 hover:text-emerald-400 transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
    </main>
  );
}