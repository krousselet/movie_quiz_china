import { ref } from 'vue'

export function useGameModeBase() {
  const gameWon = ref<boolean>(false)
  const gameOver = ref<boolean>(false)
  const feedbackType = ref<'perfect' | 'wrong' | ''>('')
  const feedbackMessage = ref<string>('')
  const feedbackTimeout = ref<number | null>(null)

  const clearFeedback = (): void => {
    if (feedbackTimeout.value) clearTimeout(feedbackTimeout.value)
    feedbackMessage.value = ''
    feedbackType.value = ''
  }

  return {
    gameWon,
    gameOver,
    feedbackType,
    feedbackMessage,
    feedbackTimeout,
    clearFeedback,
  }
}
