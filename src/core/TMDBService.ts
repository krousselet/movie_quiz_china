import { StorageService } from './StorageService'
import type { Movie } from '../types'

export class TMDBService {
  private storage = new StorageService()
  private readonly BASE_URL = 'https://api.themoviedb.org/3'

  // ✅ Safe, no risk, no hardcoding
  private getApiKey(): string {
    const key = import.meta.env.VITE_TMDB_API_KEY
    if (!key) console.warn('⚠️ TMDB API Key not found (env missing)')
    return key || ''
  }

  clearMovieCache(): void {
    this.storage.saveCachedMovies([])
  }

  // ✅ NOW WE ACCEPT LANGUAGE FROM OUTSIDE (SAFE)
  async getRandomMovies(limit: number = 20, userLang: string = 'en'): Promise<Movie[]> {
    const cached = this.storage.getCachedMovies()
    if (cached.length > 0) return cached

    const API_KEY = this.getApiKey()
    if (!API_KEY) return []

    // Language map for TMDB
    const langMap: Record<string, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      es: 'es-ES',
      it: 'it-IT',
      ru: 'ru-RU',
      id: 'id-ID',
      zh: 'zh-CN',
      ja: 'ja-JP',
    }
    const tmdbLang = langMap[userLang] || 'en-US'
    const randomPage = Math.floor(Math.random() * 5) + 1

    try {
      const res = await fetch(
        `${this.BASE_URL}/movie/popular?api_key=${API_KEY}&page=${randomPage}&language=${tmdbLang}`,
      )

      const data = await res.json()
      if (!data.results || !Array.isArray(data.results)) return []

      const validMovies = data.results.filter((item: any) => !!item.backdrop_path)
      const movies = validMovies.slice(0, limit).map((item: any) => ({
        id: item.id,
        title: item.title,
        originalTitle: item.original_title,
        displayTitle: this.maskTitle(item.title),
        poster_path: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
      }))

      const shuffled = movies.sort(() => Math.random() - 0.5)
      this.storage.saveCachedMovies(shuffled)
      return shuffled
    } catch (err) {
      console.error('TMDB Fetch Error:', err)
      return []
    }
  }

  private maskTitle(title: string): string {
    if (!title) return '_'
    return title[0] + title.slice(1).replace(/[a-zA-ZÀ-ÿ\u00C0-\u017F]/g, '_')
  }
}
