export function cleanText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim()
    .toLowerCase()
}

export function calculateSimilarity(a: string, b: string): number {
  const s1 = cleanText(a)
  const s2 = cleanText(b)
  if (s1 === s2) return 1

  const w1 = new Set(s1.split(' '))
  const w2 = new Set(s2.split(' '))
  const common = [...w1].filter((w) => w2.has(w)).length

  return common / Math.max(w1.size, w2.size)
}
