import Link from "next/link";
import { AuthLayout } from "@/components/auth-layout";
import { register } from "@/app/actions/auth";
import { isConfigured } from "@/lib/db";
import { GoogleSignIn } from "@/components/google-signin";
import { PasswordField } from "@/components/password-field";
import styles from "@/app/login/login.module.css";

export default async function Registro({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthLayout>
      <div className={styles.formHeading}>
        <span className={styles.formEyebrow}>ÚNETE A ELART ACADEMIA</span>
        <h1>Crea tu cuenta</h1>
        <p>Inicia una nueva etapa de aprendizaje en nuestro campus virtual.</p>
      </div>
      {!isConfigured() && <div className={styles.notice}>Configura Supabase para registrar usuarios.</div>}
      {error && <div className={styles.error} role="alert">{error}</div>}
      <form className={styles.form} action={register}>
        <div className={styles.field}>
          <label htmlFor="register-name">Nombre completo</label>
          <input id="register-name" name="full_name" type="text" required maxLength={150}
            autoComplete="name" placeholder="Tu nombre y apellidos" />
        </div>
        <div className={styles.field}>
          <label htmlFor="register-email">Correo electrónico</label>
          <input id="register-email" name="email" type="email" required
            autoComplete="email" placeholder="nombre@correo.com" />
        </div>
        <div className={styles.field}>
          <label htmlFor="account-password">Contraseña segura</label>
          <div className={styles.passwordField}><PasswordField /></div>
        </div>
        <button className={styles.submitButton} type="submit">
          <span>Crear mi cuenta</span><span aria-hidden="true">→</span>
        </button>
      </form>
      <div className={styles.googleSection}>
        <GoogleSignIn label="Registrarme con Google" />
      </div>
      <p className={styles.consent}>
        Al registrarte aceptas nuestros <Link href="/terminos">términos y condiciones</Link> y la <Link href="/privacidad">política de privacidad</Link>.
      </p>
      <div className={styles.registerSection}>
        <span>¿Ya tienes una cuenta?</span>
        <Link href="/login">Iniciar sesión <span aria-hidden="true">→</span></Link>
      </div>
    </AuthLayout>
  );
}
