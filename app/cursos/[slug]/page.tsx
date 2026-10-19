
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CheckCircle2,
  Clock3,
  Globe2,
  Layers3,
  LockKeyhole,
  PlayCircle,
  MessageCircle,
} from 'lucide-react';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { findCourse, isConfigured } from '@/lib/db';
import { courses, money, whatsappLink } from '@/lib/catalog';
import { createClient } from '@/utils/supabase/server';

export async function generateStaticParams() {
  return courses.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const c = await findCourse((await params).slug);

  return {
    title: c?.title || 'Curso no encontrado',
    description: c?.summary,
  };
}

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await findCourse(slug);

  if (!course) {
    notFound();
  }

  // =========================================
  // INSCRIPCIÓN PERSONALIZADA POR WHATSAPP
  // =========================================

  const whatsapp = new URL(whatsappLink);

  const mensaje = `Hola, deseo inscribirme al Curso de "${course.title}".`;

  whatsapp.searchParams.set('text', mensaje);

  const whatsappUrl = whatsapp.toString();

  // =========================================
  // CONSULTAR MÓDULOS Y LECCIONES
  // =========================================

  let chapters: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration_label: string;
    }[];
  }[] = [];

  if (isConfigured()) {
    const sb = await createClient();

    const { data: record } = await sb
      .from('courses')
      .select('id')
      .eq('slug', slug)
      .single();

    if (record) {
      const { data: mods } = await sb
        .from('modules')
        .select(
          'id,title,position,lessons(id,title,duration_label,position)'
        )
        .eq('course_id', record.id)
        .order('position');

      chapters = (mods || []).map((m) => ({
        ...m,
        lessons: (m.lessons || []).sort(
          (a, b) => a.position - b.position
        ),
      }));
    }
  }

  return (
    <>
      <SiteHeader />

      <main>
        {/* PRESENTACIÓN DEL CURSO */}
        <section className="detail-hero">
          <div className="container detail-grid">
            <div>
              <div className="breadcrumbs">
                <Link href="/">Inicio</Link>
                {' / '}
                <Link href="/cursos">Cursos</Link>
                {' / '}
                {course.category}
              </div>

              <span className="kicker kicker-light">
                <span />
                {course.category.toUpperCase()}
              </span>

              <h1>{course.title}</h1>

              <p>{course.summary}</p>

              <div className="hero-foot">
                <span>
                  <CheckCircle2 size={16} />
                  {course.level}
                </span>

                <span>
                    <Clock3 size={16}/>
                    {chapters.reduce(
                        (total, module) => total + module.lessons.length,
                        0
                    )} lecciones
                </span>

                <span>
                  <Globe2 size={16} />
                  Online · Español
                </span>
              </div>
            </div>

            <div className="detail-picture">
              <Image
                src={course.cover_url}
                width={800}
                height={560}
                unoptimized
                alt={course.title}
              />
            </div>
          </div>
        </section>

        <div className="container detail-layout">
          <div>
            {/* DESCRIPCIÓN */}
            <div className="content-panel">
              <h2>Sobre esta formación</h2>

              <p>{course.description}</p>

              <ul className="list-check">
                <li>
                  <CheckCircle2 size={17} />
                  Ruta de aprendizaje organizada por módulos
                </li>

                <li>
                  <CheckCircle2 size={17} />
                  Acceso al campus para estudiantes inscritos
                </li>

                <li>
                  <CheckCircle2 size={17} />
                  Material multimedia según disponibilidad
                </li>
              </ul>
            </div>

            {/* TEMARIO */}
            <div className="content-panel">
              <h2>Contenido del programa</h2>

              {chapters.length ? (
                chapters.map((m, i) => (
                  <details
                    key={m.id}
                    className="faq-item"
                    open={i === 0}
                  >
                    <summary>
                      Módulo {i + 1}: {m.title}
                      <span>+</span>
                    </summary>

                    <div>
                      {m.lessons.map((l, j) => (
                        <div
                          className="lesson-outline"
                          key={l.id}
                        >
                          <span>
                            <PlayCircle
                              size={14}
                              style={{
                                verticalAlign: 'middle',
                                marginRight: 7,
                              }}
                            />
                            {String(j + 1).padStart(2, '0')}
                            {' · '}
                            {l.title}
                          </span>

                          <small>{l.duration_label}</small>
                        </div>
                      ))}
                    </div>
                  </details>
                ))
              ) : (
                <p>
                  El temario se mostrará aquí cuando
                  conectes la base de datos y ejecutes
                  los archivos de instalación SQL.
                </p>
              )}
            </div>
          </div>

          {/* PANEL DE INSCRIPCIÓN */}
          <aside className="detail-sidebar">
            <small>
              {course.status === 'published'
                ? 'INSCRIPCIONES ABIERTAS'
                : 'PROGRAMA EN PREPARACIÓN'}
            </small>

            <div className="detail-price">
              {money(course.price_usd)}
            </div>

            {/* NUEVO BOTÓN DE WHATSAPP */}
            {course.status === 'published' ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                <MessageCircle size={18} />
                Inscribirme al Curso
              </a>
            ) : (
              <div className="alert">
                Las inscripciones para este programa todavía no están disponibles.
              </div>
            )}

            <Link
              href="/contacto"
              className="btn btn-outline-dark"
            >
              Solicitar información
            </Link>

            <p>
              Para inscribirte, comunícate con nuestro
              equipo por WhatsApp. Te proporcionaremos
              los métodos de pago y las instrucciones
              para activar tu acceso al campus.
            </p>

            <ul className="list-check">
              <li>
                <LockKeyhole size={17} />
                Acceso privado tras aprobación
              </li>

              <li>
                <Layers3 size={17} />
                Contenido ordenado por módulos
              </li>

              <li>
                <Globe2 size={17} />
                Estudia desde cualquier lugar
              </li>
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
