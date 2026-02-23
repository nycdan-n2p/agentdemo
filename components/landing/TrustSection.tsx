"use client";

import { motion } from "framer-motion";
import { Shield, Building2 } from "lucide-react";

export function TrustSection() {
  return (
    <section id="careers" className="py-10 px-0 scroll-mt-24">
      <div className="w-full rounded-[40px] bg-[#EDECEC] py-8 px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
            <span className="text-xl font-semibold text-foreground">
              net2phone
            </span>
            <span className="text-muted-foreground">×</span>
            <span className="text-xl font-semibold text-foreground">IDT</span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Built on 25+ years of telecom infrastructure from net2phone
            Production-grade from day one — not a wrapper on an API
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">Enterprise-grade uptime</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-sm">20+ years in telecom</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
