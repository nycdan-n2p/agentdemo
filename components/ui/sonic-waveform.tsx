"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Calendar,
  DollarSign,
  Headphones,
  FileText,
  Moon,
  ClipboardList,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/components/ui/mini-navbar";
import { cn } from "@/lib/utils";

const USE_CASE_CHIPS = [
  {
    label: "Answer customer questions",
    prompt: "I would like to create an agent that answers customer questions about our products and services.",
    icon: MessageCircle,
    iconColor: "text-foreground",
  },
  {
    label: "Transfer calls",
    prompt: "I would like to create an agent that transfers calls to the right department.",
    icon: Phone,
    iconColor: "text-foreground",
  },
  {
    label: "Schedule meetings",
    prompt: "I would like to create an agent that schedules meetings and sends calendar invites.",
    icon: Calendar,
    iconColor: "text-foreground",
  },
  {
    label: "Sales outreach",
    prompt: "I would like to create an agent for sales outreach and lead follow-up.",
    icon: DollarSign,
    iconColor: "text-foreground",
  },
  {
    label: "Customer support",
    prompt: "I would like to create a customer support agent that handles inquiries and tickets.",
    icon: Headphones,
    iconColor: "text-foreground",
  },
  {
    label: "Take messages",
    prompt: "I would like to create an agent that takes messages and forwards them to the team.",
    icon: FileText,
    iconColor: "text-foreground",
  },
  {
    label: "After-hours support",
    prompt: "I would like to create an agent for after-hours support when the team is unavailable.",
    icon: Moon,
    iconColor: "text-foreground",
  },
  {
    label: "Lead qualification",
    prompt: "I would like to create an agent for lead qualification and routing.",
    icon: ClipboardList,
    iconColor: "text-foreground",
  },
  {
    label: "Receptionist",
    prompt: "I would like to create a receptionist agent that answers calls, routes to departments, and takes messages.",
    icon: UserRound,
    iconColor: "text-foreground",
  },
];

export type SonicWaveformHeroProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  onPromptSubmit?: (value: string) => void;
};

// Warm orange/peach core with soft purple/lavender glow - matches reference
const WAVE_COLORS = [
  { r: 255, g: 200, b: 160 }, // warm peach
  { r: 255, g: 180, b: 140 }, // soft orange
  { r: 240, g: 170, b: 200 }, // peach-pink
  { r: 220, g: 180, b: 230 }, // soft lavender
  { r: 200, g: 170, b: 240 }, // pale purple
  { r: 255, g: 190, b: 170 }, // light apricot
];

const SonicWaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: 0.5, y: 0.5 };
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(248, 248, 248, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const segmentCount = 1200; // High density for perfectly smooth curves

      WAVE_COLORS.forEach((color, i) => {
        const progress = i / WAVE_COLORS.length;
        const offsetPhase = i * 0.6;
        const baseAmplitude = 65 + i * 18;
        const mouseInfluence = 1 + (mouse.y - 0.5) * 0.4;

        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Thin bright core with massive soft glow
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
        ctx.shadowBlur = 120 + i * 30;

        const lineWidth = 2.5 + i * 0.4;
        ctx.lineWidth = lineWidth;

        const alpha = 0.55 + progress * 0.15;
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;

        ctx.beginPath();
        for (let j = 0; j <= segmentCount; j++) {
          const t = j / segmentCount;
          const x = t * canvas.width;

          const distFromCenter = Math.abs(t - 0.5) * 2;
          const envelope = Math.pow(1 - distFromCenter, 1.8);

          // Multiple harmonics for natural audio-wave variation
          const wave1 = Math.sin(t * 10 * Math.PI + time * 1.2 + offsetPhase) * baseAmplitude;
          const wave2 = Math.sin(t * 14 * Math.PI + time * 0.8 + offsetPhase * 1.4) * baseAmplitude * 0.45;
          const wave3 = Math.sin(t * 6 * Math.PI + time * 0.5 + offsetPhase * 0.7) * baseAmplitude * 0.3;

          const mouseDistX = Math.abs(t - mouse.x);
          const mousePull = Math.max(0, 1 - mouseDistX * 2.5) * 10 * mouseInfluence;

          const y = cy + (wave1 + wave2 + wave3 + mousePull) * envelope;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Wide diffused glow pass
        ctx.shadowBlur = 200 + i * 40;
        ctx.lineWidth = lineWidth + 6;
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.06)`;
        ctx.stroke();

        ctx.restore();
      });

      // Soft center glow overlay
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.4);
      glowGrad.addColorStop(0, "rgba(255, 200, 180, 0.1)");
      glowGrad.addColorStop(0.5, "rgba(220, 190, 230, 0.04)");
      glowGrad.addColorStop(1, "rgba(248, 248, 248, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.025;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = event.clientY / window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full bg-background"
      aria-hidden
    />
  );
};

export function SonicWaveformHero({
  className,
  title = "Get your AI Agent live\nin under 4 minutes",
  subtitle = "Tell us what you need. We'll build a custom AI agent with a real phone number — answers calls, chats, and takes action 24/7",
  placeholder = "e.g. Answer customer questions, schedule demos, route urgent issues...",
  buttonText = "Build your agent",
  onPromptSubmit,
}: SonicWaveformHeroProps) {
  const [prompt, setPrompt] = useState("");
  const basePlaceholder = "I need an agent that";
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState(basePlaceholder);
  const suggestionsRef = useRef([
    " answers customer questions",
    " schedules appointments",
    " handles after-hours support",
    " qualifies leads",
    " takes messages",
    " transfers calls",
    " does sales outreach",
    " manages support tickets",
  ]);
  const typingStateRef = useRef({
    suggestionIndex: 0,
    charIndex: 0,
    deleting: false,
    running: true,
  });
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    typingStateRef.current.running = true;
    const typeSpeed = 70;
    const deleteSpeed = 40;
    const pauseAtEnd = 1200;
    const pauseBetween = 500;

    function schedule(fn: () => void, delay: number) {
      const id = window.setTimeout(fn, delay);
      timersRef.current.push(id);
    }

    function clearTimers() {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    }

    function step() {
      if (!typingStateRef.current.running) return;
      if (prompt !== "") {
        setAnimatedPlaceholder(basePlaceholder);
        schedule(step, 300);
        return;
      }

      const state = typingStateRef.current;
      const suggestions = suggestionsRef.current;
      const current = suggestions[state.suggestionIndex % suggestions.length] || "";

      if (!state.deleting) {
        const nextIndex = state.charIndex + 1;
        const next = current.slice(0, nextIndex);
        setAnimatedPlaceholder(basePlaceholder + next);
        state.charIndex = nextIndex;
        if (nextIndex >= current.length) {
          schedule(() => {
            state.deleting = true;
            step();
          }, pauseAtEnd);
        } else {
          schedule(step, typeSpeed);
        }
      } else {
        const nextIndex = Math.max(0, state.charIndex - 1);
        const next = current.slice(0, nextIndex);
        setAnimatedPlaceholder(basePlaceholder + next);
        state.charIndex = nextIndex;
        if (nextIndex <= 0) {
          state.deleting = false;
          state.suggestionIndex = (state.suggestionIndex + 1) % suggestions.length;
          schedule(step, pauseBetween);
        } else {
          schedule(step, deleteSpeed);
        }
      }
    }

    clearTimers();
    schedule(step, 400);
    const ref = typingStateRef;
    return () => {
      ref.current.running = false;
      clearTimers();
    };
  }, [prompt]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.4,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      className={cn(
        "relative min-h-screen w-full flex flex-col overflow-hidden",
        className
      )}
      aria-label="Hero"
    >
      <Navbar />
      <SonicWaveformCanvas />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center flex-1 text-center p-6 pt-24">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFEFEF] border border-[#EFEFEF] mb-6"
        >
          <span className="text-sm font-medium text-muted-foreground">
            Free Trial - No Credit Card Needed
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground whitespace-pre-line"
        >
          {title}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.form
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          onSubmit={(e) => {
            e.preventDefault();
            onPromptSubmit?.(prompt);
          }}
          className="w-full max-w-[720px] mx-auto"
        >
          <div className="relative overflow-hidden rounded-[20px] border border-[#E0E0E0] bg-[#EFEFEF] focus-within:outline-none focus-within:shadow-[inset_0_0_0_3px_rgba(0,0,0,1)] transition-shadow duration-150">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={prompt ? placeholder : animatedPlaceholder}
              rows={4}
              className="w-full h-28 sm:h-32 resize-none rounded-[20px] border-0 bg-transparent text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 px-4 py-4 pr-14"
            />
            <button
              type="submit"
              aria-label={buttonText}
              className="absolute right-3 bottom-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-3">Or pick common use cases:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {USE_CASE_CHIPS.map(({ label, prompt, icon: Icon, iconColor }, i) => (
                <motion.button
                  key={label}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.03 }}
                  onClick={() => setPrompt(prompt)}
                  style={{
                    border: 0,
                    borderWidth: 0,
                    outline: "none",
                    boxShadow: "none",
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                  className={cn(
                    "chip-no-stroke inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden",
                    "bg-[#EFEFEF] text-foreground text-sm font-medium",
                    "hover:bg-[#EAEAEA] transition-colors"
                  )}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", iconColor)} />
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
