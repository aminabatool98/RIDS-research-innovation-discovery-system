import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Sprout } from "lucide-react";
import { sendChatMessage } from "../../api/chatApi";

const STARTERS = [
  "Show me SDG research",
  "Who researches food science?",
  "Upcoming events",
];

export const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm the RIDS assistant. Ask me about research, faculty, departments or events." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setMessages((m) => [...m, { sender: "user", text: trimmed }]);
    setInput("");
    setSending(true);
    try {
      const data = await sendChatMessage({ message: trimmed, sessionId });
      setSessionId(data.sessionId);
      setMessages((m) => [...m, { sender: "bot", text: data.reply, suggestions: data.suggestions }]);
    } catch {
      setMessages((m) => [...m, { sender: "bot", text: "Sorry, I couldn't reach the server just now." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[480px] max-h-[70vh] flex-col">
      <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
        <Sprout className="h-4 w-4 text-wheat" />
        <span className="font-display text-sm">RIDS Assistant</span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
              m.sender === "user" ? "ml-auto bg-wheat text-ink" : "bg-ink-line text-parchment/90"
            }`}
          >
            {m.text}
            {m.suggestions?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {m.suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onClose();
                      if (s.type === "research") navigate(`/research/${s.id}`);
                      else if (s.type === "faculty") navigate(`/faculty/${s.id}`);
                      else navigate(`/${s.type}s`);
                    }}
                    className="rounded-full border border-ink px-2 py-1 text-[11px] text-ink/80 hover:bg-ink/10"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {sending && (
          <div className="flex gap-1 px-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-parchment/40"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
      </div>

      {messages.length < 2 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-ink-line px-2.5 py-1 text-[11px] text-parchment/60 hover:border-wheat/40 hover:text-wheat"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-ink-line p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about research…"
          className="focus-ring flex-1 rounded-full border border-ink-line bg-ink px-3 py-2 text-sm text-parchment placeholder:text-parchment/40"
        />
        <button
          type="submit"
          disabled={sending}
          className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wheat text-ink disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
