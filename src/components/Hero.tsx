"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "./SocialLinks";
import { ScrollDownArrow } from "./ScrollDownArrow";

export function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center gap-6 sm:gap-7 -translate-y-4 sm:translate-y-0">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight select-none"
        >
          deloskiyt
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SocialLinks />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-6 sm:bottom-8 inset-x-0 mx-auto w-fit flex flex-col items-center z-20"
      >
        <ScrollDownArrow targetId="portfolio" />
      </motion.div>
    </section>
  );
}
