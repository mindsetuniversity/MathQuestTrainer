import React, { useState, useEffect } from 'react';
import { loadUserData, saveUserData } from './utils/storage';
import { UserData } from './types';
import HomePage from './pages/HomePage';
import TrainerPage from './pages/TrainerPage';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'trainer'>('home');
  const [selectedQuestId, setSelectedQuestId] = useState<string>('');

  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
  }, []);

  useEffect(() => {
    if (userData) {
      saveUserData(userData);
    }
  }, [userData]);

  const handleQuestSelect = (questId: string) => {
    setSelectedQuestId(questId);
    setCurrentView('trainer');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedQuestId('');
  };

  const handleUserDataUpdate = (newUserData: UserData) => {
    setUserData(newUserData);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Math Quest Trainer</h1>
          <p className="text-gray-600">Preparing your adaptive learning experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === 'home' && (
        <HomePage
          userData={userData}
          onQuestSelect={handleQuestSelect}
        />
      )}
      
      {currentView === 'trainer' && selectedQuestId && (
        <TrainerPage
          userData={userData}
          questId={selectedQuestId}
          onBack={handleBackToHome}
          onUserDataUpdate={handleUserDataUpdate}
        />
      )}

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </>
  );
}

export default App;