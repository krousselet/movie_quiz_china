import { StorageService } from './StorageService'
import type { Movie } from '../types'

export class TMDBService {
  private storage = new StorageService()
  private readonly API_KEY = import.meta.env.VITE_TMDB_API_KEY as string
  private readonly BASE_URL = 'https://api.themoviedb.org/3'

  async getRandomMovies(limit: number = 20): Promise<Movie[]> {
    const cached = this.storage.getCachedMovies()
    if (cached.length > 0) return cached

    try {
      const res = await fetch(`${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&page=1`)
      const data = await res.json()

      const movies = data.results.slice(0, limit).map((item: any) => ({
        id: item.id,
        title: item.title,
        originalTitle: item.title,
        displayTitle: this.maskTitle(item.title),
        // ✅ ONLY CLEAN BACKDROP — NO TITLES EVER
        poster_path: `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      }))

      this.storage.saveCachedMovies(movies)
      return movies
    } catch (err) {
      console.error(err)
      return []
    }
  }

  private maskTitle(title: string): string {
    return title[0] + title.slice(1).replace(/[a-zA-Z]/g, '_')
  }
}