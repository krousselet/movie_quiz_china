<template>
  <section class="game-page">
    <div class="cinema-overlay"></div>

    <!-- ✅ TOAST TELEPORTED TO BODY (ALWAYS VISIBLE) -->
    <Teleport to="body">
      <div
        class="feedback-toast"
        :class="{
          show: !!feedbackMessage,
          perfect: feedbackType === 'perfect',
          almost: feedbackType === 'almost',
          close: feedbackType === 'close',
          wrong: feedbackType === 'wrong',
        }"
      >
        {{ feedbackMessage }}
      </div>
    </Teleport>

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
        />
        <HangmanMask :mask="hangmanMask" />
      </div>

      <div class="game-jokers">
        <GameButton
          variant="joker"
          :is-disabled="jokers.revealLetter <= 0"
          @click="handleRevealLetter"
        >
          {{ t('rules.jokers.btcReveal') }} ({{ jokers.revealLetter }})
        </GameButton>

        <template v-if="mode === 'classic'">
          <GameButton variant="joker" :is-disabled="jokers.skip <= 0" @click="handleAutoCorrect">
            {{ t('rules.jokers.str2') }} ({{ jokers.skip }})
          </GameButton>
          <GameButton variant="joker" :is-disabled="jokers.fiftyFifty <= 0" @click="openFiftyFifty">
            50/50 ({{ jokers.fiftyFifty }})
          </GameButton>
        </template>

        <template v-else-if="mode === 'beat-the-clock'">
          <GameButton variant="joker" :is-disabled="jokers.skip <= 0" @click="useSkip(nextMovie)">
            {{ t('rules.jokers.btcSkip') }} ({{ jokers.skip }})
          </GameButton>
          <GameButton variant="joker" :is-disabled="jokers.stopTimer <= 0" @click="handleStopTimer">
            {{ t('rules.jokers.btcPause') }}
          </GameButton>
          <GameButton variant="joker" :is-disabled="jokers.addTime <= 0" @click="handleAddTime">
            {{ t('rules.jokers.btcAdd') }}
          </GameButton>
        </template>

        <template v-else-if="mode === 'longest-streak'">
          <GameButton variant="joker" :is-disabled="jokers.skip <= 0" @click="useSkip(nextMovie)">
            {{ t('rules.jokers.str2') }} ({{ jokers.skip }})
          </GameButton>
          <GameButton
            variant="joker"
            :is-disabled="jokers.protectStreak <= 0"
            @click="useProtectStreak"
          >
            {{ t('rules.jokers.str1') }}
          </GameButton>
          <GameButton
            variant="joker"
            :is-disabled="jokers.instantWin <= 0"
            @click="handleInstantWin"
          >
            {{ t('game.instantWin') }}
          </GameButton>
        </template>
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

    <!-- Game Win / Game Over Modal -->
    <div
      v-if="gameWon || gameOver"
      class="game-modal-overlay"
      :class="{ show: gameWon || gameOver }"
    >
      <div class="game-modal" :class="{ win: gameWon, lose: gameOver }">
        <h2 class="modal-title">
          <span v-if="gameWon">🎉 You Won!</span>
          <span v-if="gameOver">💀 Game Over</span>
        </h2>
        <div class="modal-stats">
          <p>
            Streak: <b>{{ streak }}</b>
          </p>
          <p>
            Required: <b>{{ requiredStreak }}</b>
          </p>
          <p>
            Score: <b>{{ score }}</b>
          </p>
        </div>
        <div class="modal-actions">
          <GameButton variant="success" @click="endClassicGame"> Save Score </GameButton>
          <GameButton variant="danger" @click="endSession">Quit</GameButton>
        </div>
      </div>
    </div>

    <!-- ✅ 50/50 MODAL TELEPORTED TO BODY (FULLSCREEN CENTERED) -->
    <Teleport to="body">
      <div v-if="showFiftyModal" class="fifty-modal-overlay">
        <div class="fifty-modal">
          <h3>{{ t('game.correctTitle') }}</h3>
          <div class="fifty-choices">
            <GameButton variant="choice" @click="choose(option1)">
              {{ option1 }}
            </GameButton>
            <GameButton variant="choice" @click="choose(option2)">
              {{ option2 }}
            </GameButton>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import '@/components/game/ui/game-ui.css'
