import React from 'react';

interface UserBadgeProps {
  type: 'level' | 'xp' | 'user';
  value: string | number;
  className?: string;
}

const UserBadge: React.FC<UserBadgeProps> = ({ type, value, className = '' }) => {
  const getBadgeClasses = () => {
    switch (type) {
      case 'level':
        return 'bg-green-500 text-white';
      case 'xp':
        return 'bg-yellow-500 text-white';
      case 'user':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'level':
        return '🏆';
      case 'xp':
        return '⚡';
      case 'user':
        return '👤';
      default:
        return '';
    }
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium text-sm ${getBadgeClasses()} ${className}`}>
      <span>{getIcon()}</span>
      <span>
        {type === 'level' && `Level ${value}`}
        {type === 'xp' && `${value} XP`}
        {type === 'user' && value}
      </span>
    </div>
  );
};

export default UserBadge;