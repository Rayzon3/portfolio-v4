"use client";

import { useState, useEffect, useRef } from "react";

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface SectionNavigatorProps {
  sections: Section[];
  className?: string;
}

const defaultSections: Section[] = [
  {
    id: "home",
    title: "Welcome",
    subtitle: "Software Engineer & Problem Solver",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
        />
      </svg>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Things I've built & contributed to",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    id: "about",
    title: "About",
    subtitle: "My journey & experiences",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Let's work together",
    icon: (
      <svg
        className="w-5 h-5"
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
    ),
  },
];

export default function SectionNavigator({
  sections = defaultSections,
  className = "",
}: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY < 100); // Hide when scrolled down

      // Find the active section based on scroll position
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      let currentSection = sections[0]?.id || "";

      for (const element of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentSection = element.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40
        transition-all duration-500 ease-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
        ${className}
      `}
    >
      <nav
        className="
        relative
        bg-black/20 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        p-2
        shadow-2xl
        transition-all duration-300 ease-out
        hover:bg-black/30
        hover:border-white/20
        hover:shadow-[0_8px_32px_rgba(0,255,0,0.1)]
        max-w-fit
      "
      >
        {/* Background gradient overlay */}
        <div
          className="
          absolute inset-0 
          bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 
          rounded-2xl 
          opacity-50
        "
        />

        <div className="relative flex items-center space-x-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  group relative flex items-center space-x-2 px-4 py-3
                  text-sm font-medium 
                  rounded-xl 
                  transition-all duration-300 ease-out
                  hover:scale-105
                  ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20 min-w-[140px]"
                      : "text-white/70 hover:text-white hover:bg-white/10 min-w-[48px]"
                  }
                `}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <div
                    className="
                    absolute inset-0 
                    bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 
                    rounded-xl 
                    blur-sm
                  "
                  />
                )}

                {/* Icon */}
                <div
                  className={`
                  relative z-10 flex-shrink-0 transition-all duration-300
                  ${
                    isActive
                      ? "text-emerald-400"
                      : "text-white/70 group-hover:text-white"
                  }
                `}
                >
                  {section.icon}
                </div>

                {/* Text content - slides in when active */}
                <div
                  className={`
                  relative z-10 overflow-hidden transition-all duration-300 ease-out
                  ${
                    isActive ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
                  }
                `}
                >
                  <div className="whitespace-nowrap">
                    <div className="font-medium">{section.title}</div>
                    {section.subtitle && (
                      <div className="text-xs text-white/50 -mt-0.5">
                        {section.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover indicator for inactive items */}
                {!isActive && (
                  <div
                    className="
                    absolute inset-0 
                    bg-white/5 
                    rounded-xl 
                    opacity-0 
                    transition-opacity duration-300
                    group-hover:opacity-100
                  "
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div
          className="
          absolute bottom-0 left-2 right-2 h-0.5 
          bg-white/10 rounded-full overflow-hidden
        "
        >
          <div
            className="
              h-full bg-gradient-to-r from-emerald-400 to-emerald-600 
              transition-all duration-300 ease-out
            "
            style={{
              width: `${
                ((sections.findIndex((s) => s.id === activeSection) + 1) /
                  sections.length) *
                100
              }%`,
            }}
          />
        </div>

        {/* Subtle animation glow */}
        <div
          className="
          absolute inset-0 
          rounded-2xl 
          bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent 
          opacity-0 
          transition-opacity duration-300
          group-hover:opacity-100
          pointer-events-none
        "
        />
      </nav>
    </div>
  );
}
