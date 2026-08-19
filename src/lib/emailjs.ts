/**
 * Public EmailJS keys, inlined at build time. These are safe to ship — the
 * service is designed for browser use and is rate-limited per key.
 *
 * If any are missing the contact form degrades to a prefilled mailto: rather
 * than failing, so a fresh clone still has a working way to reach the inbox.
 */
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;

export const isEmailjsConfigured =
  emailjsConfig.serviceId !== "" &&
  emailjsConfig.templateId !== "" &&
  emailjsConfig.publicKey !== "";
