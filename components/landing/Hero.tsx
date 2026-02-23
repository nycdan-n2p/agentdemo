"use client";

import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <BackgroundPaths>
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EFEFEF] border border-[#EFEFEF] text-sm text-muted-foreground">
            Powered by net2phone
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-foreground block">Build an AI Agent</span>
            <span className="gradient-text block mt-2">Ship it in 4 minutes</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl text-center leading-relaxed"
        >
          Describe what you need in plain English. Flex builds it, assigns a real
          phone number, and deploys — calls, chat, 24/7
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCTAClick}
          className="mt-10 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg flex items-center gap-2 animate-pulse-subtle transition-colors"
        >
          Build your agent
        </motion.button>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          No credit card required. Free to start
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: "→", label: "Real phone number" },
            { icon: "→", label: "Live in under 4 min" },
            { icon: "→", label: "Plugs into your stack" },
          ].map((feature, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EFEFEF] border border-[#EFEFEF] text-foreground text-sm"
            >
              {feature.label}
            </span>
          ))}
        </motion.div>
      </section>
    </BackgroundPaths>
  );
}
