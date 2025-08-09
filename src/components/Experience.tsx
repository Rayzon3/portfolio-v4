"use client";

type Exp = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tech: string[];
};

const EXPERIENCES: Exp[] = [
  {
    company: "Byteridge",
    role: "Software Development Engineer",
    period: "June 2023 – Present",
    location: "Gurgaon",
    points: [
      "Delivered end-to-end features as IC across multiple web apps.",
      "Refactored React bundles (−10%) → page loads +20%.",
      "State revamp with React Query + useReducer (−20% re-renders).",
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
    company: "Byteridge",
    role: "Software Development Engineer Intern",
    period: "Feb 2023 – June 2023",
    location: "Gurgaon",
    points: [
      "Redesigned internal tool UI in React.",
      "Optimized Node.js + PostgreSQL APIs (−40% response time).",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    company: "Zyvka",
    role: "Backend Developer Intern",
    period: "Aug 2022 – Jan 2023",
    location: "Remote",
    points: [
      "Designed scalable backend with Node.js, Prisma, PostgreSQL.",
      "Built & tested REST APIs; production hardening.",
      "AWS EC2 deployments with robust CI/CD.",
    ],
    tech: ["Node.js", "Prisma", "PostgreSQL", "AWS EC2", "GitHub Actions"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="font-lora text-white font-normal">Experience</span>
          </h2>
          <p className="font-inter text-xs sm:text-sm font-semibold text-white/70 mt-3">
            Companies I’ve had the pleasure to work with
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Left rail on mobile, centered rail on md+ */}
          <div
            aria-hidden="true"
            className="
              absolute top-0 bottom-0
              left-3 sm:left-4
              md:left-1/2 md:-translate-x-1/2
              w-px
              bg-gradient-to-b from-emerald-400/30 via-emerald-400/20 to-transparent
            "
          />

          <ol className="space-y-6 sm:space-y-8 md:space-y-10">
            {EXPERIENCES.map((exp, idx) => (
              <li
                key={idx}
                className="
                  relative
                  grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-10
                  items-start
                "
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-3 sm:left-4
                    md:left-1/2 md:-translate-x-1/2
                    translate-y-2
                    w-3 h-3 sm:w-3.5 sm:h-3.5
                    rounded-full bg-emerald-500 ring-4 ring-black
                    shadow-[0_0_0_3px_rgba(16,185,129,0.25)]
                  "
                />

                {/* Meta */}
                <div className="md:text-right md:pr-10 pl-8 sm:pl-10 md:pl-0">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 text-white/70 text-[11px] sm:text-xs font-inter">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 11h10M7 15h6"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 2v4M8 2v4"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{exp.period}</span>
                  </div>

                  <div className="mt-1 sm:mt-2 text-white text-lg sm:text-xl font-normal">
                    {exp.role}
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-emerald-400 font-lora font-medium">
                    {exp.company}
                  </div>

                  <div className="mt-0.5 sm:mt-1 inline-flex items-center gap-1.5 sm:gap-2 text-white/60 text-[11px] sm:text-xs">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 22s7-5.33 7-12a7 7 0 1 0-14 0c0 6.67 7 12 7 12Z"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="10" r="2" strokeWidth="2" />
                    </svg>
                    {exp.location}
                  </div>
                </div>

                {/* Card */}
                <div className="relative pl-8 sm:pl-10 md:pl-0">
                  <div
                    className="
                      relative bg-black/25 border border-white/10
                      rounded-xl sm:rounded-2xl p-4 sm:p-6
                      backdrop-blur-xl
                      hover:bg-black/35 hover:border-white/20
                      transition-colors
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10"
                    />

                    <div className="relative z-10 space-y-3 sm:space-y-4">
                      {/* Bullets */}
                      <ul className="list-disc marker:text-emerald-400/90 pl-4 sm:pl-5 text-[13px] sm:text-sm text-white/85 font-inter space-y-1.5 sm:space-y-2">
                        {exp.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="
                              inline-flex items-center gap-1
                              rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1
                              text-[11px] sm:text-xs font-medium
                              bg-emerald-400/10 text-emerald-300 border border-emerald-400/20
                            "
                          >
                            <svg
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <rect
                                x="4"
                                y="4"
                                width="16"
                                height="16"
                                rx="3"
                                strokeWidth="2"
                              />
                              <path d="M9 9h6v6H9z" strokeWidth="2" />
                            </svg>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
