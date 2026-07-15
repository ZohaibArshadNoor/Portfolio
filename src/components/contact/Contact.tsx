"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ContactGlobe } from "@/components/three/ContactGlobe";
import { SITE } from "@/data/site";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormState = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Valid email is required";
    }
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  const field = (
    name: keyof FormState,
    label: string,
    as: "input" | "textarea" = "input"
  ) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-text-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl border border-border bg-bg-surface/70 px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-dim focus:border-cyan/50"
          placeholder={label}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={name === "email" ? "email" : "text"}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl border border-border bg-bg-surface/70 px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-dim focus:border-cyan/50"
          placeholder={label}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <section id="contact" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent"
          description="Open to software engineering, AI/ML, and backend internship opportunities."
          align="center"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <ContactGlobe />
            <ul className="mt-6 space-y-3 text-sm text-text-muted">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-cyan" />
                <a href={`mailto:${SITE.email}`} className="hover:text-cyan" data-cursor="hover">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-cyan" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-cyan" data-cursor="hover">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-cyan" />
                {SITE.location}
              </li>
              <li className="flex items-center gap-3">
                <FaGithub className="text-cyan" />
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan" data-cursor="hover">
                  github.com/ZohaibArshadNoor
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-cyan" />
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan" data-cursor="hover">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>

          <motion.form
            onSubmit={onSubmit}
            className="glass gradient-border space-y-4 rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            noValidate
          >
            {field("name", "Your name")}
            {field("email", "Email address")}
            {field("subject", "Subject")}
            {field("message", "Message", "textarea")}

            <MagneticButton
              type="submit"
              variant="primary"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </MagneticButton>

            {status === "success" && (
              <p className="text-center text-sm text-cyan" role="status">
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400" role="alert">
                Something went wrong. Email me directly at {SITE.email}.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
