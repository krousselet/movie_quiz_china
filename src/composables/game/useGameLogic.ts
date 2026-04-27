// src/composables/game/useGameLogic.ts
import { ref } from 'vue'

export function useGameLogic() {
  const score = ref(0)
  const streak = ref(0)
  const maxStreak = ref(0)

  const isLoading = ref(false)
  const isSkipping = ref(false)
  const hangmanMask = ref('')
  const currentMovie = ref(null)
  const movieList = ref([])

  // ✅ Fixed: added :number type
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
    streak.value = 0
  }

  const resetGameState = () => {
    score.value = 0
    streak.value = 0
    maxStreak.value = 0
    hangmanMask.value = ''
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
  }
}
