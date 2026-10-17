
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import { getSessionUser } from '@/lib/db';
import { BrandIdentity } from '@/components/brand-identity';

export async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <>
      <div className="topline">
        <div className="container top-inner">
          <span>ELART ACADEMIA · EDUCACIÓN PROFESIONAL</span>
          <span>
            Aprende hoy. Construye nuevas oportunidades.
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">

          {/* IDENTIDAD CORPORATIVA OFICIAL */}
          <BrandIdentity />

          {/* NAVEGACIÓN PRINCIPAL */}
          <nav className="main-nav">
            <Link href="/">Inicio</Link>
            <Link href="/cursos">Cursos</Link>
            <Link href="/#metodologia">Nuestra metodología</Link>
            <Link href="/#preguntas">Preguntas frecuentes</Link>
          </nav>

          {/* ACCIONES DE USUARIO */}
          <div className="nav-actions">
            {user ? (
              <Link className="btn btn-dark btn-sm" href="/dashboard">
                Mi campus
                <ArrowUpRight size={15} />
              </Link>
            ) : (
              <>
                <Link className="login-link" href="/login">
                  Ingresar
                </Link>
                <Link className="btn btn-dark btn-sm" href="/cursos">
                  Explorar cursos
                  <ArrowUpRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* MENÚ RESPONSIVO */}
          <details className="mobile-menu">
            <summary aria-label="Abrir menú">
              <Menu size={23} />
            </summary>
            <nav>
              <Link href="/">Inicio</Link>
              <Link href="/cursos">Ver cursos</Link>
              <Link href="/login">Ingresar</Link>
              <Link href="/dashboard">Mi campus</Link>
            </nav>
          </details>

        </div>
      </header>
    </>
  );
}
