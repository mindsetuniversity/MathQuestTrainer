import React from 'react';
import { Quest, QuestProgress } from '../types';

interface QuestCardProps {
  quest: Quest;
  progress: QuestProgress;
  onClick: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, progress, onClick }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
          border: 'border-blue-300',
          text: 'text-blue-50'
        };
      case 'orange':
        return {
          bg: 'bg-gradient-to-br from-orange-500 to-orange-700',
          border: 'border-orange-300',
          text: 'text-orange-50'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-purple-500 to-purple-700',
          border: 'border-purple-300',
          text: 'text-purple-50'
        };
      case 'green':
        return {
          bg: 'bg-gradient-to-br from-green-500 to-green-700',
          border: 'border-green-300',
          text: 'text-green-50'
        };
      case 'yellow':
        return {
          bg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
          border: 'border-yellow-300',
          text: 'text-yellow-50'
        };
      case 'black':
        return {
          bg: 'bg-gradient-to-br from-gray-800 to-black',
          border: 'border-gray-600',
          text: 'text-gray-50'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-500 to-gray-700',
          border: 'border-gray-300',
          text: 'text-gray-50'
        };
    }
  };

  const colors = getColorClasses(quest.color);
  const progressPercentage = Math.min((progress.level - 1) / 7 * 100, 100);

  return (
    <div
      onClick={onClick}
      className={`${colors.bg} ${colors.text} p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border ${colors.border}`}
    >
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{quest.icon}</div>
        <h3 className="text-xl font-bold mb-2">{quest.name}</h3>
        <p className="text-sm opacity-90 mb-4">{quest.description}</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{progress.level}/8 Levels</span>
        </div>
        <div className="w-full bg-black bg-opacity-20 rounded-full h-3">
          <div
            className="bg-white bg-opacity-80 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4 text-sm">
        <span>XP: {progress.xp}</span>
        <span>Solved: {progress.problemsSolved}</span>
      </div>
      
      <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-y-[-1px]">
        Start Quest
      </button>
    </div>
  );
};

export default QuestCard;