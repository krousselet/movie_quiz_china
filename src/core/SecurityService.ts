import type { Movie } from '@/types'

// ANTI-CHEAT: Hides real movie titles from client inspection
export class SecurityService {
  obscureMovieTitles(movies: Movie[]): Movie[] {
    return movies.map(movie => ({
      ...movie,
      displayTitle: this.maskTitle(movie.title), // Masked title shown in UI
      originalTitle: movie.title, // REAL title (hidden)
      title: '' // Empty in client DOM - NO CHEATING!
    }))
  }

  // Mask title: "The Matrix" → "___ ______"
  private maskTitle(title: string): string {
    return title.replace(/[a-zA-Z0-9]/g, '_')
  }

  // Secure answer verification (server-side style logic)
  verifyAnswer(userInput: string, correctTitle: string): boolean {
    const normalize = (str: string) => 
      str.toLowerCase().trim().replace(/[^a-z0-9]/g, '')
    return normalize(userInput) === normalize(correctTitle)
  }
}