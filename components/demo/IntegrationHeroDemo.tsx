import IntegrationHero from "@/components/ui/integration-hero";

export default function IntegrationHeroDemo() {
  return (
    <IntegrationHero onCTAClick={() => console.log("Get started clicked")} />
  );
}
