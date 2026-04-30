import { ref, onUnmounted } from 'vue'

export function useGameTimer(initialTime: number) {
  const timeLeft = ref(initialTime)
  const isFinished = ref(false)
  let timerInterval: number | null = null
  let pauseTimeout: number | null = null

  // Start the timer
  const startTimer = (onTimeOut?: () => void) => {
    if (timerInterval) return
    isFinished.value = false

    timerInterval = window.setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        timeLeft.value = 0
        isFinished.value = true
        clearTimer()
        onTimeOut?.()
      }
    }, 1000)
  }

  // Full clear (stop forever)
  const clearTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    if (pauseTimeout) {
      clearTimeout(pauseTimeout)
      pauseTimeout = null
    }
  }

  // ✅ FIXED: Pause timer for X seconds, then resume
  const stopTimerFor = (seconds: number) => {
    if (!timerInterval) return
    clearInterval(timerInterval)
    timerInterval = null

    pauseTimeout = window.setTimeout(() => {
      startTimer()
    }, seconds * 1000)
  }

  // Add time
  const addTime = (seconds: number) => {
    timeLeft.value += seconds
  }

  onUnmounted(() => clearTimer())

  return {
    timeLeft,
    isFinished,
    startTimer,
    clearTimer,
    stopTimerFor,
    addTime,
  }
}
