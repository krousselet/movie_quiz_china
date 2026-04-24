import type {
  GameSession,
  LeaderboardEntry,
  UserSettings,
  Movie
} from '../types'

export class StorageService {
  private readonly KEYS = {
    SESSIONS: 'movie-quiz-sessions',
    LEADERBOARD: 'movie-quiz-leaderboard',
    SETTINGS: 'movie-quiz-settings',
    MOVIES_CACHE: 'movie-quiz-movies-cache'
  }

  // Save a completed game session
  saveGameSession(session: GameSession): void {
    const sessions = this.getGameSessions()
    localStorage.setItem(this.KEYS.SESSIONS, JSON.stringify([...sessions, session]))
  }

  // Add session to leaderboard
  updateLeaderboard(session: GameSession): void {
    const entry: LeaderboardEntry = {
      sessionId: session.id,
      mode: session.mode,
      difficulty: session.difficulty,
      score: session.correct,
      streak: session.streak,
      timeSpent: session.timeElapsed,
      date: new Date().toISOString()
    }
    const board = this.getLeaderboard()
    localStorage.setItem(this.KEYS.LEADERBOARD, JSON.stringify([...board, entry]))
  }

  // Get all past game sessions
  getGameSessions(): GameSession[] {
    const data = localStorage.getItem(this.KEYS.SESSIONS)
    return data ? JSON.parse(data) : []
  }

  // Get full leaderboard
  getLeaderboard(): LeaderboardEntry[] {
    const data = localStorage.getItem(this.KEYS.LEADERBOARD)
    return data ? JSON.parse(data) : []
  }

  // Save user preferences (dark mode, font, etc.)
  saveUserSettings(settings: UserSettings): void {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings))
  }

  // Get user settings
  getUserSettings(): UserSettings {
    const data = localStorage.getItem(this.KEYS.SETTINGS)
    return data
      ? JSON.parse(data)
      : {
          darkMode: true,
          musicEnabled: false,
          fontSize: 'medium',
          fontStyle: 'cinema'
        }
  }

  // Cache movies from TMDB
  saveCachedMovies(movies: Movie[]): void {
    localStorage.setItem(this.KEYS.MOVIES_CACHE, JSON.stringify(movies))
  }

  // Get cached movies
  getCachedMovies(): Movie[] {
    const cache = localStorage.getItem(this.KEYS.MOVIES_CACHE)
    return cache ? JSON.parse(cache) : []
  }
}