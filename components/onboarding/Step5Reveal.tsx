"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChatPreview } from "@/components/ui/ChatPreview";
import { IntegrationAuthModal } from "@/components/ui/IntegrationAuthModal";
import Image from "next/image";

const ALL_INTEGRATIONS = [
  "Gmail", "Google Calendar", "Google Sheets", "Google Contacts",
  "Salesforce", "Slack", "Outlook", "MS Calendar", "Excel", "MS Contacts", "Teams",
];

const ICON_PATHS: Record<string, string> = {
  Gmail: "/icons/gmail.svg",
  "Google Calendar": "/icons/google-calendar.svg",
  "Google Sheets": "/icons/google-sheets.svg",
  "Google Contacts": "/icons/google-contacts.svg",
  Salesforce: "/icons/salesforce.svg",
  Slack: "/icons/slack.svg",
  Outlook: "/icons/outlook.svg",
  "MS Calendar": "/icons/ms-calendar.svg",
  Excel: "/icons/excel.svg",
  "MS Contacts": "/icons/ms-contacts.svg",
  Teams: "/icons/teams.svg",
};

interface Step5RevealProps {
  companyName: string;
  intent: string;
  selectedTools: string[];
  onToolsChange?: (tools: string[]) => void;
  onRefineClick?: () => void;
}

const LOADING_MESSAGES = [
  "Analyzing your business requirements...",
  "Configuring your AI Agent personality...",
  "Connecting your tools...",
  "Generating conversation flows...",
  "Assigning your phone number...",
  "Running final checks...",
];

const PHONE_NUMBER = "+1 (551) 360-6500";

function getSampleMessages(intent: string): { role: "user" | "agent"; content: string }[] {
  const lower = intent.toLowerCase();
  if (lower.includes("schedule") || lower.includes("meeting")) {
    return [
      { role: "user", content: "Hi, I'd like to schedule a consultation for next week." },
      {
        role: "agent",
        content: "I'd be happy to help! What day works best for you? I have openings on Tuesday and Thursday.",
      },
      { role: "user", content: "Thursday afternoon would work." },
      {
        role: "agent",
        content: "Perfect! I've booked you for Thursday at 2:00 PM. You'll receive a calendar invite shortly.",
      },
    ];
  }
  if (lower.includes("support") || lower.includes("customer")) {
    return [
      { role: "user", content: "I'm having trouble with my order #12345." },
      {
        role: "agent",
        content: "I'm sorry to hear that. Let me look that up. Can you tell me what issue you're experiencing?",
      },
      { role: "user", content: "It hasn't arrived yet and it's been a week." },
      {
        role: "agent",
        content: "I've escalated this to our support team. They'll reach out within 2 hours with tracking info.",
      },
    ];
  }
  return [
    { role: "user", content: "Hi, I have a question about your services." },
    {
      role: "agent",
      content: "Hello! I'd be glad to help. What would you like to know?",
    },
    { role: "user", content: "What are your business hours?" },
    {
      role: "agent",
      content: "We're available Monday through Friday, 9 AM to 6 PM EST. I can also take messages after hours!",
    },
  ];
}

