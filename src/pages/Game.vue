<template>
  <section class="game-page">
    <div class="cinema-overlay"></div>

    <Teleport to="body">
      <div
        class="feedback-toast"
        :class="{
          show: !!feedbackMessage,
          perfect: feedbackType === 'perfect',
          wrong: feedbackType === 'wrong',
        }"
      >
        {{ feedbackMessage }}
      </div>
    </Teleport>

    <InvestigationQuiz
      v-if="isInvestigation"
      :visible="showQuizTogglable"
      :current-step="investigationStep"
      :total-steps="totalInvestigationSteps"
      :question="currentQuestion"
      :choices="currentChoices"
      @answer="handleInvestigationAnswer"
      @toggle-quiz="showQuizTogglable = false"
    />

    <div v-if="isLoading" class="loading">{{ t('game.loading') }}</div>

    <div class="game-container" v-else>
      <GameStats
        :score="score"
        :streak="streak"
        :time="formattedTime"
        :show-timer="mode === 'beat-the-clock'"
      />

      <div class="game-middle">
        <MoviePoster
          :poster="currentMovie?.poster_path"
          :sliding="isSkipping"
          :correct="isCorrect"
          :wrong="isWrong"
          :blur="currentBlur"
        />
        <HangmanMask :mask="hangmanMask" />
      </div>

      <div class="game-jokers">
        <template v-if="mode === 'classic'">
          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.revealLetter <= 0"
            @click="handleRevealLetter"
          >
            {{ t('rules.jokers.btcReveal') }} ({{
              (activeJokers?.jokers as any)?.revealLetter ?? 0
            }})
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.skip <= 0"
            @click="handleAutoCorrect"
          >
            {{ t('rules.jokers.str2') }} ({{ (activeJokers?.jokers as any)?.skip ?? 0 }})
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.fiftyFifty <= 0"
            @click="openFiftyFifty"
          >
            50/50 ({{ (activeJokers?.jokers as any)?.fiftyFifty ?? 0 }})
          </GameButton>
        </template>

        <template v-if="mode === 'beat-the-clock'">
          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.skip <= 0"
            @click="handleSkip"
          >
            {{ t('rules.jokers.btcSkip') }} ({{ (activeJokers?.jokers as any)?.skip ?? 0 }})
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.stopTimer <= 0"
            @click="handleStopTimer"
          >
            {{ t('rules.jokers.btcPause') }}
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.addTime <= 0"
            @click="handleAddTime"
          >
            {{ t('rules.jokers.btcAdd') }}
          </GameButton>
        </template>

        <template v-if="mode === 'longest-streak'">
          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.skip <= 0"
            @click="handleSkip"
          >
            {{ t('rules.jokers.str2') }} ({{ (activeJokers?.jokers as any)?.skip ?? 0 }})
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.protectStreak <= 0"
            @click="handleProtectStreak"
          >
            {{ t('rules.jokers.str1') }}
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="(activeJokers?.jokers as any)?.instantWin <= 0"
            @click="handleInstantWin"
          >
            {{ t('game.instantWin') }}
          </GameButton>
        </template>

        <GameButton
          v-if="isInvestigation"
          variant="joker"
          @click="showQuizTogglable = !showQuizTogglable"
        >
          {{ showQuizTogglable ? t('game.hideQuiz') : t('game.showQuiz') }}
        </GameButton>
      </div>

      <div class="game-bottom">
        <div class="answer-box">
          <input
            v-model="userAnswer"
            @keyup.enter="checkAnswer"
            :placeholder="t('game.placeholder')"
            class="answer-input"
            :class="{ error: showError }"
          />
          <GameButton variant="submit" @click="checkAnswer">
            {{ t('game.submit') }}
          </GameButton>

          <GameButton v-if="mode === 'classic'" variant="success" @click="endClassicGame">
            {{ t('game.endClassic') }}
          </GameButton>

          <GameButton variant="danger" @click="endSession">
            {{ t('game.quit') }}
          </GameButton>
        </div>
        <p v-if="showError" class="error-text">{{ t('game.empty') }}</p>
      </div>
    </div>

    <div v-if="gameOver" class="game-modal-overlay show">
      <div class="game-modal" :class="{ win: hasWon, lose: hasLost }">
        <h2 class="modal-title">
          <span v-if="hasWon">🎉 You Won!</span>
          <span v-else>💀 Game Over</span>
        </h2>
        <div class="modal-stats">
          <p>
            Streak: <b>{{ streak }}</b>
          </p>
          <p>
            Score: <b>{{ score }}</b>
          </p>
        </div>
        <div class="modal-actions">
          <GameButton variant="success" @click="endClassicGame">Save Score</GameButton>
          <GameButton variant="danger" @click="endSession">Quit</GameButton>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showFiftyModal" class="fifty-modal-overlay">
        <div class="fifty-modal">
          <h3>{{ t('game.correctTitle') }}</h3>
          <div class="fifty-choices">
            <GameButton variant="choice" @click="choose(option1)">{{ option1 }}</GameButton>
            <GameButton variant="choice" @click="choose(option2)">{{ option2 }}</GameButton>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import GameStats from '@/components/game/ui/GameStats.vue'
