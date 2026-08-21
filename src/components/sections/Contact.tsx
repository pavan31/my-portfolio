"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { site } from "@/lib/data/site";
import { socials } from "@/lib/data/socials";
import { emailjsConfig, isEmailjsConfigured } from "@/lib/emailjs";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TextReveal } from "@/components/motion/TextReveal";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

/** ["poluparthipavanseshukumar", "@gmail.com"] */
const emailLines = (() => {
  const at = site.email.indexOf("@");
  return at === -1
    ? [site.email]
    : [site.email.slice(0, at), site.email.slice(at)];
})();

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link still works.
      window.location.href = `mailto:${site.email}`;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      from_name: String(data.get("name") ?? ""),
      from_email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      to_name: site.name,
    };

    // No keys configured — hand off to the visitor's mail client instead.
    if (!isEmailjsConfigured) {
      const body = encodeURIComponent(
        `${payload.message}\n\n— ${payload.from_name} (${payload.from_email})`,
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        payload.subject,
      )}&body=${body}`;
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        payload,
        { publicKey: emailjsConfig.publicKey },
      );
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setError(
        `Something went wrong on the way out. Reach me directly at ${site.email}.`,
      );
    }
  };

  return (
    <section
      id="contact"
      className="gutter scroll-mt-24 border-t border-line bg-void py-28 md:py-40"
    >
      <SectionHeading
        index="07"
        label="Contact"
        title={["Tell me what", "you’re building"]}
        note="Open to product work, platform work, and the awkward problems in between."
      />

      {/* The address, at the scale it deserves */}
      <div className="mt-16 md:mt-24">
        <button
          type="button"
          onClick={copyEmail}
          data-cursor="view"
          data-cursor-label={copied ? "Copied" : "Copy"}
          className="group block w-full text-left"
          aria-label={`Copy email address ${site.email}`}
        >
          {/*
            Broken at the @ so the local part can be set large without
            overflowing the document — a single line at this size widens the
            page on a phone and drags the fixed header off screen.
          */}
          <TextReveal
            text={emailLines}
            label={site.email}
            by="char"
            stagger={0.012}
            className="font-display text-[clamp(1.35rem,5.6vw,6.5rem)] font-extrabold leading-[0.94] tracking-tighter text-ink transition-colors duration-500 group-hover:text-accent"
          />
          <span className="label mt-4 flex items-center gap-2 text-muted transition-colors duration-300 group-hover:text-accent">
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Copied to clipboard
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Click to copy
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Coordinates */}
        <div className="lg:col-span-4">
          <dl className="border-t border-line">
            {[
              { term: "Phone", value: site.phone, href: site.phoneHref },
              {
                term: "Based",
                value: `${site.location.city}, ${site.location.country}`,
                href: null,
              },
              { term: "Timezone", value: "IST · UTC+5:30", href: null },
            ].map((item) => (
              <div
                key={item.term}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <dt className="label text-muted">{item.term}</dt>
                <dd className="text-right text-sm text-ink">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-accent"
                      data-cursor="link"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-col">
            {socials
              .filter((social) => social.id !== "email")
              .map((social) => (
                <li key={social.id} className="border-b border-line">
                  <MagneticButton
                    href={social.href}
                    external
                    strength={0.18}
                    cursorLabel="Open"
                    className="group w-full py-4 text-ink transition-colors duration-300 hover:text-accent"
                    contentClassName="w-full justify-between"
                  >
                    <span className="font-display text-xl font-bold tracking-tight">
                      {social.label}
                    </span>
                    <span className="label ml-auto truncate text-muted">
                      {social.handle}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </MagneticButton>
                </li>
              ))}
          </ul>
        </div>

        {/* Boxless form — labels and rules only, no input chrome. */}
        <div className="lg:col-span-8">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid gap-x-10 md:grid-cols-2">
              {FIELDS.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "subject" ? "md:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="label block pt-6 text-muted"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    className="peer w-full border-0 border-b border-line bg-transparent py-3 font-display text-xl font-medium text-ink outline-none transition-colors duration-300 placeholder:text-dim focus:border-accent"
                  />
                </div>
              ))}
            </div>

            <label htmlFor="message" className="label block pt-8 text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full resize-none border-0 border-b border-line bg-transparent py-3 font-display text-xl font-medium text-ink outline-none transition-colors duration-300 focus:border-accent"
            />

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton
                type="submit"
                disabled={status === "sending"}
                cursorLabel="Send"
                className="label items-center bg-ink px-7 py-4 text-void transition-colors duration-300 hover:bg-accent disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Send message"}
                <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
              </MagneticButton>

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.p
                    key="sent"
                    className="label flex items-center gap-2 text-accent"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Received — I&apos;ll reply shortly
                  </motion.p>
                ) : null}
                {status === "error" && error ? (
                  <motion.p
                    key="error"
                    role="alert"
                    className="max-w-[40ch] text-sm text-muted"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
