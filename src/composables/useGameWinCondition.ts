import {
  CLOCK_DIFFICULTY_CONFIG,
  WIN_SCORE_CONFIG,
  STREAK_WIN_CONFIG, // ✅ import
} from '@/constants/gameConfig'

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

  // ✨ NEW: Get required streak to win based on difficulty
  const getWinStreak = (): number => {
    return STREAK_WIN_CONFIG[difficulty as keyof typeof STREAK_WIN_CONFIG] || 15
  }

  return {
    checkWin,
    getWinTarget,
    getTimerDuration,
    getWinStreak, // ✅ exported
  }
}
