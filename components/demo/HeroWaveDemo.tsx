import { HeroWave } from "@/components/ui/ai-input-hero";

export default function HeroWaveDemo() {
  return (
    <HeroWave
      title={"Get your AI Agent live\nin under 4 minutes"}
      subtitle="Tell us what you need. We'll build a custom AI agent with a real phone number."
      placeholder="e.g. Answer customer questions, schedule demos..."
      buttonText="Start Now"
      onPromptSubmit={(value) => console.log("Submitted:", value)}
    />
  );
}
