import { ref } from 'vue'

export function useGameTimer(initialSeconds: number) {
  const timeLeft = ref<number>(initialSeconds)
  let timerInterval: number | null = null
  const isStopped = ref<boolean>(false)
  let stopTimeout: number | null = null

  // ✅ CLEAR TIMER FIRST — SO IT CAN BE USED INSIDE startTimer
  const clearTimer = (): void => {
    if (timerInterval) window.clearInterval(timerInterval)
    if (stopTimeout) window.clearTimeout(stopTimeout)
    timerInterval = null
    stopTimeout = null
    isStopped.value = false
  }

  // ✅ NOW startTimer CAN SAFELY CALL clearTimer
  const startTimer = (onTimeOut?: () => void): void => {
    // Reset time to full duration
    if (timeLeft.value <= 0) {
      timeLeft.value = initialSeconds
    }

    clearTimer()

    timerInterval = window.setInterval(() => {
      if (isStopped.value) return

      timeLeft.value--

      if (timeLeft.value <= 0) {
        clearTimer()
        onTimeOut?.()
      }
    }, 1000)
  }

  const stopTimerFor = (seconds: number): void => {
    if (isStopped.value) return
    isStopped.value = true

    stopTimeout = window.setTimeout(() => {
      isStopped.value = false
    }, seconds * 1000)
  }

  const addTime = (seconds: number): void => {
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
