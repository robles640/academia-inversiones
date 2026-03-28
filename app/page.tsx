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
  ChevronDown
} from 'lucide-react';

// Datos de las Preguntas Frecuentes (FAQ)
const faqs = [
  {
    question: "¿Necesito mucho dinero para empezar a invertir?",
    answer: "No. Puedes abrir tu cuenta en Hapi y empezar a comprar fracciones de ETFs o acciones desde $5 dólares. Te enseñaremos cómo escalar tu capital poco a poco."
  },
  {
    question: "¿Es seguro enviar dinero desde Bolivia a Estados Unidos?",
    answer: "Totalmente. Utilizamos plataformas reguladas por la SEC en EE.UU. Aprenderás el proceso exacto para fondear tu cuenta de manera legal, segura y con las comisiones más bajas posibles."
  },
  {
    question: "¿Cuánto tiempo me tomará ver resultados?",
    answer: "La inversión seria no es para hacerse rico de la noche a la mañana. Nos enfocamos en el interés compuesto a mediano y largo plazo. Verás el crecimiento de tu portafolio mes a mes, construyendo verdadera riqueza."
  },
  {
    question: "¿Qué pasa si tengo dudas durante el curso?",
    answer: "Tendrás acceso a nuestra comunidad privada de alumnos, donde podrás consultar dudas específicas, analizar el mercado y recibir soporte directo."
  }
];

export default function Home() {
  // Estado para controlar qué pregunta del FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500 selection:text-slate-900 scroll-smooth">
      
      {/* 1. NAVEGACIÓN PREMIUM */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/50">
        <div className="flex items-center justify-between p-5 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-white">
            Inversión<span className="text-emerald-500">Capital</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#metodo" className="hover:text-emerald-400 transition-colors">Método</a>
            <a href="#temario" className="hover:text-emerald-400 transition-colors">Temario</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
            <a href="#contacto" className="hover:text-emerald-400 transition-colors">Contacto</a>
          </div>
          <Link 
            href="/login" 
            className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold transition-all text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Acceso Alumnos
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (EL GANCHO MEJORADO) */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        {/* Luces de fondo decorativas */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-widest uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Inscripciones Abiertas 2026
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-white">
            No solo ahorres, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              crea riqueza.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Deja de ver cómo la inflación devora tu esfuerzo. Aprende la estrategia exacta para invertir en dólares en las empresas más grandes del mundo y proteger tu capital con fondos locales regulados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href="#temario" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg transition-all flex items-center justify-center gap-2 group"
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-400" />
              Ver Intro
            </button>
          </div>

          {/* Prueba Social / Logos de Confianza */}
          <div className="mt-20 pt-10 border-t border-slate-900/50">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-8">Operamos con los mejores</p>
            <div className="flex flex-wrap justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all">
              <span className="text-2xl font-bold italic">WALL STREET</span>
              <span className="text-2xl font-bold italic">HAPI</span>
              <span className="text-2xl font-bold italic">VANGUARD</span>
              <span className="text-2xl font-bold italic">BLACKROCK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN DE TEMARIO (TARJETAS PROFESIONALES) */}
      <section id="temario" className="py-32 px-4 relative bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Currículum del Programa</h2>
            <p className="text-slate-400">Una ruta de aprendizaje diseñada para resultados exponenciales.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="group p-1 rounded-3xl bg-gradient-to-b from-slate-800 to-transparent hover:from-emerald-500/50 transition-all duration-500">
              <div className="h-full p-8 rounded-[22px] bg-slate-950 flex flex-col items-start">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Invierte en el Futuro</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Domina los ETFs que agrupan a Apple, Nvidia y Microsoft. No adivines qué acción comprar; compra el mercado entero.
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Interés Compuesto
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Análisis de Gigantes Tech
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="group p-1 rounded-3xl bg-gradient-to-b from-slate-800 to-transparent hover:from-cyan-500/50 transition-all duration-500">
              <div className="h-full p-8 rounded-[22px] bg-slate-950 flex flex-col items-start">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Libertad de Movimiento</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Abre tu cuenta en EE.UU. desde tu celular. Aprende a fondear y retirar tus ganancias de forma legal y eficiente.
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Seguridad de Fondos
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Cero Comisiones Ocultas
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="group p-1 rounded-3xl bg-gradient-to-b from-slate-800 to-transparent hover:from-purple-500/50 transition-all duration-500">
              <div className="h-full p-8 rounded-[22px] bg-slate-950 flex flex-col items-start">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Seguridad Blindada</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Equilibra tu portafolio con SAFIs locales. Rentabilidad en bolivianos y dólares con la seguridad del sistema financiero regulado.
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Diversificación Local
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Protección de Capital
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 4. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Preguntas Frecuentes</h2>
            <p className="text-slate-400">Todo lo que necesitas saber antes de dar el primer paso.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden transition-all duration-300 ${isOpen ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FOOTER (PIE DE PÁGINA) PROFESIONAL */}
      <footer id="contacto" className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Columna Logo */}
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-black tracking-tighter text-white mb-6">
                Inversión<span className="text-emerald-500">Capital</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transformando ahorradores en inversores inteligentes desde 2024. Formación financiera de alto nivel para el mercado actual.
              </p>
            </div>

            {/* Columna Navegación */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Academia</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#metodo" className="hover:text-emerald-500 transition-colors">Nuestro Método</a></li>
                <li><a href="#temario" className="hover:text-emerald-500 transition-colors">Programas</a></li>
                <li><a href="#faq" className="hover:text-emerald-500 transition-colors">Preguntas Frecuentes</a></li>
                <li><Link href="/login" className="hover:text-emerald-500 transition-colors text-emerald-500 font-semibold">Portal Alumnos</Link></li>
              </ul>
            </div>

            {/* Columna Contacto */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contacto</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-500" /> 
                  soporte@inversioncapital.com
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Atención Lunes a Viernes
                </li>
              </ul>
            </div>

            {/* Columna Redes Sociales con Códigos SVG Puros */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-left">Síguenos</h4>
              <div className="flex gap-4 justify-start">
                
                {/* Facebook */}
                <a href="TU_LINK_DE_FACEBOOK_AQUÍ" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all group">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                
                {/* YouTube */}
                <a href="https://youtube.com/@robles640" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all group">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                
                {/* Instagram */}
                <a href="TU_LINK_DE_INSTAGRAM_AQUÍ" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all group">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                
                {/* LinkedIn */}
                <a href="TU_LINK_DE_LINKEDIN_AQUÍ" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 transition-all group">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>

              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © 2026 InversiónCapital Academia. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs text-slate-600">
              <a href="#" className="hover:text-emerald-400 transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}