import { Bot, User, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "ai";
  content?: string;
  explanation?: string;
  steps?: string[];
  answer?: string;
  error?: string;
}

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 px-4 py-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-user-bubble text-user-bubble-foreground rounded-br-md"
            : "bg-ai-bubble text-ai-bubble-foreground rounded-bl-md border border-border"
        )}
      >
        {/* User message */}
        {isUser && <p className="text-sm leading-relaxed">{message.content}</p>}

        {/* AI error */}
        {!isUser && message.error && (
          <p className="text-sm text-destructive">{message.error}</p>
        )}

        {/* AI structured response */}
        {!isUser && !message.error && (
          <div className="space-y-3">
            {message.explanation && (
              <p className="text-sm leading-relaxed text-ai-bubble-foreground">
                {message.explanation.replace(/\*\*(.*?)\*\*/g, "$1")}
              </p>
            )}

            {message.steps && message.steps.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Steps
                </p>
                {message.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-step-accent">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            )}

            {message.answer && (
              <div className="flex items-center gap-2 rounded-lg bg-answer-highlight/10 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-answer-highlight" />
                <p className="text-sm font-semibold text-foreground">
                  {message.answer.replace(/\*\*(.*?)\*\*/g, "$1")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
