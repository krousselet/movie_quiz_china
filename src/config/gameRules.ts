// ALL GAME DATA + VALUES (NO DUPLICATES)
export const GAME_CONFIG = {
  modes: {
    classic: {
      icon: '🎬',
      name: 'Classic Mode',
      description: 'Play at your own rhythm with no timer or pressure.',
      rules: [
        'Guess movie titles from posters',
        'No time limit',
        'No forced difficulty',
        'Use the End Session button to save your stats',
      ],
    },
    beatTheClock: {
      icon: '⏱️',
      name: 'Beat The Clock',
      description: 'Race against the timer to reach a fixed number of movies in 5 minutes.',
      difficulties: {
        easy: 5,
        medium: 10,
        hard: 15,
        master: 20,
      },
      timeLimit: 5, // minutes
      jokerTimeAdd: 15,
      jokerPauseSec: 10,
    },
    longestStreak: {
      icon: '🔥',
      name: 'Longest Streak',
      description: 'Chain correct answers in a row to complete the challenge.',
      difficulties: {
        easy: 5,
        medium: 'Win 2 pairs in a row',
        hard: 'Win 3 pairs in a row',
        master: 'Discover all pairs without mistake',
      },
    },
    investigation: {
      icon: '🔍',
      name: 'Investigation Mode',
      description: 'The poster is blurred. Answer questions to reveal details.',
      mechanics: [
        'Correct answers = unblur the poster',
        'Wrong answers = re-blur parts of the image',
      ],
      difficulties: {
        easy: 3,
        medium: 5,
        hard: 7,
        master: 10,
      },
      note: 'This mode will be implemented last.',
    },
  },

  jokers: {
    beatTheClock: [
      { label: 'Skip a movie' },
      { label: 'Pause the timer for 10 seconds' },
      { label: 'Add 15 seconds to the timer' },
      { label: 'Reveal one letter of the title' },
    ],
    longestStreak: [
      { label: 'Allow one mistake without breaking streak' },
      { label: 'Skip the current movie' },
      { label: 'Reveal one letter' },
    ],
    investigation: [
      { label: 'Reveal one letter' },
      { label: 'Get a hint for a question' },
      { label: 'Get the correct answer for one question' },
    ],
  },

  globalStats: [
    'Every session saves your score, streak, attempts and time',
    'All data is stored locally in your browser',
    'Leaderboard sorts results by score, time or date',
    'You can skip a movie if you cannot find the answer',
  ],

  accessibility: [
    'Dark / Light mode toggle',
    'Font size & font style customization',
    'Background music toggle',
    'Full screen reader and keyboard navigation support',
    'Deaf & visually impaired friendly design',
  ],
} as const
