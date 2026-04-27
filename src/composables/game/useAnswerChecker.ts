import { ref, inject } from 'vue'
import type { FeedbackType } from '@/types/game.types'
import { calculateSimilarity } from '@/utils/string.utils'
import { ANSWER_SCORE } from '@/constants/gameConfig'

export function useAnswerChecker() {
  const feedbackType = ref<FeedbackType>('')
  const correctAnswer = ref('')
  const isCorrect = ref(false)
  const isWrong = ref(false)

  const streakProtected = inject('streakProtected', ref(false))

  const check = (
    guess: string,
    actualTitle: string,
    onSuccess: (score: number) => void,
    onFail: () => void,
  ) => {
    const trimmed = guess.trim()
    if (!trimmed || !actualTitle) return

    correctAnswer.value = actualTitle
    const sim = calculateSimilarity(trimmed, actualTitle)

    let type: FeedbackType = 'wrong'
    let score = 0

    if (sim >= 0.9) {
      type = 'perfect'
      score = ANSWER_SCORE.perfect
    } else if (sim >= 0.7) {
      type = 'close'
      score = ANSWER_SCORE.close
    } else if (sim >= 0.5) {
      type = 'almost'
      score = ANSWER_SCORE.almost
    }

    feedbackType.value = type

    if (score > 0) {
      isCorrect.value = true
      isWrong.value = false
      onSuccess(score)
    } else {
      isWrong.value = true
      isCorrect.value = false

      // ✅ FIXED: Always run onFail() — protection only blocks streak break
      if (streakProtected.value) {
        streakProtected.value = false
      }
      // Always call to keep game flow working
      onFail()
    }
  }

  const reset = () => {
    feedbackType.value = ''
    correctAnswer.value = ''
    isCorrect.value = false
    isWrong.value = false
  }

  return {
    feedbackType,
    correctAnswer,
    isCorrect,
    isWrong,
    check,
    reset,
  }
}
