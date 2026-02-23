"use client";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

interface OnboardingNavButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showNext?: boolean;
}

const backButtonClass =
  "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#EFEFEF] text-muted-foreground hover:bg-[#EFEFEF] hover:text-foreground font-medium transition-colors";
const nextButtonClass =
  "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors";

export function OnboardingNavButtons({
  onBack,
  onNext,
  nextLabel = "Next",
  showBack = true,
  showNext = true,
}: OnboardingNavButtonsProps) {
  const hasBack = showBack && onBack;
  const hasNext = showNext && onNext;
  const layoutClass = hasBack && hasNext
    ? "flex justify-between"
    : hasBack
      ? "flex justify-start"
      : "flex justify-end";

  return (
    <div className={layoutClass}>
      {hasBack ? (
        <button type="button" onClick={onBack} className={backButtonClass}>
          <ArrowIcon direction="left" className="w-4 h-4" />
          Back
        </button>
      ) : null}
      {hasNext ? (
        <button type="button" onClick={onNext} className={nextButtonClass}>
          {nextLabel}
          <ArrowIcon direction="right" className="w-4 h-4" />
        </button>
      ) : null}
    </div>
  );
}
