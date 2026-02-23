"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  name: string;
  icon?: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

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

export function IntegrationCard({
  name,
  selected,
  disabled,
  onClick,
}: IntegrationCardProps) {
  const iconPath = ICON_PATHS[name];

  return (
    <motion.button
      type="button"
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      className={cn(
        "relative p-4 rounded-[20px] border text-left transition-colors min-h-[100px] flex flex-col justify-center",
        selected
          ? "bg-primary/10 border-primary"
          : disabled
          ? "bg-[#EFEFEF]/50 border-[#EFEFEF] opacity-50 cursor-not-allowed"
          : "bg-[#EFEFEF] border-[#EFEFEF] hover:border-gray-600"
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
          ✓
        </span>
      )}
      {iconPath ? (
        <Image src={iconPath} alt={name} width={32} height={32} className="mb-2 w-8 h-8 object-contain" />
      ) : (
        <span className="text-2xl mb-2">🔌</span>
      )}
      <span className={cn("font-medium", disabled ? "text-muted-foreground" : "text-foreground")}>
        {name}
      </span>
    </motion.button>
  );
}
