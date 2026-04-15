"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: "Website Contact Form Submission" })
      });
      
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const inputClass = (field: string) =>
    `w-full py-4 px-5 rounded-xl text-white-theme text-[15px] font-body outline-none transition-all duration-300 ${
      error ? "bg-red-900/20 border-2 border-red focus:shadow-[0_0_15px_rgba(201,34,40,0.2)]"
      : success ? "bg-emerald-900/20 border-2 border-emerald-500"
      : "bg-glass-bg border-2 border-transparent focus:border-red focus:bg-transparent"
    }`;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-5"
    >
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-sm font-bold text-center">
          Message sent successfully! We will get back to you soon.
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-xl text-center">
          {error}
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="What is your name?"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          required
          className={inputClass("name")}
          disabled={loading}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="What is your email?"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          required
          className={inputClass("email")}
          disabled={loading}
        />
      </div>
      <div>
        <textarea
          placeholder="Write your message here..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          required
          rows={5}
          className={`${inputClass("message")} resize-y min-h-[120px]`}
          disabled={loading}
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center !py-[18px] !px-8 !text-base disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
      >
        {loading ? "Sending..." : "Send Message"}
      </motion.button>
    </motion.form>
  );
}