export function Step5Reveal({
  companyName,
  intent,
  selectedTools,
  onToolsChange,
  onRefineClick,
}: Step5RevealProps) {
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAddMore, setShowAddMore] = useState(false);
  const [authTarget, setAuthTarget] = useState<string | null>(null);
  const [connectedTools, setConnectedTools] = useState<string[]>([]);

  const availableTools = ALL_INTEGRATIONS.filter((t) => !selectedTools.includes(t));

  const handleConnect = useCallback(() => {
    if (authTarget) {
      setConnectedTools((prev) => (prev.includes(authTarget) ? prev : [...prev, authTarget]));
    }
    setAuthTarget(null);
  }, [authTarget]);

  const handleAuthCancel = useCallback(() => {
    setAuthTarget(null);
  }, []);

  const handleAddSelection = useCallback(
    (tool: string) => {
      if (onToolsChange) onToolsChange([...selectedTools, tool]);
    },
    [onToolsChange, selectedTools]
  );

  useEffect(() => {
    if (phase !== "loading") return;

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          setPhase("reveal");
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          return 100;
        }
        return p + 2;
      });
    }, 80);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [phase]);

  const agentName = companyName ? `${companyName} AI Agent` : "Your AI Agent";
  const sampleMessages = getSampleMessages(intent);

  if (phase === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md"
        >
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingMessageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground"
            >
              {LOADING_MESSAGES[loadingMessageIndex]}
            </motion.p>
          </AnimatePresence>
          <div className="w-full h-1.5 bg-card rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium mb-4"
        >
          ✓ Your AI Agent is live
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground"
        >
          Meet your {companyName || "AI"} AI Agent
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-muted-foreground"
        >
          Chat with it, call it, or connect with net2phone Integrate to give it
          superpowers
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left - Chat preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChatPreview agentName={agentName} messages={sampleMessages} />
        </motion.div>

        {/* Right - Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF]"
          >
            <h3 className="font-semibold text-foreground mb-2">Call your agent</h3>
            <p className="text-2xl font-mono text-foreground mb-4">{PHONE_NUMBER}</p>
            <button className="w-full py-3 rounded-[16px] bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium">
              Call now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF]"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">Selected integrations</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Connect your selected tools</p>
              </div>
              {availableTools.length > 0 && (
                <button
                  onClick={() => setShowAddMore(!showAddMore)}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {showAddMore ? "Done" : "+ Add more"}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {selectedTools.length > 0 ? (
                selectedTools.map((tool) => {
                  const isConnected = connectedTools.includes(tool);
                  return (
                    <div
                      key={tool}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-[12px] bg-[#EDECEC] border-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {ICON_PATHS[tool] && (
                          <Image src={ICON_PATHS[tool]} alt={tool} width={20} height={20} className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="font-medium text-foreground text-sm truncate">{tool}</span>
                      </div>
                      {isConnected ? (
                        <span className="text-xs text-secondary font-medium flex-shrink-0">✓ Connected</span>
                      ) : (
                        <button
                          onClick={() => setAuthTarget(tool)}
                          className="text-xs font-medium text-primary hover:underline flex-shrink-0"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <span className="text-muted-foreground text-sm py-2">
                  No integrations selected. Add them from the previous step or below
                </span>
              )}
            </div>
            <AnimatePresence>
              {showAddMore && availableTools.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Select more to connect:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {availableTools.map((tool) => (
                        <button
                          key={tool}
                          onClick={() => handleAddSelection(tool)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[12px] bg-[#EDECEC] border-0 text-foreground text-xs hover:bg-[#E5E5E5] transition-colors"
                        >
                          {ICON_PATHS[tool] && (
                            <Image src={ICON_PATHS[tool]} alt={tool} width={14} height={14} className="w-3.5 h-3.5" />
                          )}
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {authTarget && (
              <IntegrationAuthModal
                integrationName={authTarget}
                onConnect={handleConnect}
                onCancel={handleAuthCancel}
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF]"
          >
            <h3 className="font-semibold text-foreground mb-2">
              Ready for the full experience?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sign up for net2phone to keep your agent permanently, add more
              integrations with net2phone Integrate, and build drag-and-drop
              workflow automations.
            </p>
            <button className="w-full py-3 rounded-[16px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Get started with net2phone →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Refine section */}
      <motion.details
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="group"
      >
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-muted-foreground list-none flex items-center gap-2">
          <span className="group-open:rotate-90 transition-transform">▶</span>
          Refine Your Agent
        </summary>
        <div className="mt-4 p-4 rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF]">
          <p className="text-sm text-muted-foreground">
            Want to tweak how your agent responds? You can adjust context
            settings in your dashboard
          </p>
          {onRefineClick && (
            <button
              onClick={onRefineClick}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Open refinement options →
            </button>
          )}
        </div>
      </motion.details>
    </motion.div>
  );
}
