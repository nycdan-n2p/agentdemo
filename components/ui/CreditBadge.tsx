"use client";

import { useState } from "react";

export function CreditBadge() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFEFEF] border border-[#EFEFEF] text-sm text-muted-foreground hover:text-foreground"
      >
        500 free credits remaining
      </button>
      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-64 p-3 rounded-lg bg-[#EFEFEF] border border-[#EFEFEF] text-xs text-muted-foreground shadow-xl z-50">
          Credits are used when your agent handles real conversations. Standard
          chat = 2 credits. Voice call = 10 credits/min
        </div>
      )}
    </div>
  );
}
