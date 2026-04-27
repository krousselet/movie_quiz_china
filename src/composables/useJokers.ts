// ✅ FIXED: Added ref to the import
import { reactive, ref } from 'vue'
import { JOKER_BASE_LIMITS, TIMER_EFFECTS } from '@/constants/gameConfig'
import type { Movie } from '@/types/game.types'

export function useJokers() {
  const jokers = reactive({ ...JOKER_BASE_LIMITS })

  const useSkip = (onNext: () => void) => {
    if (jokers.skip <= 0) return
    jokers.skip--
    onNext()
  }

  const useAutoCorrect = (onCorrect: () => void) => {
    if (jokers.skip <= 0) return
    jokers.skip--
    onCorrect()
  }

  const useFiftyFifty = (currentMovie: Movie, movieList: Movie[]) => {
    if (jokers.fiftyFifty <= 0 || movieList.length < 2) return null
    jokers.fiftyFifty--

    const correct = currentMovie.title ?? 'Unknown Movie'
    const validMovies = movieList.filter((m) => m && m.id !== currentMovie.id && m.title?.trim())
    let fake = 'Wrong Answer'
    const selected = validMovies[Math.floor(Math.random() * validMovies.length)]
    if (selected?.title) fake = selected.title
    return { correct, fake }
  }

  const useStopTimer = (difficulty: string, stopTimerFor: (sec: number) => void) => {
    if (jokers.stopTimer <= 0) return
    const sec =
      TIMER_EFFECTS.stopDuration[difficulty as keyof typeof TIMER_EFFECTS.stopDuration] || 3
    jokers.stopTimer--
    stopTimerFor(sec)
  }

  const useAddTime = (difficulty: string, addTime: (sec: number) => void) => {
    if (jokers.addTime <= 0) return
    const sec = TIMER_EFFECTS.addSeconds[difficulty as keyof typeof TIMER_EFFECTS.addSeconds] || 5
    jokers.addTime--
    addTime(sec)
  }

  const resetJokers = () => {
    Object.assign(jokers, { ...JOKER_BASE_LIMITS })
  }

  // Protect streak: ignore next wrong answer
  const streakProtected = ref(false)

  const useProtectStreak = () => {
    if (jokers.protectStreak <= 0) return
    jokers.protectStreak--
    streakProtected.value = true
  }

  // Instant win = auto correct answer
  const useInstantWin = (onApply: () => void) => {
    if (jokers.instantWin <= 0) return
    jokers.instantWin--
    onApply()
  }

  // Expose
  return {
    jokers,
    streakProtected,
    useSkip,
    useAutoCorrect,
    useFiftyFifty,
    useStopTimer,
    useAddTime,
    useProtectStreak,
    useInstantWin,
    resetJokers,
  }
}
