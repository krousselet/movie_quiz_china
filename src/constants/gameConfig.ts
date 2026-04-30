// src/config/gameRules.ts

// --------------------------
// JOKERS
// --------------------------
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

  // Investigation Mode
  hint: 1,
  removeTwo: 1,
  skipQuestion: 1,
}

// --------------------------
// SCORE
// --------------------------
export const ANSWER_SCORE = {
  perfect: 100,
  close: 50,
  almost: 20,
  wrong: 0,
}

// --------------------------
// CLASSIC / WIN SCORE
// --------------------------
export const WIN_SCORE_CONFIG = {
  easy: 500,
  medium: 750,
  hard: 1000,
}

// --------------------------
// BEAT THE CLOCK
// --------------------------
export const CLOCK_DIFFICULTY_CONFIG = {
  easy: 60,
  medium: 45,
  hard: 30,
}

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

// --------------------------
// LONGEST STREAK
// --------------------------
export const STREAK_WIN_CONFIG = {
  easy: 10,
  medium: 15,
  hard: 25,
}

// --------------------------
//  INVESTIGATION MODE
// --------------------------
export const INVESTIGATION_DIFFICULTY = {
  easy: {
    initialBlur: 8,
    quizSteps: 4,
    maxWrongAttempts: 6,
    unblurAmount: 4,
    blurOnWrong: 4,
  },
  normal: {
    initialBlur: 12,
    quizSteps: 5,
    maxWrongAttempts: 5,
    unblurAmount: 4,
    blurOnWrong: 4,
  },
  hard: {
    initialBlur: 18,
    quizSteps: 6,
    maxWrongAttempts: 4,
    unblurAmount: 3,
    blurOnWrong: 5,
  },
  expert: {
    initialBlur: 24,
    quizSteps: 7,
    maxWrongAttempts: 3,
    unblurAmount: 3,
    blurOnWrong: 6,
  },
}

// Global limits
export const BLUR_LIMITS = {
  MIN: 0,
  MAX: 30,
}
