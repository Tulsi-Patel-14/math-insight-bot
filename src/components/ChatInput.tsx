import { SendHorizonal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  prefill?: string;
}

const ChatInput = ({ onSend, prefill }: ChatInputProps) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = value.trim().length === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a math question (e.g., What is 8 × 7?)"
          className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleSend}
          disabled={isEmpty}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          aria-label="Send message"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
