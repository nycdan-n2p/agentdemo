"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChipSelector } from "@/components/ui/ChipSelector";

interface Step1IntentProps {
  intent: string;
  onIntentChange: (value: string) => void;
  onNext: () => void;
}

const USE_CASES = [
  { value: "Answer customer questions", label: "Answer customer questions" },
  { value: "Transfer calls", label: "Transfer calls" },
  { value: "Schedule meetings", label: "Schedule meetings" },
  { value: "Sales outreach", label: "Sales outreach" },
  { value: "Customer support", label: "Customer support" },
  { value: "Take messages", label: "Take messages" },
  { value: "After-hours support", label: "After-hours support" },
  { value: "Lead qualification", label: "Lead qualification" },
];

export function Step1Intent({ intent, onIntentChange, onNext }: Step1IntentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">What should your AI Agent do?</h2>
        <p className="mt-2 text-muted-foreground">
          Describe it in plain English — or pick a common use case below
        </p>
      </div>

      <div>
        <textarea
          ref={textareaRef}
          value={intent}
          onChange={(e) => onIntentChange(e.target.value)}
          placeholder="e.g. Answer customer questions about our products, schedule demos, and route urgent issues to the support team..."
          className="w-full h-32 px-4 py-3 rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
          rows={5}
        />
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-3">Or pick a common use case:</p>
        <ChipSelector
          options={USE_CASES}
          value={intent}
          onChange={onIntentChange}
          allowMultiple
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Next: Pick your tools →
        </button>
      </div>
    </motion.div>
  );
}
