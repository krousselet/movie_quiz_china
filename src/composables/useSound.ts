export function useSound() {
  const playHover = () => {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3')
    audio.volume = 0.2
    audio.play().catch(() => {})
  }

  const playClick = () => {
    const audio = new Audio(
      'https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3',
    )
    audio.volume = 0.3
    audio.play().catch(() => {})
  }

  return { playHover, playClick }
}