import GameStats from '@/components/game/ui/GameStats.vue'
import MoviePoster from '@/components/game/ui/MoviePoster.vue'
import HangmanMask from '@/components/game/ui/HangmanMask.vue'
import GameButton from '@/components/game/ui/GameButton.vue'

import { TMDBService } from '@/core/TMDBService'
import { useGameLogic } from '@/composables/game/useGameLogic'
import { useHangman } from '@/composables/game/useHangman'
import { useAnswerChecker } from '@/composables/game/useAnswerChecker'
import { useJokers } from '@/composables/useJokers'
import { useGameTimer } from '@/composables/useGameTimer'
import { useGameWinCondition } from '@/composables/useGameWinCondition'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const tmdb = new TMDBService()

const mode = ref('')
const difficulty = ref('')
const userAnswer = ref('')
const showError = ref(false)
const showFiftyModal = ref(false)
const option1 = ref('')
const option2 = ref('')

const feedbackType = ref('')
const cheatActive = ref(false)

const feedbackMessage = ref('')
const feedbackTimeout = ref(null)

// ------------------------------
// ✅ TIMER VARIABLES — ALL DECLARED
// ------------------------------
let timeLeft = ref(0)
let startTimer
let stopTimerFor
let addTime
let clearTimer // ✅ DECLARED HERE
let getWinStreak

