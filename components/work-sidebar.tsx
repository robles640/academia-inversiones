
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Users,
  Video,
  LoaderCircle,
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { BrandIdentity } from '@/components/brand-identity';

type NavigationItem = {
  href: string;
  label: string;
  icon: typeof BookOpen;
};

function MenuLink({ href, label, icon: Icon }: NavigationItem) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  const active =
    pathname === href ||
    (
      href !== '/dashboard' &&
      href !== '/admin' &&
      pathname.startsWith(`${href}/`)
    );

  useEffect(() => {
    setPending(false);
  }, [pathname]);

  return (
    <Link
      href={href}
      prefetch={true}
      aria-current={active ? 'page' : undefined}
      className={`elart-side-link ${active ? 'is-active' : ''} ${pending ? 'is-pending' : ''}`}
      onClick={() => {
        if (pathname !== href) {
          setPending(true);
        }
      }}
    >
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />

      <span>{label}</span>

      {pending ? (
        <LoaderCircle
          size={14}
          className="elart-spin elart-nav-trailing"
        />
      ) : active ? (
        <span className="elart-active-dot" />
      ) : null}
    </Link>
  );
}

export function WorkSidebar({
  admin = false,
}: {
  admin?: boolean;
}) {
  const primary: NavigationItem[] = admin
    ? [
        {
          href: '/admin',
          label: 'Vista general',
          icon: LayoutDashboard,
        },
        {
          href: '/admin/cursos',
          label: 'Cursos y contenidos',
          icon: BookOpen,
        },
        {
          href: '/admin/pagos',
          label: 'Validación de pagos',
          icon: ShoppingBag,
        },
        {
          href: '/admin/alumnos',
          label: 'Alumnos y matrículas',
          icon: Users,
        },
      ]
    : [
        {
          href: '/dashboard',
          label: 'Resumen',
          icon: LayoutDashboard,
        },
        {
          href: '/mis-cursos',
          label: 'Mi aprendizaje',
          icon: Video,
        },
        {
          href: '/cuenta',
          label: 'Mi perfil',
          icon: Settings2,
        },
      ];

  return (
    <aside
      className="elart-sidebar"
      aria-label={admin ? 'Administración' : 'Navegación del campus'}
    >

      {/* LOGO CORPORATIVO OFICIAL */}
      <BrandIdentity dark />

      {/* IDENTIFICACIÓN DEL ENTORNO */}
      <div className="elart-sidebar-mode">
        <ShieldCheck size={15} />
        {admin ? 'Administración' : 'Campus de aprendizaje'}
      </div>

      {/* NAVEGACIÓN */}
      <div className="elart-sidebar-nav">

        <span className="elart-sidebar-caption">
          {admin ? 'CENTRO DE CONTROL' : 'MI ESPACIO'}
        </span>

        {primary.map((item) => (
          <MenuLink key={item.href} {...item} />
        ))}

        <span className="elart-sidebar-caption">
          EXPLORAR
        </span>

        <MenuLink
          href="/cursos"
          label="Catálogo de cursos"
          icon={BookOpen}
        />

        {admin ? (
          <MenuLink
            href="/dashboard"
            label="Ver campus alumno"
            icon={GraduationCap}
          />
        ) : null}

      </div>

      {/* PIE DEL MENÚ LATERAL */}
      <div className="elart-sidebar-footer">

        <Link
          href="/"
          className="elart-sidebar-website"
        >
          Volver a la academia
          <ArrowUpRight size={15} />
        </Link>

        <form action={logout}>
          <button
            type="submit"
            className="elart-side-link elart-sidebar-exit"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </form>

      </div>
    </aside>
  );
}
