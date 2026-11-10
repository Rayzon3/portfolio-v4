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
    period: "Oct 2026 – Present",
    role: "Software Development Engineer II",
    company: "Byteridge",
    location: "Gurgaon",
    achievements: [
      "Own end-to-end React/TypeScript features for a production enterprise fintech platform, translating business requirements into responsive interfaces and coordinating development, review, QA, and production release.",
      "Designed a distributed import-processing system with Redis-backed concurrency control and worker-based execution, preventing uncontrolled Kubernetes pod spawning; reduced pod churn by 60% and improved processing throughput by 30% under peak load.",
      "Diagnosed and resolved production incidents across Kubernetes-based microservices using pod logs and runtime traces, identifying root causes and restoring service stability during live deployments.",
    ],
    tech: ["React", "TypeScript", "Redis", "Kubernetes", "Distributed Systems"],
  },
  {
    period: "June 2023 – Oct 2026",
    role: "Software Development Engineer",
    company: "Byteridge",
    location: "Gurgaon",
    achievements: [
      "Improved frontend performance across 3 production workflows using RTK Query, Redux, and React hooks, reducing unnecessary re-renders by 20% and improving payment and account-management interfaces.",
      "Built reusable components using React, TypeScript, Fluent UI, and Material UI, including forms, data grids, filters, validation, and loading/error states for complex financial workflows.",
      "Developed data-heavy interfaces with filtering, sorting, pagination, and virtualized rendering, maintaining responsive navigation across large operational datasets.",
      "Integrated React applications with REST APIs using RTK Query and React Query, implementing caching, request lifecycle handling, validation, and user-facing error feedback.",
      "Built and optimized Node.js/Express REST APIs supporting production workflows, improving average response times by 25%.",
    ],
    tech: ["React", "TypeScript", "RTK Query", "React Query", "Node.js", "Express"],
  },
  {
    period: "Feb 2023 – June 2023",
    role: "Software Development Engineer Intern",
    company: "Byteridge",
    location: "Gurgaon",
    achievements: [
      "Redesigned the UI of an internal tool using React.",
      "Built and optimized backend APIs using Node.js, Prisma, and PostgreSQL, reducing average response time by 40%.",
    ],
    tech: ["React", "Node.js", "Prisma", "PostgreSQL"],
  },
  {
    period: "Aug 2022 – Jan 2023",
    role: "Backend Developer Intern",
    company: "Zyvka",
    location: "Remote",
    achievements: [
      "Designed backend infrastructure using Node.js, Prisma, and PostgreSQL, providing a scalable and reliable system for web applications.",
      "Developed RESTful APIs to meet requirements, tested functionality, and optimized code.",
    ],
    tech: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"],
  },
];
