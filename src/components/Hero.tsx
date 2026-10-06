"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "./SocialLinks";
import { ScrollDownArrow } from "./ScrollDownArrow";

export function Hero({ showScrollArrow = true }: { showScrollArrow?: boolean }) {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.28, 0.15],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-purple-700/30 via-indigo-600/25 to-emerald-500/20 rounded-full blur-[100px] sm:blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.22, 0.1],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] bg-gradient-to-bl from-blue-600/25 via-emerald-600/20 to-purple-600/20 rounded-full blur-[90px] sm:blur-[120px]"
        />
      </div>

      <div className="flex flex-col items-center gap-7 sm:gap-8 -translate-y-4 sm:translate-y-0 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight select-none bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent hover:scale-[1.02] transition-transform duration-300"
        >
          deloskiyt
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <SocialLinks />
        </motion.div>
      </div>

      {showScrollArrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-6 sm:bottom-8 inset-x-0 mx-auto w-fit flex flex-col items-center z-20"
        >
          <ScrollDownArrow targetId="portfolio" />
        </motion.div>
      )}
    </section>
  );
}
