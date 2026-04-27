// src/composables/useGameWinCondition.ts
import { CLOCK_DIFFICULTY_CONFIG, WIN_SCORE_CONFIG } from '@/constants/gameConfig'

export function useGameWinCondition(difficulty: string) {
  const getTimerDuration = (): number => {
    return CLOCK_DIFFICULTY_CONFIG[difficulty as keyof typeof CLOCK_DIFFICULTY_CONFIG] || 45
  }

  const getWinTarget = (): number => {
    return WIN_SCORE_CONFIG[difficulty as keyof typeof WIN_SCORE_CONFIG] || 750
  }

  const checkWin = (currentScore: number): boolean => {
    return currentScore >= getWinTarget()
  }

  return {
    checkWin,
    getWinTarget,
    getTimerDuration,
  }
}
