"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, navLinks } from "@/data/site";

/** Sticky glass nav. Background blur fades in once the page is scrolled. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-paper/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center">
        <Link
          href="/#top"
          className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          {site.name}
        </Link>

        <div className="ml-auto hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={`/${l.href}`}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="ml-auto rounded-[10px] bg-accent px-[15px] py-2 text-[13.5px] font-medium text-white shadow-primary transition-colors hover:bg-accent-dark md:ml-8"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
