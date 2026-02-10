import { useState, useRef, useEffect, useCallback } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatEmptyState from "@/components/ChatEmptyState";
import ChatMessage, { Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuickActions from "@/components/QuickActions";
import { solveMath } from "@/lib/mathSolver";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prefill, setPrefill] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const result = solveMath(text);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      ...(result.error
        ? { error: result.error }
        : {
            explanation: result.explanation,
            steps: result.steps,
            answer: result.answer,
          }),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setPrefill(undefined);
  };

  const handleQuickAction = (question: string) => {
    setPrefill(question);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen flex-col bg-background">
      <ChatHeader />

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col overflow-y-auto pt-[72px] pb-[130px] scrollbar-thin"
      >
        <div className="mx-auto w-full max-w-3xl">
          {isEmpty ? (
            <ChatEmptyState />
          ) : (
            <div className="py-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="fixed bottom-0 left-0 right-0 bg-card">
        <div className="mx-auto max-w-3xl">
          <QuickActions onSelect={handleQuickAction} />
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
            <ChatInputInline onSend={handleSend} prefill={prefill} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Inline version to avoid double fixed positioning */
import { SendHorizonal } from "lucide-react";

const ChatInputInline = ({
  onSend,
  prefill,
}: {
  onSend: (msg: string) => void;
  prefill?: string;
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefill) {
      setValue(prefill);
      inputRef.current?.focus();
    }
  }, [prefill]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Ask a math question (e.g., What is 8 × 7?)"
        className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        onClick={handleSend}
        disabled={value.trim().length === 0}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
        aria-label="Send message"
      >
        <SendHorizonal className="h-4 w-4" />
      </button>
    </>
  );
};

export default Index;
