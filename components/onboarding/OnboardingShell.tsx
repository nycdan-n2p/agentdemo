"use client";

import React from "react";
import { Check } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CreditBadge } from "@/components/ui/CreditBadge";
import { ONBOARDING_CONTENT_CONTAINER, MAIN_HEADER_CONTAINER } from "@/lib/utils";

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
        <div className={`grid items-center h-full gap-4 ${MAIN_HEADER_CONTAINER}`} style={{ gridTemplateColumns: "1fr 720px 1fr" }}>
          {/* Left zone: logo */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-2 justify-self-start"
          >
            <span className="font-heading text-lg font-semibold text-white sm:text-xl">Flex</span>
            <span className="font-sans text-sm text-white/80 sm:text-base">by net2phone</span>
          </a>
          {/* Center zone: exactly 720px, stepper fills it edge-to-edge */}
          {showCreditBadge ? (
            <div />
          ) : (
            <div className="flex min-h-0 min-w-0 items-center overflow-hidden">
              <div
                data-stepper-track
                className="flex w-full items-center px-0"
              >
              {Array.from({ length: totalSteps }, (_, i) => {
                const step = i + 1;
                const isCompleted = step < currentStep;
                const isCurrent = step === currentStep;
                const nextStep = step + 1;
                const connectorIsCompletedPath = nextStep <= currentStep;
                const isLastStep = i === totalSteps - 1;
                return (
                  <React.Fragment key={step}>
                    <div
                      className={`relative flex h-6 w-6 shrink-0 flex-none items-center justify-center rounded-full transition-colors ${
                        isCompleted
                          ? "bg-white"
                          : isCurrent
                            ? "border-2 border-white bg-transparent"
                            : "border border-gray-400 bg-transparent"
                      }`}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {isCompleted ? (
                        <Check className="h-3 w-3 text-black" strokeWidth={2.5} />
                      ) : isCurrent ? (
                        <span className="text-xs font-medium text-white leading-none">{step}</span>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">{step}</span>
                      )}
                    </div>
                    {!isLastStep && (
                      <div
                        className={`relative h-0.5 min-w-1 flex-1 overflow-hidden rounded-full mx-0.5 ${
                          connectorIsCompletedPath ? "bg-white" : "bg-gray-400"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
              </div>
            </div>
          )}
          {/* Right zone: empty or CreditBadge */}
          {showCreditBadge ? (
            <div className="flex justify-end justify-self-end">
              <CreditBadge />
            </div>
          ) : (
            <div />
          )}
        </div>
      </header>

      <main className="py-12 bg-background">
        <div
          className={
            currentStep === 5
              ? "max-w-6xl mx-auto px-6"
              : ONBOARDING_CONTENT_CONTAINER
          }
        >
          {children}
        </div>
      </main>
    </div>
  );
}
