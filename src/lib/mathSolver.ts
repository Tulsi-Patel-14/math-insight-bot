export interface MathResponse {
  explanation: string;
  steps: string[];
  answer: string;
  error?: string;
}

export function solveMath(input: string): MathResponse {
  // Normalize unicode operators
  const normalized = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[^\d+\-*/.\s?=what is]/gi, "");

  // Extract numbers and operator
  const match = normalized.match(/([\d.]+)\s*([+\-*/])\s*([\d.]+)/);

  if (!match) {
    return {
      explanation: "",
      steps: [],
      answer: "",
      error: "Please enter a valid arithmetic question like \"What is 8 × 7?\"",
    };
  }

  const a = parseFloat(match[1]);
  const op = match[2];
  const b = parseFloat(match[3]);

  const opName: Record<string, string> = {
    "+": "Addition",
    "-": "Subtraction",
    "*": "Multiplication",
    "/": "Division",
  };

  const opSymbol: Record<string, string> = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
  };

  if (op === "/" && b === 0) {
    return {
      explanation: "",
      steps: [],
      answer: "",
      error: "Division by zero is undefined. Please try a different question.",
    };
  }

  let result: number;
  let steps: string[];
  const sym = opSymbol[op];

  switch (op) {
    case "+":
      result = a + b;
      steps = [
        `Identify the operation: ${a} ${sym} ${b}`,
        `Add the two numbers together`,
        `${a} ${sym} ${b} = ${result}`,
      ];
      break;
    case "-":
      result = a - b;
      steps = [
        `Identify the operation: ${a} ${sym} ${b}`,
        `Subtract ${b} from ${a}`,
        `${a} ${sym} ${b} = ${result}`,
      ];
      break;
    case "*":
      result = a * b;
      steps = [
        `Identify the operation: ${a} ${sym} ${b}`,
        `Multiply ${a} by ${b}`,
        `${a} ${sym} ${b} = ${result}`,
      ];
      break;
    case "/":
      result = parseFloat((a / b).toFixed(4));
      steps = [
        `Identify the operation: ${a} ${sym} ${b}`,
        `Divide ${a} by ${b}`,
        `${a} ${sym} ${b} = ${result}`,
      ];
      break;
    default:
      result = 0;
      steps = [];
  }

  return {
    explanation: `This is a **${opName[op]}** problem. We need to find the result of ${a} ${sym} ${b}.`,
    steps,
    answer: `${a} ${sym} ${b} = **${result}**`,
  };
}
