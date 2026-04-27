export function useHangman() {
  const buildHangmanMask = (title: string): string => {
    return title.replace(/[a-zA-ZÀ-ÿ]/g, '_')
  }

  const revealLetterInMask = (title: string, currentMask: string): string => {
    if (!title || !currentMask) return currentMask

    const missing = new Set<string>()

    for (let i = 0; i < title.length; i++) {
      const c = title[i] ?? ''
      const m = currentMask[i] ?? ''

      if (c !== ' ' && m === '_' && c.trim()) {
        missing.add(c.toUpperCase())
      }
    }

    const list = Array.from(missing)
    if (!list.length) return currentMask

    const target = list[Math.floor(Math.random() * list.length)]

    return title
      .split('')
      .map((char, i) => {
        const c = char ?? ''
        if (c.toUpperCase() === target) return c
        return currentMask[i] ?? '_'
      })
      .join('')
  }

  return {
    buildHangmanMask,
    revealLetterInMask,
  }
}
