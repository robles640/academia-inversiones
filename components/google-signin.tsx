
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type GoogleSignInProps = {
  next?: string;
  label?: string;
};

function GoogleLogo() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 38.03 46.98 31.88 46.98 24.55z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function GoogleSignIn({
  next = "/dashboard",
  label = "Continuar con Google",
}: GoogleSignInProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn() {
    if (loading) return;

    setError("");

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setError("Primero configura la conexión a Supabase.");
      return;
    }

    setLoading(true);

    try {
      const safeNext =
        next.startsWith("/") &&
        !next.startsWith("//") &&
        !next.includes("\\")
          ? next
          : "/dashboard";

      const redirectTo =
        `${window.location.origin}/auth/callback` +
        `?next=${encodeURIComponent(safeNext)}`;

      const { error: oauthError } = await createClient()
        .auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });

      if (oauthError) throw oauthError;
    } catch {
      setError(
        "No se pudo iniciar con Google. Comprueba que el proveedor esté activado en Supabase."
      );
      setLoading(false);
    }
  }

  return (
    <div className="oauth-block">
      <div className="auth-divider">
        <span>O continúa con tu cuenta de Google</span>
      </div>

      <button
        className="google-auth-btn"
        type="button"
        disabled={loading}
        onClick={signIn}
      >
        <GoogleLogo />
        <span>
          {loading ? "Conectando con Google…" : label}
        </span>
      </button>

      {error && (
        <div className="alert error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
