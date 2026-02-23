"use client";

import { motion } from "framer-motion";
import { IntegrationCard } from "@/components/ui/IntegrationCard";

interface Step2ToolsProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const INTEGRATIONS = [
  "Gmail",
  "Google Calendar",
  "Google Sheets",
  "Google Contacts",
  "Salesforce",
  "Slack",
  "Outlook",
  "MS Calendar",
  "Excel",
  "MS Contacts",
  "Teams",
];

export function Step2Tools({
  selectedTools,
  onToolsChange,
  onBack,
  onNext,
}: Step2ToolsProps) {
  const handleCardClick = (name: string) => {
    if (selectedTools.includes(name)) {
      onToolsChange(selectedTools.filter((t) => t !== name));
    } else {
      onToolsChange([...selectedTools, name]);
    }
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
        <h2 className="text-2xl font-bold text-foreground">Give your agent superpowers</h2>
        <p className="mt-2 text-muted-foreground">
          Select the tools it needs. You&apos;ll connect them after your agent is created
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((name) => (
          <IntegrationCard
            key={name}
            name={name}
            selected={selectedTools.includes(name)}
            onClick={() => handleCardClick(name)}
          />
        ))}
        <IntegrationCard
          name="More coming soon"
          selected={false}
          disabled
          onClick={() => {}}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Integrations are optional. You can skip this and add them later with
        net2phone Integrate
      </p>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#EFEFEF] text-muted-foreground hover:bg-[#EFEFEF] hover:text-foreground font-medium"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
