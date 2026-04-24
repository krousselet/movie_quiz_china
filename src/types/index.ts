export type GameMode = 'beat-the-clock' | 'longest-streak' | 'classic' | 'investigation'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'master'

export interface Movie {
  id: number
  title: string
  originalTitle: string // HIDDEN (anti-cheat)
  displayTitle: string // Masked
  poster_path: string
}

export interface GameSession {
  id: string
  mode: GameMode
  difficulty: Difficulty
  movies: Movie[]
  currentIndex: number
  streak: number
  correct: number
  attempts: number
  skipped: number
  jokersUsed: string[]
  startTime: Date
  endTime: Date | null
  timeElapsed: number
}

export interface LeaderboardEntry {
  sessionId: string
  mode: GameMode
  difficulty: Difficulty
  score: number
  streak: number
  timeSpent: number
  date: string
}

export interface UserSettings {
  darkMode: boolean
  musicEnabled: boolean
  fontSize: 'small' | 'medium' | 'large' | 'xl'
  fontStyle: 'cinema' | 'classic' | 'readable'
}