import MoviePoster from '@/components/game/ui/MoviePoster.vue'
import HangmanMask from '@/components/game/ui/HangmanMask.vue'
import GameButton from '@/components/game/ui/GameButton.vue'
import InvestigationQuiz from '@/components/game/InvestigationQuiz.vue'

import { TMDBService } from '@/core/TMDBService'
import { useGameLogic } from '@/composables/game/useGameLogic'
import { useHangman } from '@/composables/game/useHangman'
import { useAnswerChecker } from '@/composables/game/useAnswerChecker'
import { useGameTimer } from '@/composables/useGameTimer'
import { useGameWinCondition } from '@/composables/useGameWinCondition'
import { useInvestigationQuestions } from '@/composables/game/useInvestigationQuestions'
import { createJokerSet } from '@/composables/useJokers'
import { useGameModeBase } from '@/composables/game/modes/useGameModeBase'

import { INVESTIGATION_DIFFICULTY } from '@/constants/gameConfig'
import type { GameMode, Movie, InvestigationChoice } from '@/types/game.types'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const tmdb = new TMDBService()

const gameLogic = useGameLogic()
const {
  score,
  streak,
  maxStreak,
  isLoading,
  isSkipping,
  hangmanMask,
  currentMovie,
  movieList,
  addScore,
  addStreak,
  breakStreak,
  setActiveJokers,
} = gameLogic as any

const mode = ref<GameMode>('classic')
const difficulty = ref<string>('easy')
const userAnswer = ref<string>('')
const showError = ref<boolean>(false)
const showFiftyModal = ref<boolean>(false)
const option1 = ref<string>('')
const option2 = ref<string>('')

const baseMode = useGameModeBase()
const { feedbackType, feedbackMessage, clearFeedback } = baseMode

const { buildHangmanMask, revealLetterInMask } = useHangman()
const { isCorrect, isWrong, check, reset } = useAnswerChecker()

const winCond = useGameWinCondition(difficulty.value)
const timer = useGameTimer(winCond.getTimerDuration())

