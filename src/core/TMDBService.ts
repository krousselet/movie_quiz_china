import { StorageService } from './StorageService'
import type { Movie } from '../types'

export class TMDBService {
  private storage = new StorageService()
  private readonly API_KEY = import.meta.env.VITE_TMDB_API_KEY as string
  private readonly BASE_URL = 'https://api.themoviedb.org/3'

  // Clear cache → triggered on "Play" click
  clearMovieCache(): void {
    this.storage.saveCachedMovies([])
  }

  async getRandomMovies(limit: number = 20): Promise<Movie[]> {
    const cached = this.storage.getCachedMovies()
    if (cached.length > 0) return cached

    // Random page 1 ~ 5 for true randomness
   const randomPage = Math.floor(Math.random() * 5) + 1

    try {
      const res = await fetch(
        `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&page=${randomPage}`
      )
      const data = await res.json()

      // 🔒 ONLY keep movies with backdrop → NO TITLED POSTERS EVER
      const onlyNoTitleImages = data.results.filter(
        (item: any) => !!item.backdrop_path
      )

      const movies = onlyNoTitleImages.slice(0, limit).map((item: any) => ({
        id: item.id,
        title: item.title,
        originalTitle: item.original_title,
        displayTitle: this.maskTitle(item.title),
        // Only clean backdrop image, no poster fallback
        poster_path: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
      }))

      // Shuffle final array for extra randomness
      const shuffled = movies.sort(() => Math.random() - 0.5)

      this.storage.saveCachedMovies(shuffled)
      return shuffled
    } catch (err) {
      console.error('TMDB Fetch Error:', err)
      return []
    }
  }

  private maskTitle(title: string): string {
    return title[0] + title.slice(1).replace(/[a-zA-ZÀ-ÿ]/g, '_')
  }
}