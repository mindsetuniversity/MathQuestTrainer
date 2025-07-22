import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { UserData, Problem } from '../types';
import { QUESTS } from '../data/quests';
import { getNextProblem, processAttempt } from '../utils/gameLogic';
import CoachBubble from '../components/CoachBubble';
import UserBadge from '../components/UserBadge';

interface TrainerPageProps {
  userData: UserData;
  questId: string;
  onBack: () => void;
  onUserDataUpdate: (userData: UserData) => void;
}

const TrainerPage: React.FC<TrainerPageProps> = ({
  userData,
  questId,
  onBack,
  onUserDataUpdate
}) => {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const quest = QUESTS.find(q => q.id === questId);
  const questProgress = userData.questProgress[questId];
  const currentElo = userData.eloRatings[questId];

  useEffect(() => {
    loadNextProblem();
  }, [questId]);

  const loadNextProblem = () => {
    try {
      const problem = getNextProblem(questId, currentElo);
      setCurrentProblem(problem);
      setUserAnswer('');
      setAttemptNumber(1);
      setFeedback('');
      setShowFeedback(false);
      setIsCorrect(false);
      setShowExplanation(false);
    } catch (error) {
      console.error('Error loading problem:', error);
      setFeedback('Oops! There seems to be a technical issue. Please try again!');
      setShowFeedback(true);
    }
  };

  const handleSubmit = () => {
    if (!currentProblem || !userAnswer.trim()) return;

    const { userData: newUserData, result } = processAttempt(
      userData,
      questId,
      currentProblem,
      userAnswer,
      attemptNumber
    );

    setFeedback(result.feedback);
    setShowFeedback(true);
    setIsCorrect(result.correct);

    onUserDataUpdate(newUserData);

    if (result.correct) {
      setShowExplanation(true);
      setTimeout(() => {
        loadNextProblem();
      }, 3000);
    } else if (attemptNumber < 3) {
      setAttemptNumber(attemptNumber + 1);
      setUserAnswer('');
    } else {
      setShowExplanation(true);
      setTimeout(() => {
        loadNextProblem();
      }, 4000);
    }
  };

  const handleOptionSelect = (option: string) => {
    setUserAnswer(option);
  };

  const getQuestThemeClasses = () => {
    if (!quest) return { bg: 'bg-gray-50', accent: 'from-gray-500 to-gray-700' };
    
    switch (quest.color) {
      case 'blue':
        return { bg: 'bg-blue-50', accent: 'from-blue-500 to-blue-700' };
      case 'orange':
        return { bg: 'bg-orange-50', accent: 'from-orange-500 to-orange-700' };
      case 'purple':
        return { bg: 'bg-purple-50', accent: 'from-purple-500 to-purple-700' };
      case 'green':
        return { bg: 'bg-green-50', accent: 'from-green-500 to-green-700' };
      case 'yellow':
        return { bg: 'bg-yellow-50', accent: 'from-yellow-500 to-yellow-600' };
      case 'black':
        return { bg: 'bg-gray-100', accent: 'from-gray-800 to-black' };
      default:
        return { bg: 'bg-gray-50', accent: 'from-gray-500 to-gray-700' };
    }
  };

  const themeClasses = getQuestThemeClasses();
  const progressPercentage = Math.min((questProgress.level - 1) / 7 * 100, 100);

  if (!currentProblem || !quest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your next challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Quests</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{quest.icon}</span>
                <h1 className="text-xl font-bold text-gray-800">{quest.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <UserBadge type="level" value={questProgress.level} />
              <div className="text-sm text-gray-600">
                Elo: <span className="font-medium">{Math.round(currentElo)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-600">Quest Progress</span>
              <span className="text-sm font-medium text-gray-600">Level {questProgress.level}/8</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${themeClasses.accent} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* Theme Context */}
          <div className="text-center mb-6">
            <p className="text-gray-600 italic mb-4">{currentProblem.theme}</p>
          </div>

          {/* Problem Statement */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 leading-relaxed">
              {currentProblem.question}
            </h2>
            
            <div className="text-sm text-gray-500 mb-4">
              Difficulty: {Math.round(currentProblem.difficulty)} • Attempt {attemptNumber}/3
            </div>
          </div>

          {/* Answer Interface */}
          <div className="mb-6">
            {currentProblem.options ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProblem.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      userAnswer === option
                        ? `border-blue-500 bg-blue-50 text-blue-700`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter your answer..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mb-6">
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className={`flex items-center gap-2 mx-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                userAnswer.trim()
                  ? `bg-gradient-to-r ${themeClasses.accent} text-white hover:shadow-lg transform hover:scale-105`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
              Submit Answer
            </button>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
              <h3 className="font-semibold mb-2 text-gray-800">Explanation:</h3>
              <p className="text-gray-700">{currentProblem.explanation}</p>
              <p className="text-sm text-gray-600 mt-2">
                {isCorrect ? 'Loading next challenge...' : 'Moving to next problem...'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Coach Bubble */}
      <CoachBubble message={feedback} isVisible={showFeedback} />
    </div>
  );
};

export default TrainerPage;