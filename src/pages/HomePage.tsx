import React from 'react';
import { UserData } from '../types';
import { QUESTS } from '../data/quests';
import QuestCard from '../components/QuestCard';
import UserBadge from '../components/UserBadge';

interface HomePageProps {
  userData: UserData;
  onQuestSelect: (questId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ userData, onQuestSelect }) => {
  const globalProgressPercentage = (userData.globalXP / (userData.globalLevel * 100)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Math Quest Trainer</h1>
            </div>
            <div className="flex items-center gap-4">
              <UserBadge type="level" value={userData.globalLevel} />
              <UserBadge type="xp" value={userData.globalXP} />
              <UserBadge type="user" value={userData.name} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Global Progress</span>
              <span className="text-sm font-medium text-gray-600">
                {userData.globalXP}/{userData.globalLevel * 100} XP
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${globalProgressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Mathematical Adventure</h2>
          <p className="text-gray-600">Each quest adapts to your skill level and helps you grow stronger!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUESTS.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              progress={userData.questProgress[quest.id]}
              onClick={() => onQuestSelect(quest.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Adaptive Learning at Work</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI adapts each problem to your skill level using advanced Elo rating system, 
            ensuring you're always challenged just right for optimal learning growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;