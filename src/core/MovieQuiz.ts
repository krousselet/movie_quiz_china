import { TMDBService } from './TMDBService'
import { StorageService } from './StorageService'
import { SecurityService } from './SecurityService'
import type { GameSession, Movie, GameMode, Difficulty } from '@/types'

// OOP BASE CLASS - ALL GAME LOGIC CENTRALIZED
export class MovieQuiz {
  private tmdb: TMDBService
  private storage: StorageService
  private security: SecurityService
  public session: GameSession | null = null

  constructor() {
    // Dependency injection (clean OOP)
    this.tmdb = new TMDBService()
    this.storage = new StorageService()
    this.security = new SecurityService()
  }

  // Initialize new game session
  public async startSession(mode: GameMode, difficulty: Difficulty): Promise<void> {
    const movies = await this.tmdb.getRandomMovies(25)
    const secureMovies = this.security.obscureMovieTitles(movies) // Anti-cheat

    this.session = {
      id: Date.now().toString(),
      mode,
      difficulty,
      movies: secureMovies,
      currentIndex: 0,
      streak: 0,
      correct: 0,
      attempts: 0,
      skipped: 0,
      jokersUsed: [],
      startTime: new Date(),
      endTime: null,
      timeElapsed: 0,
    }
  }

  // Check answer (secure, no client-side title exposure)
  public checkAnswer(userInput: string): boolean {
    if (!this.session) return false
    const currentMovie = this.session.movies[this.session.currentIndex]
    return this.security.verifyAnswer(userInput, currentMovie.originalTitle)
  }

  // Save final score to localStorage
  public saveSession(): void {
    if (!this.session) return
    this.session.endTime = new Date()
    this.storage.saveGameSession(this.session)
    this.storage.updateLeaderboard(this.session)
  }

  // Skip movie (joker)
  public skipMovie(): void {
    if (!this.session) return
    this.session.skipped++
    this.session.currentIndex++
  }
}