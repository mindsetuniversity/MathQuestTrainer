import { UserData, Problem, AttemptResult } from '../types';
import { PROBLEM_BANK } from '../data/problems';

export const calculateEloChange = (userElo: number, problemDifficulty: number, correct: boolean): number => {
  const K = 50; // K-factor for rating change
  const expectedScore = 1 / (1 + Math.pow(10, (problemDifficulty - userElo) / 400));
  const actualScore = correct ? 1 : 0;
  return Math.round(K * (actualScore - expectedScore));
};

export const calculateXP = (attemptNumber: number, correct: boolean): number => {
  if (!correct) return 0;
  switch (attemptNumber) {
    case 1: return 2;
    case 2: return 1;
    default: return 0;
  }
};

export const getNextProblem = (questId: string, userElo: number): Problem => {
  const questProblems = PROBLEM_BANK.filter(p => p.questId === questId);
  if (questProblems.length === 0) {
    throw new Error(`No problems found for quest: ${questId}`);
  }

  // Target difficulty slightly above user's Elo for ~60% success rate
  const targetDifficulty = userElo + 50;
  
  // Find problems close to target difficulty
  const suitableProblems = questProblems.filter(p => 
    Math.abs(p.difficulty - targetDifficulty) <= 200
  );

  if (suitableProblems.length === 0) {
    // Fallback to any problem from the quest
    return questProblems[Math.floor(Math.random() * questProblems.length)];
  }

  // Select random problem from suitable ones
  return suitableProblems[Math.floor(Math.random() * suitableProblems.length)];
};

export const processAttempt = (
  userData: UserData,
  questId: string,
  problem: Problem,
  userAnswer: string,
  attemptNumber: number
): { userData: UserData; result: AttemptResult } => {
  const correct = userAnswer.toLowerCase().trim() === problem.correctAnswer.toLowerCase().trim();
  const eloChange = calculateEloChange(userData.eloRatings[questId], problem.difficulty, correct);
  const xpGained = calculateXP(attemptNumber, correct);
  
  const newElo = Math.max(100, userData.eloRatings[questId] + eloChange);
  const newUserData = { ...userData };
  
  // Update Elo rating
  newUserData.eloRatings[questId] = newElo;
  
  if (correct) {
    // Update quest progress
    newUserData.questProgress[questId].xp += xpGained;
    newUserData.questProgress[questId].problemsSolved += 1;
    
    // Update global XP
    newUserData.globalXP += xpGained;
    
    // Check for level ups
    const questProgress = newUserData.questProgress[questId];
    if (questProgress.xp >= questProgress.level * 100 && questProgress.level < 8) {
      questProgress.level += 1;
      questProgress.xp = questProgress.xp - (questProgress.level - 1) * 100;
    }
    
    // Check for global level up
    const requiredXP = newUserData.globalLevel * 100;
    if (newUserData.globalXP >= requiredXP) {
      newUserData.globalLevel += 1;
      newUserData.globalXP = newUserData.globalXP - requiredXP;
    }
  }
  
  // Update accuracy
  const questProgress = newUserData.questProgress[questId];
  const totalAttempts = questProgress.problemsSolved + (correct ? 0 : 1);
  questProgress.accuracy = totalAttempts > 0 ? (questProgress.problemsSolved / totalAttempts) * 100 : 0;
  
  const feedback = generateFeedback(correct, attemptNumber, eloChange);
  
  return {
    userData: newUserData,
    result: {
      correct,
      xpGained,
      newElo,
      feedback
    }
  };
};

const generateFeedback = (correct: boolean, attemptNumber: number, eloChange: number): string => {
  if (correct) {
    const messages = [
      "Excellent work! Your mathematical journey continues! ✨",
      "Fantastic! You're mastering these challenges! 🌟",
      "Brilliant thinking! Keep up the great work! 🎯",
      "Outstanding! Your skills are truly developing! 🏆",
      "Wonderful solution! You're becoming quite skilled! 💫"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else {
    if (attemptNumber === 1) {
      return "Not quite right, but don't give up! Try thinking about it differently. 🤔";
    } else if (attemptNumber === 2) {
      return "Still not there, but you're learning! One more try - you've got this! 💪";
    } else {
      return "This one was tricky! Let's review the solution and try a new problem. 📚";
    }
  }
};