"use client";

import { motion } from "framer-motion";
import { ChipSelector } from "@/components/ui/ChipSelector";

interface Question {
  id: string;
  text: string;
  toolBadge?: string;
  options: { value: string; label: string; icon?: string }[];
}

interface Step3QuestionsProps {
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  onBack: () => void;
  onNext: () => void;
  intent: string;
  selectedTools: string[];
}

// Generate demo questions based on intent and tools
function getQuestions(intent: string, selectedTools: string[]): Question[] {
  const hasCalendar =
    selectedTools.some((t) =>
      t.toLowerCase().includes("calendar")
    ) || intent.toLowerCase().includes("schedule");
  const hasSheets = selectedTools.some((t) =>
    t.toLowerCase().includes("sheet")
  );

  const questions: Question[] = [];

  if (hasCalendar) {
    questions.push({
      id: "duration",
      text: "What is the standard duration for an appointment?",
      toolBadge: "Calendar",
      options: [
        { value: "30 min", label: "30 min" },
        { value: "45 min", label: "45 min" },
        { value: "60 min", label: "60 min" },
        { value: "ai", label: "Let AI decide" },
      ],
    });
    questions.push({
      id: "appointment_types",
      text: "Which appointment types should the agent schedule?",
      toolBadge: "Calendar",
      options: [
        { value: "Initial consultation", label: "Initial consultation" },
        { value: "Follow-up", label: "Follow-up" },
        { value: "Telehealth", label: "Telehealth" },
        { value: "ai", label: "Let AI decide" },
      ],
    });
    questions.push({
      id: "confirmations",
      text: "How should clients receive confirmations?",
      toolBadge: "Calendar",
      options: [
        { value: "Email", label: "Email" },
        { value: "Calendar invite", label: "Calendar invite" },
        { value: "Both", label: "Both" },
        { value: "No confirmation needed", label: "No confirmation needed" },
        { value: "ai", label: "Let AI decide" },
      ],
    });
  }

  if (questions.length === 0 || hasSheets) {
    questions.push({
      id: "response_style",
      text: "How should the agent respond to inquiries?",
      toolBadge: hasSheets ? "Sheets" : undefined,
      options: [
        { value: "Professional and formal", label: "Professional and formal" },
        { value: "Friendly and casual", label: "Friendly and casual" },
        { value: "Concise and direct", label: "Concise and direct" },
        { value: "ai", label: "Let AI decide" },
      ],
    });
  }

  // Ensure we have at least 3 questions
  if (questions.length < 3) {
    const defaultQuestions: Question[] = [
      {
        id: "duration",
        text: "What is the standard duration for an appointment?",
        toolBadge: "Calendar",
        options: [
          { value: "30 min", label: "30 min" },
          { value: "45 min", label: "45 min" },
          { value: "60 min", label: "60 min" },
          { value: "ai", label: "Let AI decide" },
        ],
      },
      {
        id: "appointment_types",
        text: "Which appointment types should the agent schedule?",
        toolBadge: "Calendar",
        options: [
          { value: "Initial consultation", label: "Initial consultation" },
          { value: "Follow-up", label: "Follow-up" },
          { value: "Telehealth", label: "Telehealth" },
          { value: "ai", label: "Let AI decide" },
        ],
      },
      {
        id: "confirmations",
        text: "How should clients receive confirmations?",
        toolBadge: "Calendar",
        options: [
          { value: "Email", label: "Email" },
          { value: "Calendar invite", label: "Calendar invite" },
          { value: "Both", label: "Both" },
          { value: "No confirmation needed", label: "No confirmation needed" },
          { value: "ai", label: "Let AI decide" },
        ],
      },
    ];
    return defaultQuestions.slice(0, 3);
  }

  return questions.slice(0, 4);
}

export function Step3Questions({
  answers,
  onAnswersChange,
  onBack,
  onNext,
  intent,
  selectedTools,
}: Step3QuestionsProps) {
  const questions = getQuestions(intent, selectedTools);

  const updateAnswer = (id: string, value: string) => {
    onAnswersChange({ ...answers, [id]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Help your agent know your business
        </h2>
        <p className="mt-2 text-muted-foreground">
          Answer a few quick questions so your AI Agent handles tools like a real
          employee — no awkward questions to your customers
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{index + 1}.</span>
              <span className="text-foreground font-medium">{q.text}</span>
              {q.toolBadge && (
                <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">
                  {q.toolBadge}
                </span>
              )}
            </div>
            <ChipSelector
              options={q.options.map((o) => ({
                value: o.value,
                label: o.value === "ai" ? "Let AI decide" : o.label,
              }))}
              value={answers[q.id] || null}
              onChange={(v) => updateAnswer(q.id, v)}
            />
            <input
              type="text"
              placeholder="Or type your own answer..."
              value={
                q.options.some((o) => o.value === answers[q.id])
                  ? ""
                  : answers[q.id] || ""
              }
              onChange={(e) => updateAnswer(q.id, e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-gray-500 text-sm focus:outline-none focus:border-primary mt-2"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#EFEFEF] text-muted-foreground hover:bg-[#EFEFEF] hover:text-foreground font-medium"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}
