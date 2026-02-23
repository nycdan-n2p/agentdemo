"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BouncyCardsFeaturesProps {
  onCTAClick?: () => void;
}

const CARDS = [
  {
    title: "Answer every question",
    gradient: "from-violet-500 to-indigo-600",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Book meetings on autopilot",
    gradient: "from-amber-500 to-orange-600",
    imageUrl:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "24/7 support, zero burnout",
    gradient: "from-emerald-500 to-teal-600",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Smart call routing",
    gradient: "from-pink-500 to-rose-600",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=900&auto=format&fit=crop",
  },
];

const BounceCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ scale: 0.98, rotate: "-1deg" }}
    className={cn(
      "group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[20px] bg-[#EFEFEF] border border-[#EFEFEF] p-8",
      className
    )}
  >
    {children}
  </motion.div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-center text-xl font-semibold text-foreground">{children}</h3>
);

type CardItem = (typeof CARDS)[number];

function BounceCardContent({ card }: { card: CardItem }) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-4 right-4 top-28 translate-y-8 overflow-hidden rounded-t-[20px] bg-gradient-to-br p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]",
        card.gradient
      )}
    >
      <Image
        src={card.imageUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-60"
      />
    </div>
  );
}

export function BouncyCardsFeatures({ onCTAClick }: BouncyCardsFeaturesProps) {
  return (
    <section className="w-full py-12 px-4 lg:px-0">
      <div className="mb-8 md:px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-lg whitespace-nowrap text-[36px] font-bold leading-[1.2] text-[#111111]">
            One agent.<span className="text-[#6B6B6B]"> Every use case</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCTAClick}
            className="shrink-0 whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground shadow-xl transition-colors hover:bg-primary/90"
          >
            Get started
          </motion.button>
        </div>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Inbound calls, scheduling, after-hours support, call routing — Flex
          agents handle the work so your team can focus
        </p>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>{CARDS[0].title}</CardTitle>
          <BounceCardContent card={CARDS[0]} />
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>{CARDS[1].title}</CardTitle>
          <BounceCardContent card={CARDS[1]} />
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>{CARDS[2].title}</CardTitle>
          <BounceCardContent card={CARDS[2]} />
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>{CARDS[3].title}</CardTitle>
          <BounceCardContent card={CARDS[3]} />
        </BounceCard>
      </div>
    </section>
  );
}
