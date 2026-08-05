"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, SendHorizontal, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Industrial AI Assistant. Ask me about AQI, temperature, gas levels, or safety recommendations.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // TODO: Replace with FastAPI + Gemini endpoint
    const aiReply: Message = {
      role: "assistant",
      content:
        "Current AQI is within the safe range. Continue normal industrial operations. No hazardous gas concentration detected.",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiReply]);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl"
    >
      <div className="border-b border-white/10 p-6">

        <div className="flex items-center gap-3">

          <Bot className="text-sky-400" />

          <div>

            <h2 className="text-xl font-bold text-white">
              AI Safety Assistant
            </h2>

            <p className="text-sm text-slate-400">
              Powered by Gemini AI
            </p>

          </div>

        </div>

      </div>

      <div className="h-[420px] space-y-4 overflow-y-auto p-6">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`flex max-w-[80%] gap-3 rounded-2xl p-4 ${
                message.role === "assistant"
                  ? "bg-slate-800"
                  : "bg-blue-600"
              }`}
            >

              {message.role === "assistant" ? (
                <Bot
                  size={20}
                  className="mt-1 text-sky-400"
                />
              ) : (
                <User
                  size={20}
                  className="mt-1"
                />
              )}

              <p className="leading-7 text-white">

                {message.content}

              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t border-white/10 p-5">

        <div className="flex gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask the AI Assistant..."
            className="flex-1 rounded-2xl border border-white/10 bg-slate-800 px-5 py-3 text-white outline-none focus:border-sky-500"
          />

          <button
            onClick={sendMessage}
            className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-5 text-white transition hover:scale-105"
          >

            <SendHorizontal />

          </button>

        </div>

      </div>

    </motion.div>
  );
}