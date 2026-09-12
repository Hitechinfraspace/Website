import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, Send, Sparkles, X } from "lucide-react";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const geminiModel = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.6-flash";

const AIConsultant = ({ isOpen, onClose }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "ai",
      text: "Welcome to the Hi-Tech Intelligence Portal. How can I assist with your infrastructure requirements today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, aiLoading]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message || aiLoading) return;

    setUserInput("");
    setChatHistory((history) => [...history, { role: "user", text: message }]);
    setAiLoading(true);

    if (!apiKey) {
      setChatHistory((history) => [
        ...history,
        {
          role: "ai",
          text: "Gemini is not configured. Add VITE_GEMINI_API_KEY to .env and restart the Vite server.",
        },
      ]);
      setAiLoading(false);
      return;
    }

    try {
      const contents = [
        ...chatHistory
          .filter((entry) => !(entry.role === "ai" && entry === chatHistory[0]))
          .map((entry) => ({
            role: entry.role === "user" ? "user" : "model",
            parts: [{ text: entry.text }],
          })),
        { role: "user", parts: [{ text: message }] },
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [
                {
                  text: "You are the Hi-Tech Infraspace AI Consultant. Be professional, concise, and practical. Help with infrastructure, construction, government bids, and compliance questions.",
                },
              ],
            },
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Gemini API request failed");
      }

      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!answer) throw new Error("Gemini returned an empty response");
      setChatHistory((history) => [...history, { role: "ai", text: answer }]);
    } catch (error) {
      setChatHistory((history) => [
        ...history,
        { role: "ai", text: `Unable to reach Gemini: ${error.message}` },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="ai-chat-overlay fixed inset-0 z-[9999] flex items-start justify-end p-9 sm:p-6 bg-slate-950/45" onClick={onClose}>
      <div className="ai-chat-panel w-full sm:max-w-[440px] bg-white shadow-2xl h-[min(720px,calc(100dvh-24px))] sm:h-[min(720px,calc(100dvh-48px))] flex flex-col sm:rounded-2xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <div className="p-5 text-white flex justify-between items-center shrink-0" style={{ backgroundColor: "#117072" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Hi-Tech AI Consultant</h3>
              {/* <p className="text-[10px] opacity-75 font-bold uppercase tracking-[0.16em]">Gemini powered</p> */}
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close AI consultant" className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 md:p-5 space-y-4 bg-[#f4f8f8] chat-scroll-hide">
          <div className="text-center text-[10px] text-slate-400 uppercase tracking-[0.18em] font-bold pb-1">Ask about infrastructure, bids, or compliance</div>
          {chatHistory.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] p-3.5 text-sm leading-relaxed whitespace-pre-wrap ${message.role === "user" ? "bg-[#117072] text-white rounded-2xl rounded-br-sm shadow-md" : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-sm shadow-sm"}`}>
                {message.text}
              </div>
            </div>
          ))}
          {aiLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-sm shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          <div className="flex gap-2 items-end">
            <input
              type="text"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={aiLoading}
              placeholder="Ask your infrastructure question..."
              aria-label="Message for AI consultant"
              className="ai-chat-input flex-grow min-w-0 p-3.5 text-sm bg-slate-50 border border-slate-200 focus:border-[#117072] outline-none rounded-xl disabled:opacity-60"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!userInput.trim() || aiLoading}
              aria-label="Send message"
              className="ai-chat-send p-3.5 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#117072" }}
            >
              {aiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>
          <p className="mt-2 text-[10px] text-slate-400 text-center">Responses may need verification for project-specific decisions.</p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AIConsultant;
