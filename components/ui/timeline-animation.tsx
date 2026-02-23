"use client";

import { motion, useInView } from "framer-motion";
import React from "react";

interface TimelineContentProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
  animationNum: number;
  customVariants: {
    visible: (i: number) => Record<string, unknown>;
    hidden: Record<string, unknown>;
  };
  timelineRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  children?: React.ReactNode;
}

export function TimelineContent({
  as: Component = "div",
  animationNum,
  customVariants,
  timelineRef,
  className,
  children,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef ?? { current: null }, {
    once: true,
    amount: 0.2,
  });

  const MotionEl =
    typeof Component === "string"
      ? motion.create(Component as "div")
      : motion.create(Component as React.ComponentType);

  return (
    <MotionEl
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants as React.ComponentProps<typeof motion.div>["variants"]}
      className={className}
    >
      {children}
    </MotionEl>
  );
}
