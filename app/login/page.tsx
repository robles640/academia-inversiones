'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

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
      // AQUÍ ESTÁ EL CAMBIO: Mensaje limpio y profesional para el cliente
      setError('Correo y/o contraseña incorrectas.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-emerald-500 selection:text-slate-900">
      
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-semibold">
          ← Volver al inicio
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-800 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="text-3xl font-black tracking-tighter text-white mb-2">
            Inversión<span className="text-emerald-500">Capital</span>
          </div>
          <p className="text-slate-400 text-sm">
            Ingresa a tu portal de alumno
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          {/* El cuadro rojo ahora es discreto */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </main>
  );
}