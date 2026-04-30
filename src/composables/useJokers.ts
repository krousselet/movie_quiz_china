import { reactive, ref } from 'vue'
import type {
  GameMode,
  JokersClassic,
  JokersBeatClock,
  JokersLongStreak,
  JokersInvestigation,
} from '@/types/game.types'
import type { Movie } from '@/types/game.types'

// ------------------------------
// Classic Joker Logic (REACTIVE ✅)
// ------------------------------
export function useJokersClassic() {
  const jokers = reactive<JokersClassic>({
    revealLetterInitial: 3,
    skipInitial: 2,
    fiftyFiftyInitial: 2,
    revealLetter: 3,
    skip: 2,
    fiftyFifty: 2,
  })

  const useRevealLetter = () => {
    if (jokers.revealLetter > 0) jokers.revealLetter--
  }

  const useAutoCorrect = (cb: () => void) => {
    if (jokers.skip > 0) {
      jokers.skip--
      cb()
    }
  }

  const useFiftyFifty = (currentMovie: Movie, movieList: Movie[]) => {
    if (jokers.fiftyFifty <= 0 || !movieList.length) return null

    const correctTitle = currentMovie.title
    let fakeTitle = correctTitle

    while (fakeTitle === correctTitle) {
      const randomIndex = Math.floor(Math.random() * movieList.length)
      const randomMovie = movieList[randomIndex]
      if (randomMovie) fakeTitle = randomMovie.title
    }

    jokers.fiftyFifty--
    return { correct: correctTitle, fake: fakeTitle }
  }

  return {
    jokers,
    useRevealLetter,
    useAutoCorrect,
    useFiftyFifty,
  }
}

// ------------------------------
// Beat The Clock (REACTIVE ✅)
// ------------------------------
export function useJokersBeatClock() {
  const jokers = reactive<JokersBeatClock>({
    skipInitial: 3,
    stopTimerInitial: 2,
    addTimeInitial: 2,
    skip: 3,
    stopTimer: 2,
    addTime: 2,
  })

  const useSkip = () => {
    if (jokers.skip > 0) jokers.skip--
  }

  const useStopTimer = (timer: any) => {
    if (jokers.stopTimer <= 0) return
    timer.stopTimerFor(5)
    jokers.stopTimer--
  }

  const useAddTime = (timer: { addTime: (s: number) => void }) => {
    if (jokers.addTime > 0) {
      jokers.addTime--
      timer.addTime(15)
    }
  }

  return {
    jokers,
    useSkip,
    useStopTimer,
    useAddTime,
  }
}

// ------------------------------
// Longest Streak (REACTIVE ✅)
// ------------------------------
export function useJokersLongStreak() {
  const jokers = reactive<JokersLongStreak>({
    skipInitial: 3,
    protectStreakInitial: 2,
    instantWinInitial: 1,
    skip: 3,
    protectStreak: 2,
    instantWin: 1,
  })

  const streakProtected = ref(false)

  const useSkip = () => {
    if (jokers.skip > 0) jokers.skip--
  }

  const useProtectStreak = () => {
    if (jokers.protectStreak > 0) {
      jokers.protectStreak--
      streakProtected.value = true
    }
  }

  const consumeStreakProtection = () => {
    streakProtected.value = false
  }

  const useInstantWin = (cb: () => void) => {
    if (jokers.instantWin > 0) {
      jokers.instantWin--
      cb()
    }
  }

  return {
    jokers,
    streakProtected,
    useSkip,
    useProtectStreak,
    consumeStreakProtection,
    useInstantWin,
  }
}

// ------------------------------
// Investigation (REACTIVE ✅)
// ------------------------------
export function useJokersInvestigation() {
  const jokers = reactive<JokersInvestigation>({
    hintInitial: 2,
    removeTwoInitial: 2,
    skipQuestionInitial: 2,
    hint: 2,
    removeTwo: 2,
    skipQuestion: 2,
  })

  const useHint = () => {
    if (jokers.hint > 0) jokers.hint--
  }

  const useRemoveTwo = () => {
    if (jokers.removeTwo > 0) jokers.removeTwo--
  }

  const useSkipQuestion = (): boolean => {
    if (jokers.skipQuestion <= 0) return false
    jokers.skipQuestion--
    return true
  }

  return {
    jokers,
    useHint,
    useRemoveTwo,
    useSkipQuestion,
  }
}

// Factory
export function createJokerSet(mode: GameMode) {
  switch (mode) {
    case 'classic':
      return useJokersClassic()
    case 'beat-the-clock':
      return useJokersBeatClock()
    case 'longest-streak':
      return useJokersLongStreak()
    case 'investigation':
      return useJokersInvestigation()
    default:
      throw new Error(`Unsupported mode: ${mode}`)
  }
}
