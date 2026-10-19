import Link from "next/link";
import { AuthLayout } from "@/components/auth-layout";
import { login } from "@/app/actions/auth";
import { isConfigured } from "@/lib/db";
import { GoogleSignIn } from "@/components/google-signin";
import styles from "./login.module.css";

type LoginSearchParams = {
  error?: string;
  notice?: string;
  next?: string;
};

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<LoginSearchParams>;
}) {
  const params = await searchParams;
  const next = params.next || "/dashboard";

  return (
    <AuthLayout>
      <div className={styles.formHeading}>
        <span className={styles.formEyebrow}>BIENVENIDO A TU CAMPUS VIRTUAL</span>
        <h1>Inicia sesión</h1>
        <p>Accede a tu cuenta y continúa tu experiencia de aprendizaje.</p>
      </div>

      {!isConfigured() && (
        <div className={styles.notice}>
          Modo de presentación: configura Supabase para habilitar el inicio de sesión.
        </div>
      )}
      {params.error && <div className={styles.error} role="alert">{params.error}</div>}
      {params.notice && <div className={styles.success} role="status">{params.notice}</div>}

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
            <Link href="/recuperar">¿La olvidaste?</Link>
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
        <Link href="/registro">Crear cuenta gratuita <span aria-hidden="true">→</span></Link>
      </div>

      <div className={styles.securityFooter}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
          stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="10" width="14" height="11" rx="2"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
        </svg>
        Acceso protegido mediante autenticación segura
      </div>

      <div className={styles.legalLinks}>
        <Link href="/privacidad">Privacidad</Link>
        <span aria-hidden="true">·</span>
        <Link href="/terminos">Términos y condiciones</Link>
        <span aria-hidden="true">·</span>
        <Link href="/contacto">Contacto</Link>
      </div>
    </AuthLayout>
  );
}
