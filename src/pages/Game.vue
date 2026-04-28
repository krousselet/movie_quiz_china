<template>
  <section class="game-page">
    <div class="cinema-overlay"></div>

    <div v-if="isLoading" class="loading">{{ t('game.loading') }}</div>

    <div class="game-container" v-else>
      <!-- TOP: STATS -->
      <GameStats
        :score="score"
        :streak="streak"
        :time="formattedTime"
        :show-timer="mode === 'beat-the-clock'"
      />

      <!-- MIDDLE: POSTER + HANGMAN (FLEXIBLE AREA) -->
      <div class="middle-section">
        <MoviePoster
          :poster="currentMovie?.poster_path"
          :sliding="isSkipping"
          :correct="isCorrect"
          :wrong="isWrong"
        />
        <HangmanMask :mask="hangmanMask" />
      </div>

      <!-- JOKERS -->
      <div class="joker-row">
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
            {{ t('rules.jokers.btcPause', { secPause: 10 }) }} ({{ jokers.stopTimer }})
          </GameButton>
          <GameButton variant="joker" :is-disabled="jokers.addTime <= 0" @click="handleAddTime">
            {{ t('rules.jokers.btcAdd', { secAdd: 15 }) }} ({{ jokers.addTime }})
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
            {{ t('rules.jokers.str1') }} ({{ jokers.protectStreak }})
          </GameButton>
          <GameButton
            variant="joker"
            :is-disabled="jokers.instantWin <= 0"
            @click="handleInstantWin"
          >
            {{ t('game.instantWin') }} ({{ jokers.instantWin }})
          </GameButton>
        </template>
      </div>

      <!-- BOTTOM: INPUT + BUTTONS -->
      <div class="bottom-section">
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

        <div class="feedback" :class="feedbackType">
          <span v-if="feedbackType === 'perfect'">{{ t('game.perfect') }}</span>
          <span v-else-if="feedbackType === 'close'">{{ t('game.close') }}</span>
          <span v-else-if="feedbackType === 'almost'">{{ t('game.almost') }}</span>
          <span v-else-if="feedbackType === 'wrong'">
            {{ t('game.wrong') }}! {{ t('game.answer') }}: {{ correctAnswer }}
          </span>
        </div>
      </div>
    </div>

    <!-- WIN / LOSE MODAL -->
    <div v-if="gameWon || gameOver" class="end-modal">
      <div class="modal-card" :class="{ win: gameWon, lose: gameOver }">
        <h1 class="modal-title">
          <span v-if="gameWon">🎉 You Won!</span>
          <span v-if="gameOver">💀 Game Over</span>
        </h1>
        <div class="stats">
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
        <div class="modal-buttons">
          <GameButton variant="success" @click="endClassicGame"> Save Score </GameButton>
          <GameButton variant="danger" @click="endSession"> Quit </GameButton>
        </div>
      </div>
    </div>

    <div v-if="showFiftyModal" class="modal-overlay">
      <div class="modal-card">
        <h3>{{ t('game.correctTitle') }}</h3>
        <div class="choices">
          <GameButton variant="choice" @click="choose(option1)">{{ option1 }}</GameButton>
          <GameButton variant="choice" @click="choose(option2)">{{ option2 }}</GameButton>
        </div>
      </div>
    </div>
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

// GOD MODE
const cheatActive = ref(false)
watch(userAnswer, (val) => {
  if (val === 'god') {
    cheatActive.value = true
    userAnswer.value = ''
    console.log('✅ CHEAT ACTIVE')
  }
})

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
const { feedbackType, correctAnswer, isCorrect, isWrong, check, reset } = useAnswerChecker()

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

let timer
let timeLeft
let startTimer
let stopTimerFor
let addTime
let getWinStreak

const formattedTime = computed(() => {
  if (!timeLeft) return '00:00'
  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0')
  const s = String(timeLeft.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

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

  if (cheatActive.value) {
    userAnswer.value = currentMovie.value.title
  }

  if (!userAnswer.value.trim()) {
    showError.value = true
    setTimeout(() => (showError.value = false), 2000)
    return
  }

  check(
    userAnswer.value,
    currentMovie.value.title,
    (pts) => {
      addScore(pts)
      addStreak()

      if (mode.value === 'longest-streak' && streak.value >= requiredStreak.value) {
        gameWon.value = true
      }
    },
    () => {
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
  }, 2000)
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
  if (timer?.value) timer.value.clear()
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

  const timerStuff = useGameTimer(winCond.getTimerDuration())
  timer = timerStuff.timer
  timeLeft = timerStuff.timeLeft
  startTimer = timerStuff.startTimer
  stopTimerFor = timerStuff.stopTimerFor
  addTime = timerStuff.addTime

  isLoading.value = true
  const movies = await tmdb.getRandomMovies(20, locale.value)
  movieList.value = movies
  currentMovie.value = movies[0] || null

  if (currentMovie.value) hangmanMask.value = buildHangmanMask(currentMovie.value.title)

  isLoading.value = false
  if (mode.value === 'beat-the-clock') startTimer(endSession)
})

onUnmounted(() => {
  if (timer?.value) timer.value.clear()
})
</script>

<style scoped>
.game-page {
  height: 100vh;
  width: 100vw;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  position: relative;
  font-family: Arial, sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

.cinema-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, #000 130%);
  z-index: 0;
}

.game-container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.4rem;
  text-align: center;
  box-sizing: border-box;
  padding: 0.4rem 0;
}

.middle-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 0;
}

.joker-row {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
}

.answer-box {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 2.2rem;
}

.answer-input {
  flex: 1 1 130px;
  max-width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  color: white;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.feedback {
  font-size: clamp(0.85rem, 2.5vw, 1rem);
  font-weight: bold;
  min-height: 20px;
}
.feedback.perfect {
  color: #22c55e;
}
.feedback.wrong {
  color: #ef4444;
}

.error-text {
  color: #f87171;
  font-size: 0.8rem;
  margin: 0;
}

/* MODALS */
.end-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-card {
  background: #1e293b;
  padding: 1.4rem;
  border-radius: 16px;
  text-align: center;
  width: 100%;
  max-width: 380px;
  border: 2px solid #64748b;
  box-sizing: border-box;
}

.modal-card.win {
  border-color: #22c55e;
}
.modal-card.lose {
  border-color: #ef4444;
}

.modal-title {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  margin-bottom: 0.8rem;
}

.stats {
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.modal-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 1rem;
  box-sizing: border-box;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

:deep(.game-button) {
  padding: 0.5rem 0.8rem !important;
  font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
  white-space: nowrap;
}
</style>
