"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  startTime: number | null;
  completedTime?: string | null;
  isComplete?: boolean;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getPercentile(seconds: number): number {
  if (seconds <= 120) return 99;
  if (seconds <= 150) return 95;
  if (seconds <= 180) return 90;
  if (seconds <= 210) return 80;
  if (seconds <= 240) return 70;
  if (seconds <= 300) return 50;
  return 30;
}

export function Timer({
  startTime,
  completedTime,
  isComplete,
}: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      setElapsed(now - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  useEffect(() => {
    if (isComplete) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (isComplete && completedTime) {
    const pct = getPercentile(elapsed);

    return (
      <div className="flex items-center gap-3">
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={
            flash
              ? { scale: [1, 1.15, 1], opacity: 1 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.6 }}
          className="text-secondary font-bold text-xl font-mono tabular-nums"
        >
          {completedTime}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-xs text-secondary/80 font-medium"
        >
          You beat {pct}% of others
        </motion.span>
      </div>
    );
  }

  const TARGET_SECONDS = 240;
  const progress = Math.min(elapsed / TARGET_SECONDS, 1);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-baseline gap-1">
        <span className="font-mono font-bold text-2xl tabular-nums tracking-tight text-foreground">
          {formatTime(elapsed)}
        </span>
        <span className="font-mono text-sm tabular-nums text-muted-foreground">
          / 4:00
        </span>
      </div>
      <div className="hidden sm:flex flex-col items-start gap-0.5">
        <span className="text-[11px] text-muted-foreground leading-none">
          {progress < 1 ? "until your agent is live" : "your agent is ready!"}
        </span>
        <div className="w-16 h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
