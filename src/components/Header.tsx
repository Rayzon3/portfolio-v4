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
    { label: "Contact", href: "#contact" },
  ],
  className = "",
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();

    const sectionIds = navItems
      .filter((i) => i.href.startsWith("#"))
      .map((i) => i.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id)
        ),
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
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
    if (href.startsWith("#")) {
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (el) {
        const headerHeight = 72; // tune as needed
        const pos =
          el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: pos, behavior: "smooth" });
        setActiveSection(id);
      }
    } else {
      window.location.href = href;
    }
  };

  const isNavItemActive = (n: {
    label: string;
    href: string;
    active?: boolean;
  }) =>
    n.href.startsWith("#") ? activeSection === n.href.substring(1) : !!n.active;

  return (
    <header
      className={`
        fixed top-2 sm:top-4 left-2 right-2 z-50
        transition-all duration-300 ease-out rounded-2xl sm:rounded-full
        ${scrolled ? "backdrop-blur-xl" : "backdrop-blur-lg"}
        ${className}
      `}
    >
      <nav
        className={`
          relative bg-black/30 sm:bg-black/20
          border border-white/10
          rounded-2xl sm:rounded-full
          px-3 sm:px-6 py-2.5 sm:py-3
          shadow-xl sm:shadow-2xl
          transition-all duration-300 ease-out
          hover:bg-black/40 sm:hover:bg-black/30
          hover:border-white/20
          group
        `}
        aria-label="Primary"
      >
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 rounded-2xl sm:rounded-full opacity-50" />

        {/* Layout:
            - Mobile: column (brand + toggle) -> now playing (full width) -> sheet
            - Desktop: grid: [brand] [centered now playing] [nav]
        */}
        <div className="relative flex flex-col gap-2 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center">
          {/* Brand + mobile toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {logo ? (
                <Image
                  src={logo}
                  alt="logo"
                  className="rounded-full z-10"
                  width={36}
                  height={36}
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg grid place-items-center">
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
              <span className="text-white/90 font-medium text-base sm:text-lg tracking-tight font-lora truncate max-w-[160px] sm:max-w-none">
                {title}
              </span>
            </div>

            <button
              className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white/90 active:scale-95 transition"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Now Playing - full width on mobile, perfectly centered on desktop */}
          <div className="w-full sm:w-full flex justify-center sm:col-start-2 sm:col-end-3">
            <div
              className="
                relative inline-flex items-center gap-3
                w-full sm:w-auto
                px-3 sm:px-4 py-2 rounded-full
                bg-white/10 backdrop-blur-xl border border-white/10
                text-white/80 text-xs sm:text-sm
                shadow-lg hover:bg-white/15 transition
              "
              aria-label="Now playing"
            >
              {/* Equalizer */}
              <div className="flex items-end gap-[3px] h-4 flex-shrink-0">
                <span className="eq-bar" style={{ animationDelay: "0ms" }} />
                <span className="eq-bar" style={{ animationDelay: "120ms" }} />
                <span className="eq-bar" style={{ animationDelay: "240ms" }} />
                <span className="eq-bar" style={{ animationDelay: "360ms" }} />
              </div>

              {/* Icon */}
              <svg
                className="w-4 h-4 opacity-80 flex-shrink-0"
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

              {/* Song text — expands on mobile; truncates only if necessary */}
              <span className="min-w-0 w-full sm:w-auto whitespace-nowrap overflow-hidden text-ellipsis">
                Listening to <span className="text-white">Drain You</span> –{" "}
                <span className="text-emerald-300">Nirvana</span>
              </span>

              {/* Soft glow */}
              <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/5 transition" />
            </div>
          </div>

          {/* Desktop nav (right) */}
          <div className="hidden sm:flex items-center justify-end space-x-1">
            {navItems.map((item, i) => {
              const isActive = isNavItemActive(item);
              return (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-full
                    transition-all duration-300 ease-out hover:scale-105 cursor-pointer
                    ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-full blur-sm" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile sheet */}
        <div
          className={`
            sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out
            ${open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/40 p-2">
            {navItems.map((item, i) => {
              const isActive = isNavItemActive(item);
              return (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative px-4 py-3 rounded-xl text-base font-medium
                    ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/15"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Soft glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-full bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </nav>
    </header>
  );
}