const formattedTime = computed(() => {
  const sec = timeLeft.value || 0
  const m = String(Math.floor(sec / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${m}:${s}`
})

// Sounds
const playSound = (type) => {
  const sounds = {
    perfect: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
    almost: new Audio(
      'https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3',
    ),
    close: new Audio(
      'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3',
    ),
    wrong: new Audio(
      'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-wrong-1470.mp3',
    ),
  }
  if (sounds[type]) {
    sounds[type].volume = 0.7
    sounds[type].play().catch(() => {})
  }
}

const showFeedback = (msg, type) => {
  feedbackMessage.value = msg
  feedbackType.value = type
  playSound(type)

  if (feedbackTimeout.value) clearTimeout(feedbackTimeout.value)
  feedbackTimeout.value = setTimeout(() => {
    feedbackMessage.value = ''
    feedbackType.value = ''
  }, 1800)
}

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
} = useGameLogic()

const { buildHangmanMask, revealLetterInMask } = useHangman()
const { correctAnswer, isCorrect, isWrong, check, reset } = useAnswerChecker()

const {
  jokers,
  streakProtected,
  useSkip,
  useAutoCorrect,
  useFiftyFifty,
  useStopTimer,
  useAddTime,
  useProtectStreak,
  consumeStreakProtection,
  useInstantWin,
} = useJokers()

provide('streakProtected', streakProtected)
provide('consumeStreakProtection', consumeStreakProtection)

const gameWon = ref(false)
const gameOver = ref(false)
const requiredStreak = computed(() => getWinStreak?.() || 15)

const nextMovie = () => {
  if (!movieList.value.length) return
  isSkipping.value = true

  setTimeout(() => {
    const idx = movieList.value.findIndex((m) => m.id === currentMovie.value?.id)
    const next = (idx + 1) % movieList.value.length
    currentMovie.value = movieList.value[next]
    if (currentMovie.value) hangmanMask.value = buildHangmanMask(currentMovie.value.title)
    isSkipping.value = false
    reset()
    userAnswer.value = ''
  }, 400)
}

const checkAnswer = () => {
  if (!currentMovie.value) return
  if (cheatActive.value) userAnswer.value = currentMovie.value.title

  if (!userAnswer.value.trim()) {
    showError.value = true
    setTimeout(() => (showError.value = false), 2000)
    return
  }

  check(
    userAnswer.value,
    currentMovie.value.title,
    (pts, type) => {
      addScore(pts)
      addStreak()
      showFeedback(t('game.perfect'), 'perfect')

      if (mode.value === 'longest-streak' && streak.value >= requiredStreak.value) {
        gameWon.value = true
      }
    },
    () => {
      showFeedback(t('game.wrong'), 'wrong')

      if (mode.value === 'longest-streak') {
        breakStreak()
        if (streak.value === 0) gameOver.value = true
      } else {
        breakStreak()
      }
    },
  )

  setTimeout(() => {
    reset()
    userAnswer.value = ''
    if (!gameWon.value && !gameOver.value) nextMovie()
  }, 700)
}

const handleRevealLetter = () => {
  if (!currentMovie.value) return
  jokers.revealLetter--
  hangmanMask.value = revealLetterInMask(currentMovie.value.title, hangmanMask.value)
}

const handleAutoCorrect = () =>
  useAutoCorrect(() => {
    userAnswer.value = currentMovie.value.title
    checkAnswer()
  })

const openFiftyFifty = () => {
  const res = useFiftyFifty(currentMovie.value, movieList.value)
  if (!res) return
  option1.value = res.correct
  option2.value = res.fake
  showFiftyModal.value = true
}

const choose = (val) => {
  showFiftyModal.value = false
  userAnswer.value = val
  checkAnswer()
}

const handleStopTimer = () => useStopTimer(difficulty.value, stopTimerFor)
const handleAddTime = () => useAddTime(difficulty.value, addTime)
const handleInstantWin = () =>
  useInstantWin(() => {
    userAnswer.value = currentMovie.value.title
    checkAnswer()
  })

const endSession = () => {
  clearTimer() // ✅ NOW DEFINED
  router.push('/')
}

const endClassicGame = () => {
  const stats = {
    score: score.value,
    streak: maxStreak.value,
    difficulty: difficulty.value,
    mode: mode.value,
    date: new Date().toISOString(),
  }
  const arr = JSON.parse(localStorage.getItem('leaderboard') || '[]')
  arr.push(stats)
  arr.sort((a, b) => b.score - a.score)
  localStorage.setItem('leaderboard', JSON.stringify(arr.slice(0, 100)))
  router.push('/leaderboard')
}

onMounted(async () => {
  mode.value = route.query.mode || 'classic'
  difficulty.value = route.query.difficulty || 'easy'

  const winCond = useGameWinCondition(difficulty.value)
  getWinStreak = winCond.getWinStreak

  // ------------------------------
  // ✅ TIMER INIT — FULLY FIXED
  // ------------------------------
  const timerDuration = winCond.getTimerDuration()
  const timerStuff = useGameTimer(timerDuration)

  timeLeft = timerStuff.timeLeft
  startTimer = timerStuff.startTimer
  stopTimerFor = timerStuff.stopTimerFor
  addTime = timerStuff.addTime
  clearTimer = timerStuff.clearTimer // ✅ ASSIGNED

  isLoading.value = true
  const movies = await tmdb.getRandomMovies(20, locale.value)
  movieList.value = movies
  currentMovie.value = movies[0] || null

  if (currentMovie.value) {
    hangmanMask.value = buildHangmanMask(currentMovie.value.title)
  }

  isLoading.value = false

  // ------------------------------
  // ✅ START TIMER CORRECTLY
  // ------------------------------
  if (mode.value === 'beat-the-clock') {
    timeLeft.value = timerDuration
    startTimer(endSession)
  }
})

onUnmounted(() => {
  clearTimer() // ✅ SAFE
  if (feedbackTimeout.value) clearTimeout(feedbackTimeout.value)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/game';
</style>
