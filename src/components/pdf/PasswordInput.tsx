/**
 * Password input for encrypted PDFs
 */

import { useState, useCallback } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface Props {
  onSubmit: (password: string) => void;
  attempts: number;
  maxAttempts: number;
  disabled?: boolean;
}

export default function PasswordInput({
  onSubmit,
  attempts,
  maxAttempts,
  disabled,
}: Props) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (password.trim()) {
        onSubmit(password);
        setPassword("");
      }
    },
    [password, onSubmit]
  );

  const attemptsRemaining = maxAttempts - attempts;

  return (
    <div className="rounded-lg border border-skin-accent/50 bg-skin-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <Lock className="h-5 w-5 text-skin-accent" />
        <h3 className="font-medium text-skin-base">Palavra-passe Necessária</h3>
      </div>
      <p className="mb-4 text-sm text-skin-base opacity-70">
        Este PDF está protegido por palavra-passe. Introduz a palavra-passe para continuar.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Introduz a palavra-passe"
            disabled={disabled}
            className="w-full rounded border border-skin-line bg-skin-fill p-3 pr-10 text-skin-base focus-outline"
            autoFocus
            aria-describedby={attempts > 0 ? "password-attempts" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-skin-base opacity-50 hover:opacity-100"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {attempts > 0 && (
          <p
            id="password-attempts"
            className="mt-2 text-sm text-red-500"
            role="alert"
          >
            Palavra-passe incorreta. {attemptsRemaining} tentativa
            {attemptsRemaining !== 1 ? "s" : ""} restante{attemptsRemaining !== 1 ? "s" : ""}.
          </p>
        )}

        <button
          type="submit"
          disabled={disabled || !password.trim()}
          className={`
            mt-4 w-full rounded bg-skin-accent px-4 py-2 font-medium text-skin-inverted
            transition-opacity focus-outline
            ${disabled || !password.trim() ? "cursor-not-allowed opacity-50" : "hover:opacity-90"}
          `}
        >
          Desbloquear PDF
        </button>
      </form>
    </div>
  );
}
