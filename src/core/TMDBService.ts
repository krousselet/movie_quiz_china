import { StorageService } from './StorageService'
import type { Movie } from '../types'

export class TMDBService {
  private storage = new StorageService()
  private readonly BASE_URL = 'https://api.themoviedb.org/3'

  private getApiKey(): string {
    const key = import.meta.env.VITE_TMDB_API_KEY
    if (!key) console.warn('⚠️ TMDB API Key not found (env missing)')
    return key || ''
  }

  clearMovieCache(): void {
    this.storage.saveCachedMovies([])
  }

  // Get already seen movie IDs
  private getSeenMovieIds(): number[] {
    try {
      return JSON.parse(localStorage.getItem('seenMovieIds') || '[]')
    } catch {
      return []
    }
  }

  // Mark movie as seen
  private addSeenMovieIds(ids: number[]): void {
    const seen = this.getSeenMovieIds()
    const unique = Array.from(new Set([...seen, ...ids]))
    localStorage.setItem('seenMovieIds', JSON.stringify(unique))
  }

  // Reset seen list (when full)
  private resetSeenMovies(): void {
    localStorage.removeItem('seenMovieIds')
  }

  /**
   * ✅ SMART RANDOM MOVIES
   * - Fast load from cache
   * - No duplicates
   * - New movies every game
   */
  async getRandomMovies(limit: number = 20, userLang: string = 'en'): Promise<Movie[]> {
    const API_KEY = this.getApiKey()
    if (!API_KEY) return []

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

    // 1. Get cached & seen movies
    let cached = this.storage.getCachedMovies()
    const seenIds = this.getSeenMovieIds()

    // 2. Filter out already seen movies FROM CACHE
    let available = cached.filter((m) => !seenIds.includes(m.id))

    // 3. If enough cached unused movies → USE THEM (FAST)
    if (available.length >= limit) {
      const selected = available.sort(() => Math.random() - 0.5).slice(0, limit)
      this.addSeenMovieIds(selected.map((m) => m.id))
      return selected
    }

    // 4. If cache is low → FETCH NEW MOVIES
    const randomPage = Math.floor(Math.random() * 20) + 1

    try {
      const res = await fetch(
        `${this.BASE_URL}/movie/popular?api_key=${API_KEY}&page=${randomPage}&language=${tmdbLang}`,
      )

      const data = await res.json()
      if (!data.results || !Array.isArray(data.results)) return available

      // 5. Format new movies
      let newMovies: Movie[] = data.results
        .filter((item: any) => !!item.backdrop_path)
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          originalTitle: item.original_title,
          displayTitle: this.maskTitle(item.title),
          poster_path: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        }))

      // 6. Exclude seen
      newMovies = newMovies.filter((m) => !seenIds.includes(m.id))

      // 7. If NO new movies left → reset seen list
      if (newMovies.length === 0) {
        this.resetSeenMovies()
        return this.getRandomMovies(limit, userLang)
      }

      // 8. Merge & save full cache
      const updatedCache = Array.from(new Map([...cached, ...newMovies].map((m) => [m.id, m]))).map(
        (entry) => entry[1],
      )

      this.storage.saveCachedMovies(updatedCache)

      // 9. Select random & mark as seen
      const shuffled = newMovies.sort(() => Math.random() - 0.5).slice(0, limit)
      this.addSeenMovieIds(shuffled.map((m) => m.id))

      return shuffled
    } catch (err) {
      console.error('TMDB Fetch Error:', err)
      return available
    }
  }

  private maskTitle(title: string): string {
    if (!title) return '_'
    return title[0] + title.slice(1).replace(/[a-zA-ZÀ-ÿ\u00C0-\u017F]/g, '_')
  }
}
