import { Plus, Minus, X, Divide } from "lucide-react";

interface QuickActionsProps {
  onSelect: (question: string) => void;
}

const actions = [
  { label: "Addition", icon: Plus, question: "What is 245 + 378?" },
  { label: "Subtraction", icon: Minus, question: "What is 512 - 187?" },
  { label: "Multiplication", icon: X, question: "What is 24 × 15?" },
  { label: "Division", icon: Divide, question: "What is 144 ÷ 12?" },
];

const QuickActions = ({ onSelect }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 py-3">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onSelect(action.question)}
          className="inline-flex items-center gap-1.5 rounded-full bg-quick-action px-4 py-2 text-sm font-medium text-quick-action-foreground transition-colors hover:bg-quick-action-hover"
        >
          <action.icon className="h-3.5 w-3.5" />
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
