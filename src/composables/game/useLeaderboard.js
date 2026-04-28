export function useLeaderboard() {
  const getLeaderboard = () => {
    return JSON.parse(localStorage.getItem('leaderboard') || '[]')
  }

  const getTopScores = (limit = 10) => {
    return getLeaderboard().slice(0, limit)
  }

  return {
    getLeaderboard,
    getTopScores,
  }
}
