import type { ReactNode } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import styles from "@/app/login/login.module.css";

/**
 * Marco visual compartido para acceso, registro y recuperación.
 * No contiene lógica de autenticación.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.showcase} aria-label="Elart Academia">
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
                <h2 className={styles.heroTitle}>
                  El conocimiento<br />
                  transforma tu<br />
                  <em>futuro.</em>
                </h2>
                <p className={styles.heroDescription}>
                  Formación online que conecta conocimientos, tecnología
                  y nuevas oportunidades para tu desarrollo profesional.
                </p>
                <div className={styles.features}>
                  <div className={styles.feature}>
                    <span className={styles.featureNumber}>01</span>
                    <div><h3>Formación especializada</h3><p>Programas diseñados para aprender con claridad.</p></div>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureNumber}>02</span>
                    <div><h3>A tu propio ritmo</h3><p>Continúa tus estudios desde cualquier dispositivo.</p></div>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureNumber}>03</span>
                    <div><h3>Un campus exclusivo</h3><p>Tu formación, materiales y progreso en un solo lugar.</p></div>
                  </div>
                </div>
              </div>
              <div className={styles.showcaseFooter}>
                <span>ELART ACADEMIA</span>
                <span>APRENDE HOY. CONSTRUYE NUEVAS OPORTUNIDADES.</span>
              </div>
            </div>
          </section>

          <section className={styles.loginPanel} aria-label="Acceso al campus">
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
            <div className={styles.formContainer}>{children}</div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
