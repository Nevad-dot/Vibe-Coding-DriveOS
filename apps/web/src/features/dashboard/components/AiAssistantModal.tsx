"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, Plus, Trash2, MessageSquare } from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
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
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      title: "Diskusi Baru",
      messages: [],
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // ChatGPT-style auto-scroll to the bottom of message stream
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [activeSession?.messages, isThinking]);

  // Create New Chat Session
  const createNewSession = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: `Diskusi ${sessions.length + 1}`,
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setQuery("");
  };

  // Delete Chat Session
  const deleteSession = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      // If deleting the last session, reset it to empty
      setSessions([
        {
          id: `session-${Date.now()}`,
          title: "Diskusi Baru",
          messages: [],
        },
      ]);
      return;
    }

    const filtered = sessions.filter((s) => s.id !== idToDelete);
    setSessions(filtered);
    if (activeSessionId === idToDelete) {
      setActiveSessionId(filtered[0].id);
    }
  };

  const handlePromptClick = (promptText: string) => {
    executeSearch(promptText);
  };

  const executeSearch = (promptText: string) => {
    if (!promptText.trim() || !activeSession) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: promptText,
    };

    // Update current session title if it's the first message
    const isFirstMessage = activeSession.messages.length === 0;
    const updatedTitle = isFirstMessage
      ? promptText.length > 28
        ? `${promptText.substring(0, 26)}...`
        : promptText
      : activeSession.title;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: updatedTitle,
              messages: [...s.messages, userMsg],
            }
          : s
      )
    );

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

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, aiMsg] }
            : s
        )
      );
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="bg-surfaceLight-card border border-surfaceLight-border w-full max-w-[620px] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 relative overflow-hidden z-[10000]"
          >
            {/* Top Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#4B8E55]" strokeWidth={1.5} />
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
                type="button"
                onClick={onClose}
                className="text-textGray-tertiary hover:text-textGray-primary p-1.5 rounded-full hover:bg-surfaceLight-pearl transition-colors cursor-pointer"
                title="Close AI Assistant"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* ChatGPT Sessions History Bar & New Chat Button */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-surfaceLight-border select-none">
              <button
                type="button"
                onClick={createNewSession}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white text-[12px] font-medium inline-flex items-center gap-1.5 shadow-2xs hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>+ Chat Baru</span>
              </button>

              {sessions.map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <div
                    key={sess.id}
                    onClick={() => setActiveSessionId(sess.id)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-medium inline-flex items-center gap-2 cursor-pointer transition-all shrink-0 max-w-[170px] ${
                      isActive
                        ? "bg-surfaceLight-pearl text-textGray-display border border-surfaceLight-border shadow-2xs"
                        : "text-textGray-tertiary hover:text-textGray-primary hover:bg-surfaceLight-pearl/60"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 text-[#4B8E55]" strokeWidth={1.5} />
                    <span className="truncate">{sess.title}</span>
                    <button
                      type="button"
                      onClick={(e) => deleteSession(e, sess.id)}
                      className="text-textGray-muted hover:text-red-500 transition-colors p-0.5"
                      title="Hapus percakapan"
                    >
                      <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Conversation History / Preset Prompts View with ChatGPT Auto-Scroll */}
            <div
              ref={scrollContainerRef}
              className="flex flex-col gap-3 min-h-[220px] max-h-[340px] overflow-y-auto pr-1 scroll-smooth"
            >
              {activeSession.messages.length === 0 ? (
                // Preset Suggested Prompt Pills (Presented on EVERY New Chat Session)
                <div className="flex flex-col gap-3 my-auto pt-2">
                  <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
                    SARAN PERTANYAAN
                  </span>
                  {PRESET_PROMPTS.map((prompt, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left px-5 py-3.5 rounded-2xl border border-surfaceLight-border bg-surfaceLight-card text-[13.5px] text-textGray-primary hover:text-[#4B8E55] font-normal transition-all shadow-2xs hover:shadow-xs flex items-center justify-between group cursor-pointer"
                    >
                      <span>{prompt}</span>
                      <Send className="w-3.5 h-3.5 text-textGray-tertiary group-hover:text-[#4B8E55] transition-colors" strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              ) : (
                // Chat Message Stream
                <div className="flex flex-col gap-3">
                  {activeSession.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 text-[13.5px] ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-7 h-7 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-[#4B8E55]" strokeWidth={1.5} />
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white font-medium shadow-xs"
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
                      <div className="w-7 h-7 rounded-full bg-[#4B8E55]/15 text-[#4B8E55] flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-[#4B8E55] animate-pulse" strokeWidth={1.5} />
                      </div>
                      <span className="italic font-normal">AI sedang menganalisis data...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Interactive Query Form with Green Gradient Tanya Button */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3 pt-2 border-t border-surfaceLight-border">
              <input
                type="text"
                placeholder="Ketik pertanyaan Anda..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-surfaceLight-card border border-surfaceLight-border rounded-full px-5 py-2.5 text-[13.5px] text-textGray-primary placeholder-textGray-placeholder focus:outline-none focus:border-[#4B8E55] transition-colors font-normal"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white font-medium text-[13.5px] transition-opacity hover:opacity-90 shadow-sm shrink-0 cursor-pointer"
              >
                Tanya
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiAssistantModal;
