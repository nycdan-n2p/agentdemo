"use client";

import { Check } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CreditBadge } from "@/components/ui/CreditBadge";

interface OnboardingShellProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  timerStartTime?: number | null;
  completedTime?: string | null;
  isComplete?: boolean;
  showCreditBadge?: boolean;
}

export function OnboardingShell({
  children,
  currentStep,
  totalSteps,
  showCreditBadge = false,
}: OnboardingShellProps) {
  return (
    <div className="min-h-screen relative bg-background">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <header className="relative sticky top-0 z-40 h-14 border-b border-white/10 bg-black">
        <div className="flex items-center h-full px-4 sm:px-6 max-w-6xl mx-auto gap-6">
          {/* Logo — такой же, как на лендинге */}
          <a href="/" className="flex shrink-0 items-center gap-2">
            <span className="font-heading text-lg font-semibold text-white sm:text-xl">Flex</span>
            <span className="font-sans text-sm text-white/80 sm:text-base">by net2phone</span>
          </a>

          {/* Stepper */}
          {showCreditBadge ? (
            <div className="flex flex-1 justify-end">
              <CreditBadge />
            </div>
          ) : (
            <div className="flex flex-1 min-w-0 items-center">
              <div className="flex w-full items-center">
                {Array.from({ length: totalSteps }, (_, i) => {
                  const step = i + 1;
                  const isCompleted = step < currentStep;
                  const isCurrent = step === currentStep;
                  return (
                    <div key={step} className="flex flex-1 min-w-0 items-center">
                      <div
                        className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isCompleted
                            ? "bg-white"
                            : isCurrent
                              ? "border-2 border-white bg-transparent"
                              : "bg-white/20"
                        }`}
                        aria-current={isCurrent ? "step" : undefined}
                      >
                        {isCompleted ? (
                          <Check className="h-2.5 w-2.5 text-black" strokeWidth={2.5} />
                        ) : null}
                      </div>
                      {step < totalSteps && (
                        <div className="relative h-0.5 flex-1 min-w-1 mx-0.5 overflow-hidden rounded-full bg-white/20">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-white transition-all duration-300 ease-out"
                            style={{ width: isCompleted ? "100%" : "0%" }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <main
        className={`mx-auto px-6 py-12 bg-background ${
          currentStep === 5 ? "max-w-6xl" : "max-w-3xl"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
