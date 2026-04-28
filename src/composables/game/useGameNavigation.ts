import { useRouter } from 'vue-router'

export function useGameNavigation() {
  const router = useRouter()

  const quitGame = () => {
    router.push('/')
  }

  const goToLeaderboard = () => {
    router.push('/leaderboard')
  }

  return {
    quitGame,
    goToLeaderboard,
  }
}
