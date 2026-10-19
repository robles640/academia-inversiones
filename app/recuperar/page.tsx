import Link from "next/link";
import { AuthLayout } from "@/components/auth-layout";
import { recover } from "@/app/actions/auth";
import styles from "@/app/login/login.module.css";

export default async function Recuperar({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthLayout>
      <div className={styles.formHeading}>
        <span className={styles.formEyebrow}>SEGURIDAD DE TU CUENTA</span>
        <h1>Recupera tu acceso</h1>
        <p>Te enviaremos un enlace a tu correo para restablecer tu contraseña de forma segura.</p>
      </div>
      {params.error && <div className={styles.error} role="alert">{params.error}</div>}
      {params.notice && <div className={styles.success} role="status">{params.notice}</div>}
      <form action={recover} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="recover-email">Correo electrónico</label>
          <input id="recover-email" type="email" name="email" required
            autoComplete="email" placeholder="nombre@correo.com" />
        </div>
        <button className={styles.submitButton} type="submit">
          <span>Enviar enlace de recuperación</span><span aria-hidden="true">→</span>
        </button>
      </form>
      <div className={styles.registerSection}>
        <Link href="/login">← Volver a iniciar sesión</Link>
      </div>
      <div className={styles.securityFooter}>Nunca compartas tus contraseñas ni códigos de verificación.</div>
    </AuthLayout>
  );
}
