"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Calendar, Phone } from "lucide-react";
import { AudioSamplePlayer } from "@/components/ui/audio-sample-player";

const SAMPLES = [
  {
    id: "customer-service",
    title: "Customer Service Agent",
    description: "Resolves tickets, handles returns, answers FAQs — no hold music.",
    icon: Headphones,
    src: "/customer_service_demo.mp3",
  },
  {
    id: "booking",
    title: "Booking Agent",
    description: "Books appointments, checks availability, sends confirmations — on autopilot.",
    icon: Calendar,
    src: "/booking_agent_demo.mp3",
  },
  {
    id: "receptionist",
    title: "Receptionist Agent",
    description: "Picks up every call, routes to the right team, takes messages — never off the clock.",
    icon: Phone,
    src: "/receptionist_agent_demo.mp3",
  },
];

export function AudioSamplesSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[36px] font-bold leading-[1.2] text-[#111111] mb-4">
            Hear what your agent sounds like
          </h2>
          <p className="text-lg font-normal leading-[1.5] text-[#6B6B6B] max-w-2xl mx-auto">
            Real conversations. Real AI. These are Flex agents handling live
            scenarios — judge for yourself
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLES.map(({ id, title, description, icon: Icon, src }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col p-6 rounded-[20px] bg-[#EFEFEF] border-0 shadow-none transition-colors"
            >
              <div className="min-h-[132px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[20px] bg-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
              <AudioSamplePlayer
                src={src}
                title={title}
                isPlaying={playingId === id}
                onPlayRequest={() => setPlayingId(id)}
                onEnded={() => setPlayingId(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
