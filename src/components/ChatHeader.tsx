import { Calculator } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight text-foreground">
            AI Math Tutor
          </h1>
          <p className="text-xs text-muted-foreground">
            Step-by-Step Learning Assistant
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
