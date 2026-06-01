"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/data/site";
import { playQuack } from "@/utils/sounds";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

function PenguinWidget() {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 52" width="160" className="pointer-events-none mb-[-8px]">
        <defs>
          <path id="arch" d="M 8,46 Q 80,4 152,46" />
        </defs>
        <text
          style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: "18px", fill: "rgba(42,35,28,0.85)" }}
        >
          <textPath href="#arch" textAnchor="middle" startOffset="50%">
            try click me
          </textPath>
        </text>
      </svg>
      <motion.button
        type="button"
        aria-label="Quack!"
        onClick={playQuack}
        className="w-[100px] cursor-pointer"
        animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.88 }}
      >
        <Image
          src="/image/linux.png"
          alt="Linux Tux"
          width={100}
          height={120}
          className="h-auto w-full object-contain"
          priority={false}
        />
      </motion.button>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="01" label="About" />
        </Reveal>

        <div className="mt-8 grid items-stretch gap-12 lg:grid-cols-[1fr_180px]">
          {/* Col 1: title top, paragraph bottom */}
          <div className="flex flex-col justify-between gap-10">
            <Reveal>
              <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.025em] md:text-[38px]">
                {site.aboutLead}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                {site.about}
              </p>
            </Reveal>
          </div>

          {/* Col 2: penguin — right on desktop, centered below on mobile */}
          <Reveal delay={0.14}>
            <div className="flex items-end justify-center lg:justify-end">
              <PenguinWidget />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
