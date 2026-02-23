"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, ImagePlus, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "agent";
  content: string;
}

interface ChatPreviewProps {
  agentName: string;
  messages: Message[];
}

export function ChatPreview({ agentName, messages: initialMessages }: ChatPreviewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const text = inputValue.trim();
      if (!text) return;
      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setInputValue("");
      // Демо-ответ агента
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            content: "Thanks for your message. How can I help you further?",
          },
        ]);
      }, 600);
    },
    [inputValue]
  );

  return (
    <div className="bg-[#EFEFEF] rounded-[20px] border border-[#EFEFEF] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E5E5E5] flex items-center gap-2">
        <span className="font-semibold text-foreground">{agentName}</span>
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-sm text-secondary">Online</span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4 min-h-[200px] max-h-[320px] overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.1, 0.5) }}
            className={cn(
              "text-sm",
              msg.role === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-[12px] bg-[#EDECEC] px-3 py-2 text-foreground"
                : "text-foreground"
            )}
          >
            {msg.content}
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#E5E5E5] flex items-center gap-2">
        <div className="flex-1 relative flex items-center rounded-[12px] border border-[#E5E5E5] bg-[#E5E5E5] focus-within:border-primary focus-within:outline-none">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className={cn(
              "w-full bg-transparent rounded-[12px] pl-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none min-w-0",
              inputValue.trim() ? "pr-12" : "pr-3"
            )}
          />
          {inputValue.trim() && (
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center hover:bg-black/90 transition-colors shrink-0"
              aria-label="Send"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
        <button
          type="button"
          className="p-2.5 rounded-[10px] bg-[#E0E0E0] border border-[#E0E0E0] hover:bg-[#D5D5D5] text-foreground flex items-center justify-center"
          aria-label="Voice message"
        >
          <Mic className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="p-2.5 rounded-[10px] bg-[#E0E0E0] border border-[#E0E0E0] hover:bg-[#D5D5D5] text-foreground flex items-center justify-center"
          aria-label="Attach image"
        >
          <ImagePlus className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </form>
    </div>
  );
}
