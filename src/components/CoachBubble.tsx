import React from 'react';

interface CoachBubbleProps {
  message: string;
  isVisible: boolean;
}

const CoachBubble: React.FC<CoachBubbleProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 max-w-xs animate-bounce-gentle z-50">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-4 relative">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            🤖
          </div>
          <div>
            <div className="font-bold text-blue-700 text-sm mb-1">Mindful AI</div>
            <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-blue-200 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default CoachBubble;