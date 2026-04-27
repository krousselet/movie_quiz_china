import { ref } from 'vue'

export function useGameTimer(initialSeconds: number) {
  const timeLeft = ref(initialSeconds)
  let timerInterval: number | null = null
  let isStopped = ref(false)
  let stopTimeout: number | null = null

  const startTimer = (onTimeOut?: () => void) => {
    if (timerInterval) return
    timerInterval = window.setInterval(() => {
      if (isStopped.value) return
      timeLeft.value--
      if (timeLeft.value <= 0) {
        clearTimer()
        onTimeOut?.()
      }
    }, 1000)
  }

  const clearTimer = () => {
    if (timerInterval) clearInterval(timerInterval)
    if (stopTimeout) clearTimeout(stopTimeout)
    timerInterval = null
    stopTimeout = null
    isStopped.value = false
  }

  // ✅ NEW: Stop timer for X seconds
  const stopTimerFor = (seconds: number) => {
    if (isStopped.value) return
    isStopped.value = true
    stopTimeout = window.setTimeout(() => {
      isStopped.value = false
    }, seconds * 1000)
  }

  // ✅ NEW: Add seconds to timer
  const addTime = (seconds: number) => {
    timeLeft.value += seconds
  }

  return {
    timeLeft,
    startTimer,
    clearTimer,
    stopTimerFor,
    addTime,
  }
}
