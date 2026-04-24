import { CLOCK_DIFFICULTY_CONFIG } from '@/constants/gameConfig'

export function useGameWinCondition(difficulty: string) {
  const config = CLOCK_DIFFICULTY_CONFIG[difficulty as keyof typeof CLOCK_DIFFICULTY_CONFIG]

  const checkWin = (currentScore: number): boolean => {
    return currentScore >= config.winScore
  }

  const getWinTarget = () => config.winScore

  const getTimerDuration = () => config.time

  return {
    checkWin,
    getWinTarget,
    getTimerDuration
  }
}