import { ref } from 'vue'
import type { Movie } from '@/types/game.types'

export function useGameLogic() {
  const score = ref(0)
  const streak = ref(0)
  const maxStreak = ref(0)

  const isLoading = ref(false)
  const isSkipping = ref(false)
  const hangmanMask = ref('')
  const currentMovie = ref<Movie | null>(null)
  const movieList = ref<Movie[]>([])

  let activeJokers: any = null

  const setActiveJokers = (jokers: any) => {
    activeJokers = jokers
  }

  const addScore = (points: number) => {
    score.value += points
  }

  const addStreak = () => {
    streak.value++
    if (streak.value > maxStreak.value) {
      maxStreak.value = streak.value
    }
  }

  const breakStreak = () => {
    if (activeJokers?.streakProtected?.value) {
      activeJokers.consumeStreakProtection()
      return
    }
    streak.value = 0
  }

  const resetGameState = () => {
    score.value = 0
    streak.value = 0
    maxStreak.value = 0
  }

  return {
    score,
    streak,
    maxStreak,
    isLoading,
    isSkipping,
    hangmanMask,
    currentMovie,
    movieList,
    addScore,
    addStreak,
    breakStreak,
    resetGameState,
    setActiveJokers,
  }
}
