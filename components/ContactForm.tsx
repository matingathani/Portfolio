"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const initialState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      return "Please use a valid email.";
    }
    if (form.message.trim().length < 10) return "Message should be at least 10 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div>
        <label className="mb-2 block text-sm text-secondary" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input-field"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-secondary" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input-field"
          placeholder="you@email.com"
          type="email"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-secondary" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className="input-field min-h-[140px]"
          placeholder="Tell me about the role or project."
          required
        />
      </div>
      {status === "error" && error && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
        {status === "success" && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-accent"
          >
            Message sent. I will reply soon.
          </motion.span>
        )}
      </div>
    </form>
  );
}
