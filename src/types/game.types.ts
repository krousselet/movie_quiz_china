// src/types/game.types.ts
export interface Movie {
  id: number | string
  title: string
  poster_path: string
}

export type FeedbackType = 'perfect' | 'close' | 'almost' | 'wrong' | ''
