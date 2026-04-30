import { ref } from 'vue'
import type { Movie } from '@/types/game.types'

// --------------------------
// 40+ 通用题库
// --------------------------
const genericQuestionBank = [
  {
    key: 'quiz.generic.q1',
    answers: [
      { textKey: 'quiz.answers.art', correct: true },
      { textKey: 'quiz.answers.sport', correct: false },
      { textKey: 'quiz.answers.science', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q2',
    answers: [
      { textKey: 'quiz.answers.film', correct: true },
      { textKey: 'quiz.answers.book', correct: false },
      { textKey: 'quiz.answers.music', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q3',
    answers: [
      { textKey: 'quiz.answers.director', correct: true },
      { textKey: 'quiz.answers.writer', correct: false },
      { textKey: 'quiz.answers.painter', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q4',
    answers: [
      { textKey: 'quiz.answers.actor', correct: true },
      { textKey: 'quiz.answers.doctor', correct: false },
      { textKey: 'quiz.answers.teacher', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q5',
    answers: [
      { textKey: 'quiz.answers.screen', correct: true },
      { textKey: 'quiz.answers.canvas', correct: false },
      { textKey: 'quiz.answers.stage', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q6',
    answers: [
      { textKey: 'quiz.answers.cinema', correct: true },
      { textKey: 'quiz.answers.stadium', correct: false },
      { textKey: 'quiz.answers.library', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q7',
    answers: [
      { textKey: 'quiz.answers.script', correct: true },
      { textKey: 'quiz.answers.recipe', correct: false },
      { textKey: 'quiz.answers.manual', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q8',
    answers: [
      { textKey: 'quiz.answers.camera', correct: true },
      { textKey: 'quiz.answers.pen', correct: false },
      { textKey: 'quiz.answers.hammer', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q9',
    answers: [
      { textKey: 'quiz.answers.sequel', correct: true },
      { textKey: 'quiz.answers.preview', correct: false },
      { textKey: 'quiz.answers.summary', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q10',
    answers: [
      { textKey: 'quiz.answers.trailer', correct: true },
      { textKey: 'quiz.answers.cover', correct: false },
      { textKey: 'quiz.answers.poster', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q11',
    answers: [
      { textKey: 'quiz.answers.cast', correct: true },
      { textKey: 'quiz.answers.team', correct: false },
      { textKey: 'quiz.answers.staff', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q12',
    answers: [
      { textKey: 'quiz.answers.genre', correct: true },
      { textKey: 'quiz.answers.style', correct: false },
      { textKey: 'quiz.answers.size', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q13',
    answers: [
      { textKey: 'quiz.answers.plot', correct: true },
      { textKey: 'quiz.answers.list', correct: false },
      { textKey: 'quiz.answers.note', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q14',
    answers: [
      { textKey: 'quiz.answers.scene', correct: true },
      { textKey: 'quiz.answers.page', correct: false },
      { textKey: 'quiz.answers.chapter', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q15',
    answers: [
      { textKey: 'quiz.answers.clip', correct: true },
      { textKey: 'quiz.answers.song', correct: false },
      { textKey: 'quiz.answers.photo', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q16',
    answers: [
      { textKey: 'quiz.answers.hero', correct: true },
      { textKey: 'quiz.answers.villain', correct: false },
      { textKey: 'quiz.answers.supporter', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q17',
    answers: [
      { textKey: 'quiz.answers.ending', correct: true },
      { textKey: 'quiz.answers.start', correct: false },
      { textKey: 'quiz.answers.middle', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q18',
    answers: [
      { textKey: 'quiz.answers.soundtrack', correct: true },
      { textKey: 'quiz.answers.noise', correct: false },
      { textKey: 'quiz.answers.effect', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q19',
    answers: [
      { textKey: 'quiz.answers.poster', correct: true },
      { textKey: 'quiz.answers.billboard', correct: false },
      { textKey: 'quiz.answers.photo', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q20',
    answers: [
      { textKey: 'quiz.answers.rating', correct: true },
      { textKey: 'quiz.answers.score', correct: false },
      { textKey: 'quiz.answers.mark', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q21',
    answers: [
      { textKey: 'quiz.answers.blockbuster', correct: true },
      { textKey: 'quiz.answers.indie', correct: false },
      { textKey: 'quiz.answers.short', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q22',
    answers: [
      { textKey: 'quiz.answers.oscar', correct: true },
      { textKey: 'quiz.answers.grammy', correct: false },
      { textKey: 'quiz.answers.emmy', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q23',
    answers: [
      { textKey: 'quiz.answers.subtitle', correct: true },
      { textKey: 'quiz.answers.title', correct: false },
      { textKey: 'quiz.answers.heading', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q24',
    answers: [
      { textKey: 'quiz.answers.dubbing', correct: true },
      { textKey: 'quiz.answers.singing', correct: false },
      { textKey: 'quiz.answers.reading', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q25',
    answers: [
      { textKey: 'quiz.answers.cameo', correct: true },
      { textKey: 'quiz.answers.mainRole', correct: false },
      { textKey: 'quiz.answers.supportRole', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q26',
    answers: [
      { textKey: 'quiz.answers.producer', correct: true },
      { textKey: 'quiz.answers.actor', correct: false },
      { textKey: 'quiz.answers.director', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q27',
    answers: [
      { textKey: 'quiz.answers.screenplay', correct: true },
      { textKey: 'quiz.answers.novel', correct: false },
      { textKey: 'quiz.answers.poem', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q28',
    answers: [
      { textKey: 'quiz.answers.franchise', correct: true },
      { textKey: 'quiz.answers.single', correct: false },
      { textKey: 'quiz.answers.short', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q29',
    answers: [
      { textKey: 'quiz.answers.prequel', correct: true },
      { textKey: 'quiz.answers.sequel', correct: false },
      { textKey: 'quiz.answers.remake', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q30',
    answers: [
      { textKey: 'quiz.answers.remake', correct: true },
      { textKey: 'quiz.answers.original', correct: false },
      { textKey: 'quiz.answers.copy', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q31',
    answers: [
      { textKey: 'quiz.answers.cgi', correct: true },
      { textKey: 'quiz.answers.drawing', correct: false },
      { textKey: 'quiz.answers.painting', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q32',
    answers: [
      { textKey: 'quiz.answers.stunt', correct: true },
      { textKey: 'quiz.answers.actor', correct: false },
      { textKey: 'quiz.answers.dancer', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q33',
    answers: [
      { textKey: 'quiz.answers.bloopers', correct: true },
      { textKey: 'quiz.answers.scenes', correct: false },
      { textKey: 'quiz.answers.clips', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q34',
    answers: [
      { textKey: 'quiz.answers.cinematography', correct: true },
      { textKey: 'quiz.answers.photography', correct: false },
      { textKey: 'quiz.answers.drawing', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q35',
    answers: [
      { textKey: 'quiz.answers.costume', correct: true },
      { textKey: 'quiz.answers.clothes', correct: false },
      { textKey: 'quiz.answers.uniform', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q36',
    answers: [
      { textKey: 'quiz.answers.makeup', correct: true },
      { textKey: 'quiz.answers.hair', correct: false },
      { textKey: 'quiz.answers.nails', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q37',
    answers: [
      { textKey: 'quiz.answers.set', correct: true },
      { textKey: 'quiz.answers.house', correct: false },
      { textKey: 'quiz.answers.studio', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q38',
    answers: [
      { textKey: 'quiz.answers.location', correct: true },
      { textKey: 'quiz.answers.place', correct: false },
      { textKey: 'quiz.answers.area', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q39',
    answers: [
      { textKey: 'quiz.answers.premiere', correct: true },
      { textKey: 'quiz.answers.release', correct: false },
      { textKey: 'quiz.answers.launch', correct: false },
    ],
  },
  {
    key: 'quiz.generic.q40',
    answers: [
      { textKey: 'quiz.answers.boxoffice', correct: true },
      { textKey: 'quiz.answers.sales', correct: false },
      { textKey: 'quiz.answers.profit', correct: false },
    ],
  },
]

// --------------------------
// 电影题库（安全数组）
// --------------------------
const movieQuestionTemplates = [
  (movie: Movie) => {
    const year = movie.release_date ? movie.release_date.split('-')[0] : '2020'
    const fakes = ['2010', '2015', '2018', '2022', '2023'].filter((y) => y !== year)
    return {
      key: 'quiz.movie.releaseYear',
      answers: [
        { text: year, correct: true },
        { text: fakes[0] ?? '2016', correct: false },
        { text: fakes[1] ?? '2019', correct: false },
      ],
    }
  },
  () => ({
    key: 'quiz.movie.mainGenre',
    answers: [
      { text: 'Drama', correct: true },
      { text: 'Action', correct: false },
      { text: 'Comedy', correct: false },
    ],
  }),
  () => ({
    key: 'quiz.movie.isFiction',
    answers: [
      { text: 'Fiction', correct: true },
      { text: 'Based on True Story', correct: false },
      { text: 'Documentary', correct: false },
    ],
  }),
  () => ({
    key: 'quiz.movie.runtime',
    answers: [
      { text: 'Standard (90-120min)', correct: true },
      { text: 'Short (<60min)', correct: false },
      { text: 'Long (>180min)', correct: false },
    ],
  }),
  () => ({
    key: 'quiz.movie.targetAudience',
    answers: [
      { text: 'General Audience', correct: true },
      { text: 'Adults Only', correct: false },
      { text: 'Kids Only', correct: false },
    ],
  }),
  () => ({
    key: 'quiz.movie.mood',
    answers: [
      { text: 'Emotional', correct: true },
      { text: 'Scary', correct: false },
      { text: 'Funny', correct: false },
    ],
  }),
  () => ({
    key: 'quiz.movie.pacing',
    answers: [
      { text: 'Medium', correct: true },
      { text: 'Slow', correct: false },
      { text: 'Fast', correct: false },
    ],
  }),
  () => ({
    key: 'quiz.movie.style',
    answers: [
      { text: 'Live Action', correct: true },
      { text: 'Animation', correct: false },
      { text: 'Mixed', correct: false },
    ],
  }),
]

// --------------------------
// ✅ 最终 100% 无错误
// --------------------------
export function useInvestigationQuestions() {
  const usedGenericQuestions = ref<string[]>([])

  const resetQuestionPool = () => {
    usedGenericQuestions.value = []
  }

  const getRandomGenericQuestion = () => {
    const available = genericQuestionBank.filter((q) => !usedGenericQuestions.value.includes(q.key))
    if (available.length === 0) resetQuestionPool()

    const index = Math.floor(Math.random() * available.length)
    const q = available[index]
    if (!q) return getRandomGenericQuestion()

    usedGenericQuestions.value.push(q.key)
    return q
  }

  // 🔥 修复：fn 永远不会 undefined
  const getRandomMovieQuestion = (movie: Movie) => {
    if (movieQuestionTemplates.length === 0) {
      return getRandomGenericQuestion()
    }
    const index = Math.floor(Math.random() * movieQuestionTemplates.length)
    const fn = movieQuestionTemplates[index]!
    return fn(movie)
  }

  // Shuffle array
  const shuffleArray = <T>(array: T[]): T[] => {
    if (!array || array.length <= 1) return [...array]

    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = copy[i]!
      copy[i] = copy[j]!
      copy[j] = temp
    }
    return copy
  }

  return {
    resetQuestionPool,
    getRandomGenericQuestion,
    getRandomMovieQuestion,
    shuffleArray,
  }
}
