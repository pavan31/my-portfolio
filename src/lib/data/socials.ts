import { site } from "./site";

export type Social = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

export const socials: readonly Social[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "pavan-seshu-kumar",
    href: "https://linkedin.com/in/pavan-seshu-kumar",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "pavanseshukumar",
    href: "https://github.com/pavanseshukumar",
  },
  {
    id: "email",
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
  },
];
