/**
 * Site-wide content + contact info. Edit values here to update the whole site.
 */
export const site = {
  name: "Nik Farees",
  role: "Software Engineer",
  domain: "fareeslab.dev",
  url: "https://fareeslab.dev",

  heroCopy:
    "Building reliable backend systems, scalable web applications, and deployment-ready digital products with Laravel, Next.js, Docker, and modern engineering workflows.",

  // Small badges shown in the hero.
  badges: ["Laravel", "Next.js", "Docker", "MySQL", "Filament"],

  // Terminal typing effect lines (hero, right column).
  terminalLines: [
    "fareeslab.dev",
    "> building backend systems...",
    "> deploying web applications...",
    "> ready.",
  ],

  about:
    "Nik Farees is a Software Engineer focused on building practical, maintainable, and deployment-ready web applications. His work combines backend engineering, modern frontend frameworks, database-driven systems, Docker-based workflows, and production-focused problem solving.",

  aboutLead:
    "A backend-leaning engineer who ships maintainable, production-ready software.",

  // Experience highlights (kept short + realistic).
  experience: [
    {
      title: "Backend Application Development",
      detail:
        "Designing APIs, data models, and business logic for maintainable server-side systems with Laravel.",
    },
    {
      title: "DevOps & Deployment",
      detail:
        "Containerized, VPS-ready deployments with Docker and reproducible, automated workflows.",
    },
    {
      title: "Admin & Operational Systems",
      detail:
        "Internal dashboards and admin panels — built with Filament — that keep day-to-day operations running.",
    },
  ],

  contact: {
    email: "nfarees.faizal@gmail.com",
    github: "https://github.com/NikFarees",
    githubLabel: "github.com/NikFarees",
    linkedin: "https://www.linkedin.com/in/nikfarees/",
    linkedinLabel: "linkedin.com/in/nikfarees",
    phone: "+601175112905",
    phoneLabel: "+60 11-7511 2905",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
