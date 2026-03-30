'use client';

import Link from 'next/link';
import { ChevronLeft, Scale, ShieldAlert, FileText, UserCheck } from 'lucide-react';

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500 selection:text-slate-900">
      
      {/* Luces de fondo decorativas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

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
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6">
            <FileText className="w-3 h-3" /> Documento Legal Oficial
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
            Términos y <span className="text-emerald-500">Condiciones</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Última actualización: 28 de Marzo, 2026</p>
        </header>

        <section className="space-y-12 text-lg leading-relaxed font-medium">
          
          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <Scale className="text-emerald-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">1. Aceptación del Servicio</h2>
              <p>
                Al acceder y utilizar la plataforma de <strong>ELART INVERSIONES</strong>, el usuario acepta de manera íntegra los presentes términos. Este servicio está diseñado exclusivamente para fines educativos y de formación financiera.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <ShieldAlert className="text-emerald-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">2. Descargo de Responsabilidad (Risk Warning)</h2>
              <p className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 italic text-slate-400">
                "Las inversiones en mercados financieros conllevan riesgos. ELART INVERSIONES no es una entidad de asesoría financiera ni de gestión de capital. Todo el contenido es educativo y los resultados pasados no garantizan rendimientos futuros."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <FileText className="text-emerald-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">3. Propiedad Intelectual</h2>
              <p>
                Todo el material audiovisual, software, textos y logos dentro de esta academia son propiedad intelectual de <strong>Alan Felipe Robles Diaz</strong>. Queda terminantemente prohibida la reproducción total o parcial, venta o distribución del contenido sin autorización previa.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[40px_1fr] gap-4">
            <UserCheck className="text-emerald-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic mb-4">4. Uso de la Cuenta</h2>
              <p>
                El acceso es personal e intransferible. El sistema de monitoreo de ELART INVERSIONES detecta accesos simultáneos desde distintas ubicaciones. El uso compartido de una cuenta resultará en la suspensión inmediata del servicio sin derecho a reembolso.
              </p>
            </div>
          </div>

        </section>

        {/* Cierre Profesional */}
        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm italic">
            Para dudas adicionales sobre este documento, contáctanos en <br />
            <span className="text-emerald-500 font-bold">elartinversiones@gmail.com</span>
          </p>
        </footer>

      </article>
    </main>
  );
}