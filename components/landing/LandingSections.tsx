"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Link2,
  Globe,
  Clock,
  Wrench,
} from "lucide-react";
import { IntegrationsSection } from "./IntegrationsSection";
import { TrustSection } from "./TrustSection";
import { AudioSamplesSection } from "./AudioSamplesSection";
import { BouncyCardsFeatures } from "@/components/ui/bounce-card-features";
import ClientFeedback from "@/components/ui/testimonial";
import { FeatureCard } from "@/components/ui/feature-card";
import { CreationPipeline } from "@/components/ui/creation-pipeline";

interface LandingSectionsProps {
  onCTAClick: () => void;
}

const FEATURES = [
  {
    icon: Globe,
    title: "Multilingual",
    description: "100+ languages out of the box",
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=900&auto=format&fit=crop",
  },
  {
    icon: Clock,
    title: "24/7",
    description: "Never off. Never missed. Every call answered",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop",
  },
  {
    icon: Wrench,
    title: "Native integrations",
    description: "Drag-and-drop flows via net2phone Integrate. No glue code",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900&auto=format&fit=crop",
  },
  {
    icon: Zap,
    title: "Zero code",
    description: "Just describe it. Flex handles the engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=900&auto=format&fit=crop",
  },
];

export function LandingSections({ onCTAClick }: LandingSectionsProps) {
  return (
    <div className="bg-background">
      {/* Audio Samples - right under hero */}
      <AudioSamplesSection />

      {/* Value Prop / Manifesto */}
      <section id="manifesto" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[1152px] w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-[40px] bg-black px-6 py-10 text-white sm:px-12 sm:py-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Zero setup. Zero code. Real results
            </h2>
            <p className="text-white/90 text-lg">
              Describe what you need. Flex builds the agent, wires up your
              integrations, and gives it a phone number. You&apos;re live
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases / Discover - Bouncy Cards */}
      <section id="discover" className="py-20 px-6 bg-card/30 scroll-mt-24">
        <div className="mx-auto w-full max-w-[1152px] px-4 lg:px-0">
          <BouncyCardsFeatures onCTAClick={onCTAClick} />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 overflow-hidden scroll-mt-24">
        <div className="mx-auto w-full max-w-[1152px] px-4 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Three steps. One agent. Fully deployed
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto whitespace-nowrap">
              From idea to live agent with a real phone number — no engineers required
            </p>
          </motion.div>

          {/* Animated pipeline visualization */}
          <CreationPipeline />
        </div>
      </section>

      {/* Integrations */}
      <IntegrationsSection onCTAClick={onCTAClick} />

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-card/30 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Enterprise power. Zero complexity
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature your team needs to handle calls and chats at scale — nothing you don&apos;t
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURES.map(({ icon: Icon, title, description, imageUrl }) => (
              <FeatureCard
                key={title}
                title={title}
                description={description}
                icon={Icon}
                imageUrl={imageUrl}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <TrustSection />

      {/* Testimonials */}
      <ClientFeedback />

      {/* CTA */}
      <section className="py-20 px-6 bg-black rounded-t-[40px]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Your agent is 4 minutes away
            </h2>
            <p className="text-neutral-300 mb-8">
              Describe what you need. Flex builds the agent, wires integrations,
              and deploys with a real phone number
            </p>
            <button
              onClick={() => {
                document.getElementById("agent-start")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-[20px] bg-white hover:bg-neutral-200 text-black font-semibold text-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Link2 className="w-5 h-5" />
              Get your AI Agent
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
