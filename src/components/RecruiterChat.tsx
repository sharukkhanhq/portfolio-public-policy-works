import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, HelpCircle, Loader2, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function RecruiterChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hello! I am Sharuk's automated **Big 4 Advisory Assistant**. 

I am fully grounded on Sharuk's professional resume, academic publications, and certifications (Harvard, McKinsey, Bloomberg). 

How can I help you evaluate his qualifications for your practice? Select a preset topic below or type your custom query.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    {
      label: "Government Advisory",
      query: "How does Sharuk's fellowship experience align with Big 4 Government & Public Sector (GPS) practices in India?",
    },
    {
      label: "ESG & Sustainability",
      query: "Detail Sharuk's credentials and hands-on projects related to ESG, circular economy, and waste management.",
    },
    {
      label: "PMO & Execution",
      query: "Give examples of how Sharuk has managed large-scale stakeholders and statewide programs (PMO experience).",
    },
    {
      label: "Analytical Rigor",
      query: "What evidence is there of Sharuk's financial modeling, quantitative analysis, and research capabilities?",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const newMessages = [...messages, { role: "user" as const, content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI server.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error connecting to the AI helper. Please ensure your `GEMINI_API_KEY` is configured in the secrets menu, and check if the dev server is fully running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hello! I am Sharuk's automated **Big 4 Advisory Assistant**. 

I am fully grounded on Sharuk's professional resume, academic publications, and certifications (Harvard, McKinsey, Bloomberg). 

How can I help you evaluate his qualifications for your practice? Select a preset topic below or type your custom query.`,
      },
    ]);
  };

  return (
    <div id="recruiter-chat-root" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[550px]">
      {/* Header */}
      <div className="bg-indigo-950 px-6 py-4 flex items-center justify-between" id="chat-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 text-indigo-300 rounded-lg border border-white/10">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              AI Recruiter Co-Pilot
            </h4>
            <span className="text-[10px] text-indigo-300 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Grounded on Sharuk's CV
            </span>
          </div>
        </div>
        <button
          onClick={clearChat}
          id="btn-clear-chat"
          title="Reset Chat"
          className="p-1.5 rounded border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all text-indigo-300"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 custom-scrollbar" id="chat-messages-box">
        {messages.map((m, idx) => {
          const isUser = m.role === "user";
          return (
            <div
              key={idx}
              id={`chat-bubble-${idx}`}
              className={`flex items-start gap-3.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isUser ? "bg-indigo-900 text-white" : "bg-slate-200 text-slate-700"}`}>
                {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div
                className={`p-4 rounded-xl text-sm leading-relaxed ${
                  isUser
                    ? "bg-indigo-900 text-white rounded-tr-none"
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap prose prose-sm prose-slate max-w-none">
                  {m.content}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3.5 mr-auto max-w-[85%]" id="chat-loading-bubble">
            <div className="p-2 rounded-lg shrink-0 bg-slate-200 text-slate-700">
              <Sparkles className="h-4 w-4 animate-spin text-indigo-500" />
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 rounded-tl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              Synthesizing response matching Big 4 criteria...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer input and Presets */}
      <div className="p-4 border-t border-slate-100 bg-white space-y-3" id="chat-input-panel">
        {/* Presets */}
        {messages.length === 1 && (
          <div className="space-y-1.5" id="chat-presets-panel">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 block pl-1 uppercase flex items-center gap-1">
              <HelpCircle className="h-3 w-3" /> Pick a topic to start
            </span>
            <div className="grid grid-cols-2 gap-2">
              {presetQuestions.map((pq) => (
                <button
                  key={pq.label}
                  id={`btn-preset-${pq.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleSend(pq.query)}
                  className="text-left px-3 py-2 rounded text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-950 border border-slate-200/80 hover:border-indigo-100 text-slate-700 font-medium transition-all"
                >
                  {pq.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2"
          id="chat-input-form"
        >
          <input
            type="text"
            id="chat-user-message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question (e.g. Tell me about his Excel / HBP scores...)"
            className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="submit"
            id="btn-send-message"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-100 text-white disabled:text-slate-300 rounded transition-all shadow-sm shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
