"use client";

import { useState, useCallback, useRef } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Status = "idle" | "sending" | "success" | "error";

const initial: FormData = { name: "", email: "", phone: "", subject: "", message: "" };

export function useContactForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const renderTime = useRef(Date.now());

  const update = useCallback(
    (field: keyof FormData, value: string) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    [],
  );

  const reset = useCallback(() => {
    setForm(initial);
    setStatus("idle");
    setErrorMsg("");
    renderTime.current = Date.now();
  }, []);

  const submit = useCallback(async () => {
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _hp: honeypot,
          _t: renderTime.current,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initial);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }, [form, honeypot]);

  return { form, status, errorMsg, update, submit, reset, honeypot, setHoneypot };
}
