"use client";

import IntegrationHero from "@/components/ui/integration-hero";

interface IntegrationsSectionProps {
  onCTAClick?: () => void;
}

export function IntegrationsSection({ onCTAClick }: IntegrationsSectionProps) {
  return <IntegrationHero onCTAClick={onCTAClick} />;
}
