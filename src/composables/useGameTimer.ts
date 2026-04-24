import { ref, computed, onUnmounted } from 'vue'

export function useGameTimer(initialSeconds: number) {
  const timeLeft = ref(initialSeconds)
  let timerId: number | null = null

  const startTimer = (onTimeEnd: () => void) => {
    timerId = window.setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        clearTimer()
        onTimeEnd()
      }
    }, 1000)
  }

  const clearTimer = () => {
    if (timerId) clearInterval(timerId)
  }

  onUnmounted(clearTimer)

  return {
    timeLeft,
    startTimer,
    clearTimer
  }
}