"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl?: string;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative w-full min-h-[160px] rounded-[20px] border border-[#EFEFEF] bg-[#EFEFEF] p-6",
        "shadow-none hover:shadow-none hover:border-primary/20 transition-all duration-200",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="w-11 h-11 rounded-[20px] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1.5 tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
