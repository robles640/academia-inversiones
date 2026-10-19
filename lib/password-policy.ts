/** Política para contraseñas nuevas; no afecta a inicios de sesión de usuarios existentes. */
export const PASSWORD_MIN_LENGTH = 7;
export function isStrongPassword(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH && password.length <= 72
    && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}
export const PASSWORD_HINT = 'Mínimo 7 caracteres, una mayúscula, una minúscula y un número';
