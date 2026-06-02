"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site, navLinks } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${scrolled
            ? "border-line bg-paper/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent"
          }`}
      >
        <div className="wrap flex h-16 items-center">
          {/* Logo */}
          <Link
            href="/#top"
            onClick={close}
            className="flex items-center gap-2.5 text-[20px] font-semibold tracking-tight"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span>Farees<span className="text-accent">Lab</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={`/${l.href}`}
                className="text-[17px] text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop contact button */}
          <Link
            href="/#contact"
            className="ml-8 hidden rounded-[10px] bg-accent px-[15px] py-2 text-[13.5px] font-medium text-white shadow-primary transition-colors hover:bg-accent-dark lg:block"
          >
            Contact
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[2px] w-5 rounded-full bg-ink"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="h-[2px] w-5 rounded-full bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[2px] w-5 rounded-full bg-ink"
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-30 bg-ink/20 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.2, 0.6, 0.2, 1] }}
              className="fixed inset-x-0 top-16 z-40 border-b border-line bg-paper/95 px-7 pb-6 pt-4 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={`/${l.href}`}
                    onClick={close}
                    className="rounded-lg px-3 py-3 text-[16px] font-medium text-ink-soft transition-colors hover:bg-accent-wash hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t border-line pt-4">
                <Link
                  href="/#contact"
                  onClick={close}
                  className="block w-full rounded-[10px] bg-accent px-[15px] py-3 text-center text-[14px] font-medium text-white shadow-primary transition-colors hover:bg-accent-dark"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
