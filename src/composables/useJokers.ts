// src/composables/useJokers.ts
import { reactive } from 'vue'
import { JOKER_BASE_LIMITS } from '@/constants/gameConfig'

export function useJokers() {
  // ✅ Use reactive (not ref) → NO .value in template
  const jokers = reactive({ ...JOKER_BASE_LIMITS })

  const useSkip = (onNextMovie: () => void) => {
    if (jokers.skip <= 0) return
    jokers.skip--
    onNextMovie()
  }

  const useRevealLetter = (title: string, currentInput: string): string => {
    if (jokers.revealLetter <= 0) return currentInput
    jokers.revealLetter--

    const letters = title
      .replace(/\s/g, '')
      .split('')
      .filter(c => !currentInput.includes(c))

    if (!letters.length) return currentInput
    const randomChar = letters[Math.floor(Math.random() * letters.length)]
    return currentInput + randomChar
  }

  const useFiftyFifty = () => {
    if (jokers.fiftyFifty <= 0) return false
    jokers.fiftyFifty--
    return true
  }

  const resetJokers = () => {
    Object.assign(jokers, { ...JOKER_BASE_LIMITS })
  }

  return {
    jokers, // ✅ reactive object → direct access in template
    useSkip,
    useRevealLetter,
    useFiftyFifty,
    resetJokers
  }
}