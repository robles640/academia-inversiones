import { AuthLayout } from "@/components/auth-layout";
import { updatePassword } from "@/app/actions/auth";
import { PasswordField } from "@/components/password-field";
import styles from "@/app/login/login.module.css";

export default async function NewPassword({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthLayout>
      <div className={styles.formHeading}>
        <span className={styles.formEyebrow}>PROTECCIÓN DE TU CUENTA</span>
        <h1>Nueva contraseña</h1>
        <p>Accede desde el enlace enviado a tu correo y define una contraseña segura.</p>
      </div>
      {error && <div className={styles.error} role="alert">{error}</div>}
      <form className={styles.form} action={updatePassword}>
        <div className={styles.field}>
          <label htmlFor="account-password">Nueva contraseña segura</label>
          <div className={styles.passwordField}><PasswordField /></div>
        </div>
        <button className={styles.submitButton} type="submit">
          <span>Actualizar contraseña</span><span aria-hidden="true">→</span>
        </button>
      </form>
      <div className={styles.securityFooter}>Elige una contraseña diferente de las que utilizas en otros servicios.</div>
    </AuthLayout>
  );
}
