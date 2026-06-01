"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line py-20 md:py-[78px]"
    >
      <div className="wrap">
        <Reveal>
          <SectionTag number="01" label="About" />
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal>
            <h2 className="text-[27px] font-medium leading-[1.18] tracking-[-0.02em]">
              {site.aboutLead}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[17px] leading-[1.66] text-ink-soft">
              {site.about}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Floating Linux penguin — desktop only */}
      <motion.div
        className="pointer-events-none absolute bottom-6 right-[6%] hidden w-[100px] lg:block"
        animate={{
          y: [0, -14, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/image/linux.png"
          alt="Linux Tux"
          width={100}
          height={120}
          className="h-auto w-full object-contain"
          priority={false}
        />
      </motion.div>
    </section>
  );
}
