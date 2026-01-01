export const profile = {
  name: "Rahul",
  title: "Software Engineer",
  location: "Gurgaon, India",
  email: "rahul.03111999@gmail.com",
};

export const tocItems = [
  { id: "hello", label: "## Hello, world!" },
  { id: "background", label: "## Background" },
  { id: "experience", label: "## Experience" },
  { id: "blog-projects", label: "## Blog & Projects" },
  { id: "contact", label: "## Contact" },
];

export const stackList = [
  "React",
  "Svelte",
  "PostgreSQL or SQLite",
  "Elixir",
  "Go",
  "Tailwind CSS",
];

export const experiences = [
  {
    period: "June 2023 – Present",
    role: "Software Development Engineer",
    company: "Byteridge",
    achievements: [
      "Delivered end-to-end features as IC across multiple web apps.",
      "Refactored React bundles (~10%) → page loads +20%.",
      "State revamp with React Query + useReducer (~20% re-renders).",
      "Node.js + Prisma APIs with <200ms p95 @ 1k+ daily concurrents.",
      "Serverless email scheduler (Lambda + EventBridge): 500+ mails/day.",
      "Next.js + MapBox geospatial filters for 200+ daily users.",
      "JWT-based RBAC across 5 microservices; passed security audits.",
      "CI/CD automation with Docker + GitHub Actions.",
    ],
    tech: [
      "React",
      "React Query",
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "AWS Lambda",
      "EventBridge",
      "MapBox",
      "Docker",
      "GitHub Actions",
      "JWT/RBAC",
    ],
  },
  {
    period: "Feb 2023 – June 2023",
    role: "Software Development Engineer Intern",
    company: "Byteridge",
    achievements: [
      "Redesigned internal tool UI in React.",
      "Optimized Node.js + PostgreSQL APIs (~40% response time).",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    period: "Aug 2022 – Jan 2023",
    role: "Backend Developer Intern",
    company: "Zvyka",
    achievements: [
      "Designed scalable backend with Node.js, Prisma, PostgreSQL.",
      "Built & tested REST APIs; production hardening.",
      "AWS EC2 deployments with robust CI/CD.",
    ],
    tech: [
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "AWS EC2",
      "GitHub Actions",
    ],
  },
];
