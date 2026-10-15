"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  initialAuthFormValues,
  validateAuthForm,
  type AuthField,
  type AuthFieldErrors,
  type AuthFormValues,
  type AuthMode,
} from "@/features/auth/schemas/auth-form";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isRegister = mode === "register";
  const [values, setValues] = useState(initialAuthFormValues);
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [notice, setNotice] = useState("");

  function updateField(field: AuthField, value: string) {
    setValues((currentValues: AuthFormValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAuthForm(values, mode);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      return;
    }

    setNotice(
      "Data sudah valid, tetapi belum dikirim. Integrasi API auth dan session menunggu kontrak backend.",
    );
  }

  return (
    <div className="auth-form-column">
      <div className="auth-form-heading">
        <p className="auth-eyebrow">{isRegister ? "START YOUR STUDIO" : "WELCOME BACK"}</p>
        <h2>{isRegister ? "Create your account" : "Sign in to your studio"}</h2>
        <p>
          {isRegister
            ? "Set up your creator workspace and bring the next idea to life."
            : "Pick up where your next piece of work begins."}
        </p>
      </div>

      {notice && (
        <Alert className="auth-notice" role="status">
          <AlertTitle>Belum terhubung ke server</AlertTitle>
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      )}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        {isRegister && (
          <div className="auth-field">
            <Label htmlFor="name">Nama</Label>
            <Input
              autoComplete="name"
              id="name"
              name="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Nama lengkap"
              value={values.name}
            />
            {errors.name && <p className="auth-field-error" id="name-error">{errors.name}</p>}
          </div>
        )}

        <div className="auth-field">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            id="email"
            name="email"
            type="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="nama@email.com"
            value={values.email}
          />
          {errors.email && <p className="auth-field-error" id="email-error">{errors.email}</p>}
        </div>

        <div className="auth-field">
          <div className="auth-label-row">
            <Label htmlFor="password">Password</Label>
            {!isRegister && <span className="auth-field-hint">Minimal 8 karakter</span>}
          </div>
          <div className="auth-password-control">
            <Input
              autoComplete={isRegister ? "new-password" : "current-password"}
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Masukkan password"
              value={values.password}
            />
            <Button
              aria-label={isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"}
              className="auth-password-toggle"
              onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
              size="icon"
              type="button"
              variant="ghost"
            >
              {isPasswordVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </Button>
          </div>
          {errors.password && (
            <p className="auth-field-error" id="password-error">{errors.password}</p>
          )}
        </div>

        {isRegister && (
          <div className="auth-field">
            <Label htmlFor="confirmPassword">Konfirmasi password</Label>
            <Input
              autoComplete="new-password"
              id="confirmPassword"
              name="confirmPassword"
              type={isPasswordVisible ? "text" : "password"}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              placeholder="Ulangi password"
              value={values.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="auth-field-error" id="confirm-password-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        <Button className="auth-submit-button" type="submit" size="lg">
          <span>{isRegister ? "Create account" : "Continue to studio"}</span>
          <ArrowRight aria-hidden="true" data-icon="inline-end" />
        </Button>
      </form>

      <p className="auth-switch-prompt">
        {isRegister ? "Already have an account?" : "New to Frame?"}{" "}
        <Link href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}