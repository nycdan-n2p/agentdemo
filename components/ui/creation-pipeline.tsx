"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Globe,
  ListTree,
} from "lucide-react";

const STEPS = [
  {
    num: "1",
    title: "Tell us what to build",
    desc: "Describe your agent in plain English. No prompts, no config files",
    accent: "indigo" as const,
  },
  {
    num: "2",
    title: "AI locks in the details",
    desc: "Flex asks the right questions — tone, edge cases, integrations — so you don\u0027t have to think about it",
    accent: "indigo" as const,
  },
  {
    num: "3",
    title: "Ship it",
    desc: "Your agent gets a real phone number and goes live. Calls, chat, website — deployed",
    accent: "orange" as const,
  },
];

const DEPLOY_OPTIONS = [
  { icon: Phone, label: "Phone" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Globe, label: "Website" },
  { icon: ListTree, label: "IVR" },
];

export function CreationPipeline() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* Steps — та же сетка и отступы, что и у блока "Hear what your agent sounds like" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step, i) => {
          const isOrange = step.accent === "orange";
          const delay = i * 0.18;

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div
                className={`
                  relative flex flex-col items-center text-center
                  p-6 rounded-[20px] border-0 shadow-none
                  transition-all duration-300 min-h-[280px]
                  ${
                    isOrange
                      ? "bg-[#f97316]/[0.06] hover:bg-[#f97316]/[0.1]"
                      : "bg-[#EFEFEF] hover:bg-[#EFEFEF]/80"
                  }
                `}
              >
                {/* Один чёрный кружок с цифрой внутри плашки */}
                <div className="flex justify-center mb-5 mt-2">
                  <span
                    className="w-14 h-14 rounded-[16px] bg-black text-white text-xl font-bold flex items-center justify-center tabular-nums transition-transform duration-300 group-hover:scale-110"
                  >
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className={`text-base font-semibold mb-1.5 transition-colors duration-300 ${
                    isOrange
                      ? "text-[#c2410c] group-hover:text-[#ea580c]"
                      : "text-foreground group-hover:text-primary/90"
                  }`}
                >
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-muted-foreground text-[13px] leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deploy options */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45, delay: 0.7 }}
        className="flex flex-col items-center gap-3 mt-10"
      >
        <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
          Deploy via
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {DEPLOY_OPTIONS.map(({ icon: DIcon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] bg-black border border-black text-white text-xs"
            >
              <DIcon className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