const formattedTime = computed<string>(() => {
  const sec = timer.timeLeft.value || 0
  const m = String(Math.floor(sec / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${m}:${s}`
})

const { checkWin, getWinStreak } = useGameWinCondition(difficulty.value)

const hasWon = computed(() => {
  switch (mode.value) {
    case 'classic':
    case 'beat-the-clock':
      return checkWin(score.value)
    case 'longest-streak':
      return streak.value >= getWinStreak()
    case 'investigation':
      return investigationStep.value >= totalInvestigationSteps.value
    default:
      return false
  }
})

const hasLost = computed(() => {
  if (!activeJokers) return false
  switch (mode.value) {
    case 'classic':
      return isWrong.value
    case 'beat-the-clock':
      return timer.isFinished.value && !checkWin(score.value)
    case 'longest-streak':
      return isWrong.value && !activeJokers.streakProtected.value
    case 'investigation':
      return wrongAttempts.value >= investigationRules.value.maxWrongAttempts
    default:
      return false
  }
})

const gameOver = computed(() => hasWon.value || hasLost.value)

let activeJokers: any = null

const isInvestigation = computed<boolean>(() => mode.value === 'investigation')
const investigationStep = ref<number>(1)
const totalInvestigationSteps = ref<number>(5)
const currentBlur = ref<number>(0)
const showQuizTogglable = ref<boolean>(true)
const wrongAttempts = ref<number>(0)
const currentQuestion = ref<string>('')
const currentChoices = ref<InvestigationChoice[]>([])

const { resetQuestionPool, getRandomGenericQuestion, getRandomMovieQuestion, shuffleArray } =
  useInvestigationQuestions()
const investigationRules = computed(() => {
  const key = difficulty.value as keyof typeof INVESTIGATION_DIFFICULTY
  return INVESTIGATION_DIFFICULTY[key] || INVESTIGATION_DIFFICULTY.normal
})

const playSound = (type: 'perfect' | 'wrong'): void => {
  const map: Record<string, string> = {
    perfect: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
    wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-wrong-1470.mp3',
  }
  const audio = new Audio(map[type])
  audio.volume = 0.7
  audio.play().catch(() => {})
}

const showFeedback = (msg: string, type: 'perfect' | 'wrong'): void => {
  feedbackMessage.value = msg
  feedbackType.value = type
  playSound(type)
  clearFeedback()
  baseMode.feedbackTimeout.value = window.setTimeout(() => {
    feedbackMessage.value = ''
    feedbackType.value = ''
  }, 1800)
}

const loadInvestigationQuestion = (): void => {
  if (!currentMovie.value) return
  const q =
    investigationStep.value <= 2
      ? getRandomGenericQuestion()
      : getRandomMovieQuestion(currentMovie.value)
  currentQuestion.value = t(q.key)
  currentChoices.value = shuffleArray(
    q.answers.map((ans: any, i: number) => ({
      id: i + 1,
      text: ans.textKey ? t(ans.textKey) : ans.text || '?',
      correct: ans.correct,
    })),
  )
}

const handleInvestigationAnswer = (choice: InvestigationChoice): void => {
  const rules = investigationRules.value
  if (choice.correct) {
    showFeedback(t('game.perfect'), 'perfect')
    currentBlur.value = Math.max(0, currentBlur.value - rules.unblurAmount)
  } else {
    showFeedback(t('game.wrong'), 'wrong')
    currentBlur.value = Math.min(30, currentBlur.value + rules.blurOnWrong)
    wrongAttempts.value++
  }
  investigationStep.value++
  loadInvestigationQuestion()
}

const nextMovie = (): void => {
  if (!movieList.value.length || !currentMovie.value) return
  isSkipping.value = true
  setTimeout(() => {
    const list = movieList.value as Movie[]
    const idx = list.findIndex((m: Movie) => m.id === currentMovie.value!.id)
    currentMovie.value = list[(idx + 1) % list.length]
    hangmanMask.value = buildHangmanMask(currentMovie.value.title)
    isSkipping.value = false
    reset()
    userAnswer.value = ''
  }, 400)
}

const checkAnswer = (): void => {
  if (!currentMovie.value) return
  if (!userAnswer.value.trim()) {
    showError.value = true
    setTimeout(() => (showError.value = false), 2000)
    return
  }
  check(
    userAnswer.value,
    currentMovie.value.title,
    (pts: number) => {
      addScore(pts)
      addStreak()
      showFeedback(t('game.perfect'), 'perfect')
      currentBlur.value = 0
      nextMovie()
    },
    () => {
      showFeedback(t('game.wrong'), 'wrong')
      breakStreak()
    },
  )
  setTimeout(() => {
    reset()
    userAnswer.value = ''
  }, 700)
}

const handleRevealLetter = () => {
  if (!activeJokers?.useRevealLetter || !currentMovie.value) return
  activeJokers.useRevealLetter()
  hangmanMask.value = revealLetterInMask(currentMovie.value.title, hangmanMask.value)
}

const handleAutoCorrect = (): void => {
  if (!activeJokers?.useAutoCorrect) return
  activeJokers.useAutoCorrect(() => {
    userAnswer.value = currentMovie.value?.title || ''
    checkAnswer()
  })
}

const openFiftyFifty = (): void => {
  if (!activeJokers?.useFiftyFifty || !currentMovie.value) return
  const res = activeJokers.useFiftyFifty(currentMovie.value, movieList.value)
  if (!res) return
  option1.value = res.correct
  option2.value = res.fake
  showFiftyModal.value = true
}

const choose = (val: string): void => {
  showFiftyModal.value = false
  userAnswer.value = val
  checkAnswer()
}

const handleSkip = (): void => {
  if (!activeJokers?.useSkip) return
  activeJokers.useSkip()
  nextMovie()
}

const handleStopTimer = (): void => {
  if (!activeJokers?.useStopTimer) return
  activeJokers.useStopTimer(timer)
}

const handleAddTime = (): void => {
  if (!activeJokers?.useAddTime) return
  activeJokers.useAddTime(timer)
}

const handleProtectStreak = (): void => {
  if (!activeJokers?.useProtectStreak) return
  activeJokers.useProtectStreak()
}

const handleInstantWin = (): void => {
  if (!activeJokers?.useInstantWin) return
  activeJokers.useInstantWin(() => {
    userAnswer.value = currentMovie.value?.title || ''
    checkAnswer()
  })
}

const endSession = (): void => {
  timer.clearTimer()
  router.push('/')
}

const endClassicGame = (): void => {
  const stats = {
    score: score.value,
    bestStreak: maxStreak.value,
    difficulty: difficulty.value,
    mode: mode.value,
    date: new Date().toISOString(),
  }
  const board = JSON.parse(localStorage.getItem('leaderboard') || '[]')
  board.push(stats)
  board.sort((a: { score: number }, b: { score: number }) => b.score - a.score)
  localStorage.setItem('leaderboard', JSON.stringify(board.slice(0, 100)))
  router.push('/leaderboard')
}

onMounted(async () => {
  mode.value = (route.query.mode as GameMode) || 'classic'
  difficulty.value = (route.query.difficulty as string) || 'easy'

  activeJokers = createJokerSet(mode.value)
  setActiveJokers(activeJokers)

  isLoading.value = true
  const movies = await tmdb.getRandomMovies(20, 'fr')
  movieList.value = movies
  currentMovie.value = movies[0] ?? null
  hangmanMask.value = currentMovie.value ? buildHangmanMask(currentMovie.value.title) : ''
  isLoading.value = false

  if (isInvestigation.value) {
    resetQuestionPool()
    loadInvestigationQuestion()
  }

  if (mode.value === 'beat-the-clock') {
    timer.timeLeft.value = winCond.getTimerDuration()
    timer.startTimer(endSession)
  }
})

onUnmounted(() => {
  timer.clearTimer()
  clearFeedback()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_game.scss';
</style>
