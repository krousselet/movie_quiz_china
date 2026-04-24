// Difficulty time (seconds) + win score target
export const CLOCK_DIFFICULTY_CONFIG = {
  easy: {
    time: 30,
    winScore: 5
  },
  medium: {
    time: 45,
    winScore: 10
  },
  hard: {
    time: 60,
    winScore: 15
  }
}

// Joker base limits for Beat The Clock
export const JOKER_BASE_LIMITS = {
  skip: 1,
  revealLetter: 1,
  fiftyFifty: 1
}

// Answer grading score values
export const ANSWER_SCORE = {
  perfect: 10,
  close: 7,
  almost: 4,
  wrong: 0
}