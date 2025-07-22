export interface UserData {
  name: string;
  globalLevel: number;
  globalXP: number;
  questProgress: Record<string, QuestProgress>;
  eloRatings: Record<string, number>;
}

export interface QuestProgress {
  level: number;
  xp: number;
  problemsSolved: number;
  accuracy: number;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  theme: string;
}

export interface Problem {
  id: string;
  questId: string;
  difficulty: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  theme: string;
}

export interface AttemptResult {
  correct: boolean;
  xpGained: number;
  newElo: number;
  feedback: string;
}