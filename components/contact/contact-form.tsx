"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

const fieldClasses =
  "mt-2 w-full rounded-(--radius-card) border border-(--color-surface-border) bg-(--color-surface-2) px-4 py-2.5 text-sm text-(--color-ink-0) outline-none transition-colors placeholder:text-(--color-ink-3) focus:border-(--color-accent-500)";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "Não foi possível enviar a mensagem. Tente novamente.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Não foi possível enviar a mensagem. Verifique sua conexão e tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 text-left">
      {/* Honeypot anti-spam: escondido para pessoas, mas visível para bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-xs tracking-wide text-(--color-ink-2) uppercase"
          >
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Seu nome"
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-xs tracking-wide text-(--color-ink-2) uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="message"
          className="text-xs tracking-wide text-(--color-ink-2) uppercase"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Conte um pouco sobre a oportunidade, o desafio ou a ideia."
          className={`${fieldClasses} resize-y`}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : (
            <Send aria-hidden />
          )}
          {status === "loading" ? "Enviando..." : "Enviar mensagem"}
        </Button>

        <span role="status" aria-live="polite" className="text-sm">
          {status === "success" ? (
            <span className="text-(--color-accent-300)">
              Mensagem enviada — vou responder o quanto antes.
            </span>
          ) : null}
          {status === "error" ? (
            <span className="text-red-400">{errorMessage}</span>
          ) : null}
        </span>
      </div>
    </form>
  );
}
