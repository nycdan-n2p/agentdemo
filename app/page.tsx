"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SonicWaveformHero } from "@/components/ui/sonic-waveform";
import { LandingSections } from "@/components/landing/LandingSections";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { Step1Intent } from "@/components/onboarding/Step1Intent";
import { Step2Tools } from "@/components/onboarding/Step2Tools";
import { Step3Questions } from "@/components/onboarding/Step3Questions";
import { Step4Account } from "@/components/onboarding/Step4Account";
import { Step5Reveal } from "@/components/onboarding/Step5Reveal";

const TOTAL_STEPS = 5;

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [completedTime, setCompletedTime] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // State
  const [intent, setIntent] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [contextAnswers, setContextAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyWebsite: "",
    sendSms: false,
    phone: "",
  });

  const handlePromptSubmit = useCallback((value: string) => {
    setIntent(value);
    setTimerStartTime(Math.floor(Date.now() / 1000));
    setShowOnboarding(true);
    setCurrentStep(value.trim() ? 2 : 1);
  }, []);

  const handleStep4Submit = useCallback(() => {
    const elapsed = timerStartTime
      ? Math.floor(Date.now() / 1000) - timerStartTime
      : 0;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    setCompletedTime(`${mins}:${secs.toString().padStart(2, "0")}`);
    setCurrentStep(5);
    setIsComplete(true);
  }, [timerStartTime]);

  const companyName = (() => {
    const url = formData.companyWebsite?.trim();
    if (!url) return "";
    try {
      const normalized = url.startsWith("http") ? url : `https://${url}`;
      return new URL(normalized).hostname.replace("www.", "");
    } catch {
      return "";
    }
  })();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!showOnboarding ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <SonicWaveformHero
              title={"Get your AI Agent live\nin under 4 minutes"}
              subtitle="Tell us what you need. We'll build a custom AI agent with a real phone number — answers calls, chats, and takes action 24/7."
              placeholder="e.g. Answer customer questions, schedule demos, route urgent issues..."
              buttonText="Build your agent"
              onPromptSubmit={handlePromptSubmit}
            />
            <LandingSections
              onCTAClick={() => handlePromptSubmit("")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OnboardingShell
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              timerStartTime={timerStartTime}
              completedTime={completedTime}
              isComplete={isComplete}
              showCreditBadge={currentStep >= 5}
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1Intent
                    key="step1"
                    intent={intent}
                    onIntentChange={setIntent}
                    onNext={() => setCurrentStep(2)}
                  />
                )}
                {currentStep === 2 && (
                  <Step2Tools
                    key="step2"
                    selectedTools={selectedTools}
                    onToolsChange={setSelectedTools}
                    onBack={() => setCurrentStep(1)}
                    onNext={() => setCurrentStep(3)}
                  />
                )}
                {currentStep === 3 && (
                  <Step3Questions
                    key="step3"
                    answers={contextAnswers}
                    onAnswersChange={setContextAnswers}
                    onBack={() => setCurrentStep(2)}
                    onNext={() => setCurrentStep(4)}
                    intent={intent}
                    selectedTools={selectedTools}
                  />
                )}
                {currentStep === 4 && (
                  <Step4Account
                    key="step4"
                    formData={formData}
                    onFormChange={setFormData}
                    onBack={() => setCurrentStep(3)}
                    onSubmit={handleStep4Submit}
                  />
                )}
                {currentStep === 5 && (
                  <Step5Reveal
                    key="step5"
                    companyName={companyName}
                    intent={intent}
                    selectedTools={selectedTools}
                    onToolsChange={setSelectedTools}
                  />
                )}
              </AnimatePresence>
            </OnboardingShell>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
