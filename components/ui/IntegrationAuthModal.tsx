"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Provider = "google" | "microsoft" | "salesforce" | "slack";

interface ProviderConfig {
  provider: Provider;
  brandColor: string;
  signInLabel: string;
  logoUrl: string;
  fields: { id: string; label: string; placeholder: string }[];
}

const PROVIDER_MAP: Record<string, ProviderConfig> = {
  Gmail: {
    provider: "google",
    brandColor: "#4285F4",
    signInLabel: "Sign in with Google",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@gmail.com" },
    ],
  },
  "Google Calendar": {
    provider: "google",
    brandColor: "#4285F4",
    signInLabel: "Sign in with Google",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@gmail.com" },
    ],
  },
  "Google Sheets": {
    provider: "google",
    brandColor: "#4285F4",
    signInLabel: "Sign in with Google",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@gmail.com" },
    ],
  },
  "Google Contacts": {
    provider: "google",
    brandColor: "#4285F4",
    signInLabel: "Sign in with Google",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@gmail.com" },
    ],
  },
  Outlook: {
    provider: "microsoft",
    brandColor: "#00A4EF",
    signInLabel: "Sign in with Microsoft",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@outlook.com" },
    ],
  },
  "MS Calendar": {
    provider: "microsoft",
    brandColor: "#00A4EF",
    signInLabel: "Sign in with Microsoft",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@outlook.com" },
    ],
  },
  Excel: {
    provider: "microsoft",
    brandColor: "#00A4EF",
    signInLabel: "Sign in with Microsoft",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@outlook.com" },
    ],
  },
  "MS Contacts": {
    provider: "microsoft",
    brandColor: "#00A4EF",
    signInLabel: "Sign in with Microsoft",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@outlook.com" },
    ],
  },
  Teams: {
    provider: "microsoft",
    brandColor: "#00A4EF",
    signInLabel: "Sign in with Microsoft",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    fields: [
      { id: "email", label: "Email", placeholder: "you@outlook.com" },
    ],
  },
  Salesforce: {
    provider: "salesforce",
    brandColor: "#00A1E0",
    signInLabel: "Log in to Salesforce",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968914.png",
    fields: [
      { id: "instance", label: "Instance URL", placeholder: "https://yourcompany.salesforce.com" },
      { id: "email", label: "Email", placeholder: "you@company.com" },
    ],
  },
  Slack: {
    provider: "slack",
    brandColor: "#4A154B",
    signInLabel: "Add to Slack",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    fields: [
      { id: "workspace", label: "Workspace", placeholder: "your-team.slack.com" },
    ],
  },
};

type Phase = "form" | "connecting" | "success";

interface IntegrationAuthModalProps {
  integrationName: string;
  onConnect: () => void;
  onCancel: () => void;
}

export function IntegrationAuthModal({
  integrationName,
  onConnect,
  onCancel,
}: IntegrationAuthModalProps) {
  const config = PROVIDER_MAP[integrationName];
  const [phase, setPhase] = useState<Phase>("form");

  useEffect(() => {
    if (phase === "connecting") {
      const timer = setTimeout(() => setPhase("success"), 1500);
      return () => clearTimeout(timer);
    }
    if (phase === "success") {
      const timer = setTimeout(() => onConnect(), 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onConnect]);

  if (!config) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("connecting");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF] p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={config.logoUrl}
              alt=""
              className="w-8 h-8 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Connect {integrationName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {config.signInLabel}
              </p>
            </div>
          </div>

          {/* Body */}
          {phase === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {config.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFEFEF] border border-[#EFEFEF] text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              ))}

              <button
                type="submit"
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                )}
                style={{ backgroundColor: config.brandColor }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={config.logoUrl}
                  alt=""
                  className="w-4 h-4 object-contain brightness-0 invert"
                />
                {config.signInLabel}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground pt-1"
              >
                Cancel
              </button>
            </form>
          )}

          {phase === "connecting" && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                Connecting to {integrationName}...
              </p>
            </div>
          )}

          {phase === "success" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-sm text-foreground font-medium">
                {integrationName} connected
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
