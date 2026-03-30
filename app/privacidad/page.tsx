'use client';

import Link from 'next/link';
import { ChevronLeft, ShieldCheck, EyeOff, Lock, Database, Bell } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500 selection:text-slate-900">
      
      {/* Luces de fondo decorativas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />

      {/* Navegación Superior Institucional */}
      <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>

          {/* LOGO ELART INVERSIONES - VERSIÓN OFICIAL */}
          <Link href="/" className="flex items-center group cursor-pointer transition-all duration-300 shrink-0 overflow-visible">
            {/* Isotipo: El Templo del Capital */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-700 shadow-[0_5px_15px_rgba(0,0,0,0.3)] group-hover:shadow-emerald-500/50 transition-all duration-500 mr-3 border border-white/10 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-8 h-8 text-cyan-100 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 6l10-5 10 5v1.5H2V6zM4 8.5h16v1H4v-1z" />
                <path d="M4.5 7.5h1v1h-1zM7 7.5h1v1H7zM9.5 7.5h1v1h-1zM12 7.5h1v1h-1zM14.5 7.5h1v1h-1zM17 7.5h1v1h-1zM19.5 7.5h1v1h-1z" />
                <path d="M4.5 10h1.5v8h-1.5v-8zM9 10h1.5v8h-1.5v-8zM13.5 10h1.5v8h-1.5v-8zM18 10h1.5v8h-1.5v-8z" />
                <path d="M2 18.5h20v1H2v-1zM1.5 20.5h21v1.5h-21v-1.5z" />
              </svg>
            </div>
            
            {/* Texto con solución de Skew para evitar corte de la S */}
            <div className="flex flex-col leading-tight overflow-visible pr-6">
              <div className="flex items-end gap-1 transform -skew-x-12 origin-left overflow-visible">
                <span className="text-lg font-black tracking-tighter text-white uppercase whitespace-nowrap">
                  Elart
                </span>
                <span className="text-lg font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:from-emerald-300 group-hover:to-cyan-300 transition-colors whitespace-nowrap">
                  Inversiones
                </span>
              </div>
              <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-slate-500 transform -skew-x-12 origin-left whitespace-nowrap">
                Academia de Finanzas
              </span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Contenido Legal */}
      <article className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Encabezado de Página */}
        <header className="mb-16 border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-lg bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3" /> Protección de Datos Activa
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
            Política de <span className="text-cyan-500">Privacidad</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Vigente para la Academia Elart Inversiones • 2026</p>
        </header>

        <section className="space-y-12 text-lg leading-relaxed font-medium">
          
          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <EyeOff className="text-cyan-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">1. Recolección de Información</h2>
              <p>
                En <strong>ELART INVERSIONES</strong>, solo recolectamos los datos estrictamente necesarios para tu formación: nombre, correo electrónico y registros de progreso en el curso. No solicitamos ni almacenamos datos de tus cuentas bancarias o brokers externos.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <Lock className="text-cyan-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">2. Uso de los Datos</h2>
              <p>
                Tus datos se utilizan exclusivamente para gestionar tu acceso al portal de alumnos, enviarte actualizaciones importantes del mercado y personalizar tu experiencia educativa. <strong>Nunca</strong> venderemos ni compartiremos tu información con terceros para fines publicitarios.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <Database className="text-cyan-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">3. Seguridad de la Información</h2>
              <p>
                Implementamos protocolos de cifrado SSL y seguridad a través de <strong>Supabase (Google Cloud)</strong> para asegurar que tu contraseña y acceso estén blindados contra intentos de intrusión. Tu privacidad es nuestra prioridad técnica.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <Bell className="text-cyan-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">4. Cookies y Rastreo</h2>
              <p>
                Utilizamos cookies técnicas para mantener tu sesión iniciada y recordar por qué lección vas. No utilizamos cookies de rastreo intrusivo para seguir tu actividad fuera de nuestra academia.
              </p>
            </div>
          </div>

        </section>

        {/* Cierre Profesional */}
        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm italic">
            Tienes derecho a solicitar la eliminación de tus datos en cualquier momento escribiendo a: <br />
            <span className="text-cyan-500 font-bold">elartinversiones@gmail.com</span>
          </p>
        </footer>

      </article>
    </main>
  );
}