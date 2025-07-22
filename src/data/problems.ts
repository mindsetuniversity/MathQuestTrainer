import { Problem } from '../types';

export const PROBLEM_BANK: Problem[] = [
  // Ocean of Operations - Arithmetic
  {
    id: 'ocean-1',
    questId: 'ocean-operations',
    difficulty: 800,
    question: 'Captain Marina has 147 pearls. She finds 89 more pearls in a sunken treasure chest. How many pearls does she have now?',
    correctAnswer: '236',
    explanation: '147 + 89 = 236 pearls',
    theme: 'A brave sea captain collecting treasures from the ocean depths.'
  },
  {
    id: 'ocean-2',
    questId: 'ocean-operations',
    difficulty: 1000,
    question: 'A school of fish has 324 members. If they split into groups of 12, how many groups are formed?',
    options: ['25', '27', '29', '31'],
    correctAnswer: '27',
    explanation: '324 ÷ 12 = 27 groups',
    theme: 'Fish swimming together in the coral reef.'
  },
  {
    id: 'ocean-3',
    questId: 'ocean-operations',
    difficulty: 1200,
    question: 'A submarine dives 45 meters below sea level, then rises 18 meters, then dives another 27 meters. What is its final depth?',
    correctAnswer: '54',
    explanation: 'Starting at 0: -45 + 18 - 27 = -54 meters (54 meters below sea level)',
    theme: 'Deep sea exploration in mysterious waters.'
  },

  // Algebraic Adventures - Algebra
  {
    id: 'algebra-1',
    questId: 'algebraic-adventures',
    difficulty: 900,
    question: 'In the Enchanted Forest, if x + 7 = 15, what magical number is x?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: 'x + 7 = 15, so x = 15 - 7 = 8',
    theme: 'A mystical quest through ancient trees.'
  },
  {
    id: 'algebra-2',
    questId: 'algebraic-adventures',
    difficulty: 1100,
    question: 'The wise oak tree says: "If 3y - 4 = 14, what is the value of y?"',
    correctAnswer: '6',
    explanation: '3y - 4 = 14, so 3y = 18, therefore y = 6',
    theme: 'Learning secrets from the ancient forest guardians.'
  },
  {
    id: 'algebra-3',
    questId: 'algebraic-adventures',
    difficulty: 1300,
    question: 'A forest sprite asks: "If 2(x + 3) = 16, what is x?"',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: '2(x + 3) = 16, so x + 3 = 8, therefore x = 5',
    theme: 'Magical creatures testing your wisdom.'
  },

  // Geometry Galaxy - Geometry
  {
    id: 'geometry-1',
    questId: 'geometry-galaxy',
    difficulty: 850,
    question: 'Commander Zara\'s spaceship has a triangular window. If two angles are 65° and 45°, what is the third angle?',
    correctAnswer: '70',
    explanation: 'Angles in a triangle sum to 180°. So 180° - 65° - 45° = 70°',
    theme: 'Navigating through the cosmic void in advanced spacecraft.'
  },
  {
    id: 'geometry-2',
    questId: 'geometry-galaxy',
    difficulty: 1050,
    question: 'A rectangular space station has length 15 light-units and width 8 light-units. What is its perimeter?',
    options: ['23', '46', '120', '240'],
    correctAnswer: '46',
    explanation: 'Perimeter = 2(length + width) = 2(15 + 8) = 46 light-units',
    theme: 'Massive structures floating in the depths of space.'
  },
  {
    id: 'geometry-3',
    questId: 'geometry-galaxy',
    difficulty: 1250,
    question: 'An asteroid has a circular cross-section with radius 12 km. What is its area? (Use π ≈ 3.14)',
    correctAnswer: '452.16',
    explanation: 'Area = πr² = 3.14 × 12² = 3.14 × 144 = 452.16 km²',
    theme: 'Dangerous space rocks drifting through the galaxy.'
  },

  // Measurement Mountain - Measurements
  {
    id: 'measurement-1',
    questId: 'measurement-mountain',
    difficulty: 800,
    question: 'Climber Alex hikes 2.5 kilometers up the mountain. How many meters is this?',
    options: ['25', '250', '2,500', '25,000'],
    correctAnswer: '2,500',
    explanation: '2.5 km = 2.5 × 1,000 = 2,500 meters',
    theme: 'Brave adventurers scaling towering peaks.'
  },
  {
    id: 'measurement-2',
    questId: 'measurement-mountain',
    difficulty: 1000,
    question: 'A mountain lake holds 450 liters of water. How many milliliters is this?',
    correctAnswer: '450000',
    explanation: '450 liters = 450 × 1,000 = 450,000 milliliters',
    theme: 'Crystal clear alpine waters reflecting the sky.'
  },
  {
    id: 'measurement-3',
    questId: 'measurement-mountain',
    difficulty: 1200,
    question: 'The temperature at the mountain base is 20°C. At the peak, it\'s -5°C. What is the temperature difference?',
    options: ['15°C', '25°C', '30°C', '35°C'],
    correctAnswer: '25°C',
    explanation: 'Difference = 20°C - (-5°C) = 20°C + 5°C = 25°C',
    theme: 'Extreme weather conditions at high altitude.'
  },

  // Data Discovery - Statistics
  {
    id: 'data-1',
    questId: 'data-discovery',
    difficulty: 900,
    question: 'Dr. Nova recorded test scores: 85, 92, 78, 96, 89. What is the mean score?',
    correctAnswer: '88',
    explanation: 'Mean = (85 + 92 + 78 + 96 + 89) ÷ 5 = 440 ÷ 5 = 88',
    theme: 'Scientific research in a high-tech laboratory.'
  },
  {
    id: 'data-2',
    questId: 'data-discovery',
    difficulty: 1100,
    question: 'In a survey of 100 students, 60 like pizza, 40 like burgers, and 25 like both. How many like neither?',
    options: ['15', '20', '25', '30'],
    correctAnswer: '25',
    explanation: 'Like at least one = 60 + 40 - 25 = 75. Like neither = 100 - 75 = 25',
    theme: 'Analyzing patterns in human behavior and preferences.'
  },
  {
    id: 'data-3',
    questId: 'data-discovery',
    difficulty: 1300,
    question: 'The median of 7, 12, x, 18, 23 is 15. What is x?',
    correctAnswer: '15',
    explanation: 'For 5 numbers, median is the middle value. So x = 15 to make the median 15.',
    theme: 'Decoding mysterious sequences and hidden patterns.'
  },

  // Temple of Mastery - Mixed Challenge
  {
    id: 'temple-1',
    questId: 'temple-mastery',
    difficulty: 1400,
    question: 'Ancient riddle: If 2^x = 16, what power does x hold?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '2^4 = 16, so x = 4',
    theme: 'Ancient wisdom carved in stone.'
  },
  {
    id: 'temple-2',
    questId: 'temple-mastery',
    difficulty: 1600,
    question: 'The temple guardian asks: "What is 15% of 240 golden coins?"',
    correctAnswer: '36',
    explanation: '15% of 240 = 0.15 × 240 = 36 coins',
    theme: 'Mystical trials testing mathematical mastery.'
  },
  {
    id: 'temple-3',
    questId: 'temple-mastery',
    difficulty: 1800,
    question: 'Final challenge: If a rectangular temple floor is 12m × 8m, and square tiles are 0.5m × 0.5m, how many tiles are needed?',
    options: ['384', '480', '576', '720'],
    correctAnswer: '384',
    explanation: 'Floor area = 12 × 8 = 96 m². Tile area = 0.5 × 0.5 = 0.25 m². Tiles needed = 96 ÷ 0.25 = 384',
    theme: 'The ultimate test of mathematical prowess.'
  }
];