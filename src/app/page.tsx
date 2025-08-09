import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header
        title="Rahul Bhardwaj"
        navItems={[
          { label: "Home", href: "#home" },
          { label: "Experience", href: "#experience" },
          // { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ]}
        logo="/images/lain.jpg"
      />

      <main className="text-white">
        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 pt-20"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="relative">
              {/* Background gradient overlay */}
              <div className="absolute inset-0" />
              <div className="relative z-10 space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="font-lora font-normal text-white">
                    Rahul Bhardwaj
                  </span>
                </h1>
                <p className="text-white/80 text-md max-w-2xl mx-auto leading-relaxed font-semibold">
                  Software Engineer crafting digital experiences!
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4 cursor-pointer">
                  {[
                    "React",
                    "TypeScript",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "Elixir",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="
                        px-4 py-2 
                        bg-emerald-500/20 
                        border border-emerald-500/30 
                        rounded-full 
                        text-emerald-400 
                        text-sm font-medium
                        transition-all duration-300
                        hover:bg-emerald-500/30
                        hover:scale-105
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 pt-8">
                  <a
                    href="https://github.com/Rayzon3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-12 h-12
                      bg-white/10 
                      hover:bg-emerald-500/20
                      border border-white/20
                      hover:border-emerald-500/30
                      rounded-xl
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-110
                      group
                    "
                    title="GitHub"
                  >
                    <svg
                      className="w-6 h-6 text-white/70 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>

                  <a
                    href="https://linkedin.com/in/rahulbhardwaj03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-12 h-12
                      bg-white/10 
                      hover:bg-emerald-500/20
                      border border-white/20
                      hover:border-emerald-500/30
                      rounded-xl
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-110
                      group
                    "
                    title="Linkedin"
                  >
                    <svg
                      className="w-6 h-6 text-white/70 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-12 h-12
                      bg-white/10 
                      hover:bg-emerald-500/20
                      border border-white/20
                      hover:border-emerald-500/30
                      rounded-xl
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-110
                      group
                    "
                    title="Resume"
                  >
                    <svg
                      className="w-6 h-6 text-white/70 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </a>

                  <a
                    href="mailto:rahul@example.com"
                    className="
                      w-12 h-12
                      bg-white/10 
                      hover:bg-emerald-500/20
                      border border-white/20
                      hover:border-emerald-500/30
                      rounded-xl
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-110
                      group
                    "
                    title="Email"
                  >
                    <svg
                      className="w-6 h-6 text-white/70 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="font-lora text-white font-normal">
                  Experience
                </span>
              </h2>
              <p className="font-inter text-sm font-semibold text-white/70 mt-3">
                Companies I&apos;ve had the pleasure to work with...
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative border-l border-emerald-500/30 pl-8">
              {[
                {
                  company: "Byteridge",
                  role: "Software Development Engineer",
                  period: "June 2023 – Present",
                  description:
                    "Developed scalable React and Node.js applications, optimized performance, integrated MapBox maps, and automated CI/CD with Docker and GitHub Actions.",
                },
                {
                  company: "Byteridge",
                  role: "Software Development Engineer Intern",
                  period: "Feb 2023 – June 2023",
                  description:
                    "Redesigned internal tool UI, built AR features with Flutter & ARCore, and created optimized APIs using Node.js, Prisma, and PostgreSQL.",
                },
                {
                  company: "Zyvka",
                  role: "Backend Developer Intern",
                  period: "Aug 2022 – Jan 2023",
                  description:
                    "Designed backend architecture with Node.js and Prisma, developed REST APIs, and deployed services on AWS EC2 with CI/CD pipelines.",
                },
              ].map((exp, idx) => (
                <div key={idx} className="mb-10 relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[10px] top-1 w-5 h-5 bg-emerald-500 border-4 border-gray-900 rounded-full shadow-lg"></div>

                  {/* Card */}
                  <div className="bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-black/40 transition-all duration-300">
                    <h3 className="text-2xl font-normal text-white">
                      {exp.role}
                    </h3>
                    <p className="text-emerald-400 font-lora font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-white/60">{exp.period}</p>
                    <p className="text-white/80 text-sm font-semibold mt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        {/* <section
          id="projects"
          className="min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h2>

                <div
                  className="
      inline-block
      relative
      bg-black/20 
      backdrop-blur-xl 
      border border-white/10 
      rounded-2xl 
      px-6 py-3
      shadow-lg
      transition-all duration-300 ease-out
      hover:bg-black/30
      hover:border-white/20
    "
                >
                  <div
                    className="
        absolute inset-0 
        bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10 
        rounded-2xl
      "
                  />
                  <p className="relative z-10 text-lg text-white/70 font-black max-w-2xl mx-auto">
                    A collection of things I&apos;ve built and contributed to
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <div
                  key={project}
                  className="
                    relative group
                    bg-black/20 
                    backdrop-blur-xl 
                    border border-white/10 
                    rounded-2xl 
                    p-6
                    shadow-xl
                    transition-all duration-300 ease-out
                    hover:bg-black/30
                    hover:border-white/20
                    hover:shadow-[0_8px_32px_rgba(0,255,0,0.1)]
                    hover:scale-105
                  "
                >
                  <div
                    className="
                    absolute inset-0 
                    bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10 
                    rounded-2xl 
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                  "
                  />

                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Project {project}
                    </h3>
                    <p className="text-white/70 text-sm">
                      Description of this amazing project and the technologies
                      used to build it.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/70">
                        React
                      </span>
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/70">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className=" font-lora text-white font-normal">
                  Let&apos;s Connect
                </span>
              </h2>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-white/80 text-sm font-semibold">
                  rahul.031119999@gmail.com
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
