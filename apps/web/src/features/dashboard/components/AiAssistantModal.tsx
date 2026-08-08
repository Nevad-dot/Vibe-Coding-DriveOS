"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User } from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

const PRESET_PROMPTS = [
  "Berapa revenue bulan ini vs bulan lalu?",
  "Stok mana yang perlu direstock minggu ini?",
  "Sales consultant terbaik Q3?",
];

const AI_RESPONSES: Record<string, string> = {
  "Berapa revenue bulan ini vs bulan lalu?":
    "Revenue MTD bulan Juli 2026 mencapai Rp 42,8 Miliar, naik +12.4% dibandingkan bulan Juni (Rp 38.1 M). Segmen SUV & Supercar menyumbang 64% total revenue.",
  "Stok mana yang perlu direstock minggu ini?":
    "Model terlaris dengan stok kritis: BMW Seri 5 520i (tersisa 1 unit), Mercedes-Benz E 200 (tersisa 2 unit), dan Ferrari 296 GTB (indent 4 bulan). Disarankan segera mengajukan restock order 8 unit.",
  "Sales consultant terbaik Q3?":
    "Rendra Prasetya memimpin performa Q3 dengan 18 unit closed (Rp 68,4 M - 120% dari target), disusul Diva Anindya (15 unit - Rp 54,2 M).",
};

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handlePromptClick = (promptText: string) => {
    setQuery(promptText);
    executeSearch(promptText);
  };

  const executeSearch = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: promptText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsThinking(true);

    setTimeout(() => {
      const responseText =
        AI_RESPONSES[promptText] ||
        `Berdasarkan data bisnis DriveOS real-time: "${promptText}" memperlihatkan peningkatan performa sebesar +14.2% MoM dengan tingkat kepuasan pelanggan (CSAT) 4.6/5.`;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: responseText,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="bg-surfaceLight-card border border-surfaceLight-border w-full max-w-[540px] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 relative overflow-hidden"
          >
            {/* Top Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-brand/15 text-brand flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-brand" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[20px] font-display font-semibold text-textGray-display leading-snug">
                    AI Assistant
                  </h3>
                  <p className="text-[13.5px] text-textGray-tertiary font-normal">
                    Tanya apa saja tentang bisnis Anda.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-textGray-tertiary hover:text-textGray-primary p-1.5 rounded-full hover:bg-surfaceLight-pearl transition-colors"
                title="Close AI Assistant"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Conversation History / Preset Prompts View */}
            <div className="flex flex-col gap-3 min-h-[160px] max-h-[320px] overflow-y-auto pr-1">
              {messages.length === 0 ? (
                // Preset Suggested Prompt Pills matching Figma Mockup
                <div className="flex flex-col gap-3 my-auto pt-1">
                  {PRESET_PROMPTS.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, borderColor: "var(--border-brand)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left px-5 py-3.5 rounded-2xl border border-surfaceLight-border bg-surfaceLight-card text-[13.5px] text-textGray-primary hover:text-brand font-normal transition-all shadow-2xs hover:shadow-xs flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <Send className="w-3.5 h-3.5 text-textGray-tertiary group-hover:text-brand transition-colors" strokeWidth={1.5} />
                    </motion.button>
                  ))}
                </div>
              ) : (
                // Chat Message Stream
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 text-[13.5px] ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-7 h-7 rounded-full bg-brand/15 text-brand flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-brand" strokeWidth={1.5} />
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-brand text-white font-medium"
                            : "bg-surfaceLight-pearl border border-surfaceLight-border text-textGray-primary font-normal"
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === "user" && (
                        <div className="w-7 h-7 rounded-full bg-surfaceLight-pearl text-textGray-secondary border border-surfaceLight-border flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                  ))}

                  {isThinking && (
                    <div className="flex gap-3 text-[13.5px] items-center text-textGray-tertiary">
                      <div className="w-7 h-7 rounded-full bg-brand/15 text-brand flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-brand animate-pulse" strokeWidth={1.5} />
                      </div>
                      <span className="italic font-normal">AI sedang menganalisis data...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Interactive Query Form matching Figma Mockup */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3 pt-2 border-t border-surfaceLight-border">
              <input
                type="text"
                placeholder="Ketik pertanyaan Anda..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-surfaceLight-card border border-surfaceLight-border rounded-full px-5 py-2.5 text-[13.5px] text-textGray-primary placeholder-textGray-placeholder focus:outline-none focus:border-brand transition-colors font-normal"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-6 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-white font-medium text-[13.5px] transition-colors shadow-xs shrink-0"
              >
                Tanya
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiAssistantModal;
