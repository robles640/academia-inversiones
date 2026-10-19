
'use client';

import { useState } from 'react';
import { PASSWORD_MIN_LENGTH, PASSWORD_HINT } from '@/lib/password-policy';

export function PasswordField({
  autoComplete = 'new-password',
}: {
  autoComplete?: 'new-password' | 'current-password';
}) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const rules = [
    {
      ok: value.length >= PASSWORD_MIN_LENGTH && value.length <= 72,
      text: 'Entre 7 y 72 caracteres',
    },
    { ok: /[A-Z]/.test(value), text: 'Una mayúscula' },
    { ok: /[a-z]/.test(value), text: 'Una minúscula' },
    { ok: /[0-9]/.test(value), text: 'Un número' },
  ];

  return (
    <div className="password-control">
      <div className="password-input-wrap">
        <input
          id="account-password"
          aria-label="Contraseña"
          name="password"
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          minLength={7}
          maxLength={72}
          autoComplete={autoComplete}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,72}"
          title={PASSWORD_HINT}
          aria-describedby="password-rules"
        />

        <button
          className="password-visibility"
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {visible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <div className="password-rules" id="password-rules" aria-live="polite">
        {rules.map((r) => (
          <span key={r.text} className={r.ok ? 'valid' : 'pending'}>
            {r.ok ? '✓' : '○'} {r.text}
          </span>
        ))}
      </div>
    </div>
  );
}
