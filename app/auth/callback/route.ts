import {NextRequest, NextResponse} from 'next/server';
import {createClient} from '@/utils/supabase/server';
/** Devuelve al sitio solo rutas relativas: nunca URLs externas. */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const requested = request.nextUrl.searchParams.get('next') || '/dashboard';
  const next = requested.startsWith('/') && !requested.startsWith('//') && !requested.includes('\\') ? requested : '/dashboard';
  if (!code) return NextResponse.redirect(new URL('/login?error=Google%20no%20devolvi%C3%B3%20un%20c%C3%B3digo%20v%C3%A1lido',request.url));
  const sb = await createClient();
  const {error} = await sb.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL('/login?error=No%20se%20pudo%20validar%20la%20cuenta%20de%20Google',request.url));
  // Se mantiene el host real para que los previews de Vercel no redirijan a producción.
  const origin = request.nextUrl.origin;
  return NextResponse.redirect(new URL(next,origin));
}
