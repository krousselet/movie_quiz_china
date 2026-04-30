export type GameMode = 'classic' | 'beat-the-clock' | 'longest-streak' | 'investigation'

// ✅ FIXED: Added all required feedback types
export type FeedbackType = '' | 'perfect' | 'close' | 'almost' | 'wrong'

export interface JokersClassic {
  revealLetter: number
  skip: number
  fiftyFifty: number
  revealLetterInitial: number
  skipInitial: number
  fiftyFiftyInitial: number
}

export interface JokersBeatClock {
  skip: number
  stopTimer: number
  addTime: number
  skipInitial: number
  stopTimerInitial: number
  addTimeInitial: number
}

export interface JokersLongStreak {
  skip: number
  protectStreak: number
  instantWin: number
  skipInitial: number
  protectStreakInitial: number
  instantWinInitial: number
}

export interface JokersInvestigation {
  hint: number
  removeTwo: number
  skipQuestion: number
  hintInitial: number
  removeTwoInitial: number
  skipQuestionInitial: number
}

export type AllJokers = JokersClassic | JokersBeatClock | JokersLongStreak | JokersInvestigation

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
}

export interface InvestigationChoice {
  id: number
  text: string
  correct: boolean
}
