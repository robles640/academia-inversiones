'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { ChevronLeft, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    
    // Intentamos iniciar sesión
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales incorrectas. Verifica tu acceso.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* 1. Luces de fondo (Efecto Premium) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* 2. Botón de Volver */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-all text-sm font-bold uppercase tracking-widest">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>

      {/* 3. Contenedor Principal del Login */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* 4. Cabecera con Logo Oficial Elart Inversiones */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-700 shadow-[0_5px_20px_rgba(16,185,129,0.3)] mb-6 border-2 border-white/10 shrink-0">
            <svg className="w-8 h-8 text-cyan-100 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 6l10-5 10 5v1.5H2V6zM4 8.5h16v1H4v-1z" />
              <path d="M4.5 7.5h1v1h-1zM7 7.5h1v1H7zM9.5 7.5h1v1h-1zM12 7.5h1v1h-1zM14.5 7.5h1v1h-1zM17 7.5h1v1h-1zM19.5 7.5h1v1h-1z" />
              <path d="M4.5 10h1.5v8h-1.5v-8zM9 10h1.5v8h-1.5v-8zM13.5 10h1.5v8h-1.5v-8zM18 10h1.5v8h-1.5v-8z" />
              <path d="M2 18.5h20v1H2v-1zM1.5 20.5h21v1.5h-21v-1.5z" />
            </svg>
          </div>
          
          <div className="flex flex-col leading-tight overflow-visible">
            <div className="flex items-end justify-center gap-1 transform -skew-x-12 origin-center overflow-visible">
              <span className="text-2xl font-black tracking-tighter text-white uppercase whitespace-nowrap">Elart</span>
              <span className="text-2xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 whitespace-nowrap">Inversiones</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 transform -skew-x-12 origin-center mt-1">Portal Alumnos</span>
          </div>
        </div>

        {/* 5. Formulario Rediseñado */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          
          {/* Input Email con Ícono */}
          <div className="relative group">
            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
              Acceso Institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              <input 
                type="email" 
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          {/* Input Password con Ícono */}
          <div className="relative group">
            <div className="flex justify-between items-end mb-2 ml-1">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">
                Clave de Seguridad
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium tracking-widest placeholder:text-slate-600 placeholder:tracking-normal"
                required
              />
            </div>
          </div>

          {/* Mensaje de Error Estilizado */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl font-medium animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          {/* Botón de Acción Principal */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Conectando...
              </span>
            ) : 'Ingresar a la Academia'}
          </button>
        </form>
        
        {/* Enlace para recuperación de contraseña (Solo visual, para profesionalidad) */}
        {/* Enlace para soporte 100% funcional vía WhatsApp */}
        <div className="mt-8 text-center">
            <a 
              href="https://wa.me/59164077551?text=Hola,%20tengo%20problemas%20para%20acceder%20a%20mi%20portal%20de%20alumno%20en%20Elart%20Inversiones." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-slate-500 text-xs font-bold hover:text-emerald-400 transition-colors uppercase tracking-widest group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              ¿Problemas de acceso? Soporte
            </a>
        </div>
      </div>
    </main>
  );
}