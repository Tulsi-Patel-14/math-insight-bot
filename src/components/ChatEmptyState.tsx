import emptyStateImg from "@/assets/empty-state.png";

const ChatEmptyState = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <img
        src={emptyStateImg}
        alt="AI Math Tutor illustration"
        className="mb-6 h-40 w-40 object-contain opacity-90"
      />
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        Welcome to AI Math Tutor
      </h2>
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Start by asking any math problem. I will explain it step by step.
      </p>
    </div>
  );
};

export default ChatEmptyState;
