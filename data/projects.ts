/**
 * Project data. Add a new object to this array and a card + detail page appear
 * automatically (the detail route is generated from `slug`).
 */
export type ProjectCategory = "Client Project" | "Personal Project";
export type Visibility = "Private" | "Public";

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string; // short, shown on the card
  overview: string; // longer, shown on the detail page
  role: string;
  contribution: string[]; // bullet points on the detail page
  stack: string[];
  visibility: Visibility;
  // Only set links for public projects. Private projects omit them entirely.
  links?: { github?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "client-project-one",
    category: "Client Project",
    title: "Client Project One",
    description:
      "A private client system with backend workflows, admin features, and database-driven operations.",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This project represents a private client system with backend workflows, admin features, and database-driven operations. The platform centralises operational data and gives the client's team a single, reliable place to manage their day-to-day work.",
    role: "Software Engineer",
    contribution: [
      "Designed and built the backend application and database schema.",
      "Implemented an admin panel for operational and content management.",
      "Containerised the stack with Docker for a reproducible VPS deployment.",
    ],
    stack: ["Laravel", "Filament", "Docker", "MySQL"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "personal-project-one",
    category: "Personal Project",
    title: "Personal Project One",
    description:
      "A personal software project that can include a public demo or GitHub link later.",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This project represents a personal software project that can include a public demo or GitHub link later. It is a space to explore ideas end-to-end, from backend services to a polished frontend.",
    role: "Software Engineer",
    contribution: [
      "Built the full stack from API to UI as a solo project.",
      "Set up a Docker-based local and production workflow.",
      "Structured the codebase to be easy to extend and open-source later.",
    ],
    stack: ["Next.js", "Laravel", "Docker"],
    visibility: "Public",
    // Placeholders — fill these in when the project is public.
    links: { github: "", live: "" },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);
