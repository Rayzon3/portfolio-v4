"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeaderProps {
  logo?: string;
  title?: string;
  navItems?: { label: string; href: string; active?: boolean }[];
  className?: string;
}

export default function Header({
  logo,
  title = "Rahul Bhardwaj",
  navItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  className = "",
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Header glass effect on scroll
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();

    // Observe which section is in view
    const sectionIds = navItems
      .filter((i) => i.href.startsWith("#"))
      .map((i) => i.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section whose center hits the viewport band
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Create a middle “band” so the active state changes when the
        // section’s center-ish area crosses it (feels snappier than thresholds)
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.01,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [navItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // If it's a hash link (section navigation)
    if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);

      if (element) {
        // Calculate offset to account for fixed header
        const headerHeight = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update active section immediately for better UX
        setActiveSection(sectionId);
      }
    } else {
      // For external links, navigate normally
      window.location.href = href;
    }
  };

  // Determine if nav item should be active based on current section
  const isNavItemActive = (navItem: {
    label: string;
    href: string;
    active?: boolean;
  }) => {
    if (navItem.href.startsWith("#")) {
      const sectionId = navItem.href.substring(1);
      return activeSection === sectionId;
    }
    return navItem.active || false;
  };

  return (
    <header
      className={`
        fixed top-4 left-4 right-4 z-50 
        transition-all duration-300 ease-out rounded-full
        ${scrolled ? "backdrop-blur-xl" : "backdrop-blur-lg"}
        ${className}
      `}
    >
      <nav
        className="
        relative
        bg-black/20 
        backdrop-blur-xl 
        border border-white/10 
        rounded-full 
        px-6 py-3
        shadow-2xl
        transition-all duration-300 ease-out
        hover:bg-black/30
        hover:border-white/20
        hover:shadow-[0_8px_32px_rgba(0,255,0,0.1)]
        group
      "
      >
        {/* Background gradient overlay */}
        <div
          className="
          absolute inset-0 
          bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 
          rounded-full 
          opacity-50
        "
        />

        <div className="relative flex items-center justify-between">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3 group">
            {logo ? (
              <Image
                src={logo}
                alt="logo"
                className="rounded-full z-10"
                width={42}
                height={32}
              />
            ) : (
              <div
                className="
                w-8 h-8 
                bg-gradient-to-br from-emerald-400 to-emerald-600 
                rounded-lg 
                flex items-center justify-center
                transition-all duration-300
                group-hover:scale-110
                group-hover:shadow-lg
                group-hover:shadow-emerald-500/25
              "
              >
                <svg
                  className="w-5 h-5 text-white"
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
            )}
            <span
              className="
              text-white/90 
              font-medium 
              text-lg 
              tracking-tight
              transition-colors duration-300
              group-hover:text-white
            "
            >
              {title}
            </span>
          </div>

          {/* Now Playing (center) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div
              className="
      relative inline-flex items-center gap-3
      px-4 py-2 rounded-full
      bg-white/10 backdrop-blur-xl border border-white/10
      text-white/80 text-sm
      shadow-lg hover:bg-white/15 transition
    "
              aria-label="Now playing"
            >
              {/* Equalizer */}
              <div className="flex items-end gap-[3px] h-4">
                <span className="eq-bar" style={{ animationDelay: "0ms" }} />
                <span className="eq-bar" style={{ animationDelay: "120ms" }} />
                <span className="eq-bar" style={{ animationDelay: "240ms" }} />
                <span className="eq-bar" style={{ animationDelay: "360ms" }} />
              </div>

              <svg
                className="w-4 h-4 opacity-80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6l12-2v13"
                />
                <circle cx="6" cy="18" r="3" strokeWidth="2" />
                <circle cx="18" cy="16" r="3" strokeWidth="2" />
              </svg>

              <span className="whitespace-nowrap">
                Listening to <span className="text-white">Drain You</span> –{" "}
                <span className="text-emerald-300">Nirvana</span>
              </span>

              {/* Soft glow */}
              <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/5 transition" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = isNavItemActive(item);

              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative px-4 py-2 
                    text-sm font-medium 
                    rounded-full 
                    transition-all duration-300 ease-out
                    hover:scale-105
                    cursor-pointer
                    ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                  aria-current={isNavItemActive(item) ? "page" : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="
                      absolute inset-0 
                      bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 
                      rounded-full 
                      blur-sm
                      transition-opacity duration-300
                    "
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Subtle glow effect */}
        <div
          className="
          absolute inset-0 
          rounded-full 
          bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent 
          opacity-0 
          transition-opacity duration-300
          group-hover:opacity-100
          pointer-events-none
        "
        />
      </nav>
    </header>
  );
}
