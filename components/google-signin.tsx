'use client';
import {useState} from 'react';
import {createClient} from '@/utils/supabase/client';

export function GoogleSignIn({next = '/dashboard', label = 'Continuar con Google'}: {next?: string; label?: string}) {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  async function signIn() {
    if (loading) return;
    setError('');
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError('Primero configura la conexión a Supabase.');return;
    }
    setLoading(true);
    try {
      const safeNext = next.startsWith('/') && !next.startsWith('//') && !next.includes('\\') ? next : '/dashboard';
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
      const {error: oauthError} = await createClient().auth.signInWithOAuth({provider:'google',options:{redirectTo}});
      if (oauthError) throw oauthError;
    } catch {
      setError('No se pudo iniciar con Google. Comprueba que el proveedor esté activado en Supabase.');
      setLoading(false);
    }
  }
  return <div className="oauth-block">
    <div className="auth-divider"><span>o continúa de forma segura con</span></div>
    <button className="google-auth-btn" type="button" disabled={loading} onClick={signIn}>
      <span className="google-g" aria-hidden="true">G</span>{loading ? 'Conectando con Google…' : label}
    </button>
    {error&&<div className="alert error" role="alert">{error}</div>}
  </div>;
}
