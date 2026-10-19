
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { login } from "@/app/actions/auth";
import { isConfigured } from "@/lib/db";
import { GoogleSignIn } from "@/components/google-signin";
import styles from "./login.module.css";

type LoginSearchParams = {
  error?: string;
  notice?: string;
  next?: string;
};

const features = [
  {
    number: "01",
    title: "Formación especializada",
    description: "Programas diseñados para impulsar tus conocimientos.",
  },
  {
    number: "02",
    title: "Tu aprendizaje, a tu ritmo",
    description: "Accede a tus cursos y continúa donde los dejaste.",
  },
  {
    number: "03",
    title: "Un entorno exclusivo",
    description: "Todo tu progreso académico en un solo lugar.",
  },
];

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<LoginSearchParams>;
}) {
  const params = await searchParams;
  const next = params.next || "/dashboard";

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.showcase}>
            <div className={styles.showcaseGlow} aria-hidden="true" />

            <div className={styles.showcaseContent}>
              <div className={styles.brand}>
                <div className={styles.brandLogo}>
                  <Image
                    src="/elart-logo-oficial.webp"
                    alt="Escudo de Elart Academia"
                    width={68}
                    height={68}
                    className={styles.logoImage}
                    priority
                  />
                </div>

                <div className={styles.brandText}>
                  <strong>ELART ACADEMIA</strong>
                  <span>ACADEMIA DE FINANZAS Y TECNOLOGÍA</span>
                </div>
              </div>

              <div className={styles.showcaseMain}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} />
                  EDUCACIÓN PROFESIONAL
                </div>

                <h1 className={styles.heroTitle}>
                  El conocimiento
                  <br />
                  transforma tu
                  <br />
                  <em>futuro.</em>
                </h1>

                <p className={styles.heroDescription}>
                  Un espacio creado para quienes buscan aprender,
                  desarrollar nuevas habilidades y avanzar con confianza.
                </p>

                <div className={styles.features}>
                  {features.map((feature) => (
                    <div className={styles.feature} key={feature.number}>
                      <span className={styles.featureNumber}>
                        {feature.number}
                      </span>
                      <div>
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.showcaseFooter}>
                <span>ELART ACADEMIA</span>
                <span>APRENDE HOY. CONSTRUYE NUEVAS OPORTUNIDADES.</span>
              </div>
            </div>
          </section>

          <section className={styles.loginPanel}>
            <div className={styles.mobileBrand}>
              <Image
                src="/elart-logo-oficial.webp"
                alt="Elart Academia"
                width={48}
                height={48}
              />
              <div>
                <strong>ELART ACADEMIA</strong>
                <span>EDUCACIÓN PROFESIONAL</span>
              </div>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.formHeading}>
                <span className={styles.formEyebrow}>
                  BIENVENIDO A TU CAMPUS VIRTUAL
                </span>

                <h2>Inicia sesión</h2>

                <p>
                  Accede a tu cuenta y continúa tu experiencia de aprendizaje.
                </p>
              </div>

              {!isConfigured() && (
                <div className={styles.notice}>
                  Modo de presentación: configura Supabase para habilitar
                  el inicio de sesión.
                </div>
              )}

              {params.error && (
                <div className={styles.error} role="alert">
                  {params.error}
                </div>
              )}

              {params.notice && (
                <div className={styles.success} role="status">
                  {params.notice}
                </div>
              )}

              <form className={styles.form} action={login}>
                <input type="hidden" name="next" value={next} />

                <div className={styles.field}>
                  <label htmlFor="login-email">Correo electrónico</label>

                  <input
                    id="login-email"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="nombre@correo.com"
                  />
                </div>

                <div className={styles.field}>
                  <div className={styles.passwordLabel}>
                    <label htmlFor="login-password">Contraseña</label>

                    <Link href="/recuperar">
                      ¿La olvidaste?
                    </Link>
                  </div>

                  <input
                    id="login-password"
                    required
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Introduce tu contraseña"
                  />
                </div>

                <button className={styles.submitButton} type="submit">
                  <span>Acceder a mi campus</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>

              <div className={styles.googleSection}>
                <GoogleSignIn next={next} />
              </div>

              <div className={styles.registerSection}>
                <span>¿Todavía no tienes una cuenta?</span>
                <Link href="/registro">
                  Crear cuenta gratuita
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>

              <div className={styles.securityFooter}>
                <span className={styles.lockIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                Acceso protegido mediante autenticación segura
              </div>

              <div className={styles.legalLinks}>
                <Link href="/privacidad">Privacidad</Link>
                <span aria-hidden="true">·</span>
                <Link href="/terminos">Términos y condiciones</Link>
                <span aria-hidden="true">·</span>
                <Link href="/contacto">Contacto</Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
