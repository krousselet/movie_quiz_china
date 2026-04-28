export const JOKER_BASE_LIMITS = {
  // Classic
  skip: 3,
  revealLetter: 3,
  fiftyFifty: 2,

  // Beat The Clock
  stopTimer: 2,
  addTime: 2,

  // Longest Streak Exclusive
  protectStreak: 2,
  instantWin: 2,
}
export const ANSWER_SCORE = {
  perfect: 100,
  close: 50,
  almost: 20,
  wrong: 0,
}

export const CLOCK_DIFFICULTY_CONFIG = {
  easy: 60,
  medium: 45,
  hard: 30,
}

export const WIN_SCORE_CONFIG = {
  easy: 500,
  medium: 750,
  hard: 1000,
}

// Timer effects per difficulty
export const TIMER_EFFECTS = {
  stopDuration: {
    easy: 5,
    medium: 4,
    hard: 3,
  },
  addSeconds: {
    easy: 10,
    medium: 7,
    hard: 5,
  },
}
