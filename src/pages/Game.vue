<template>
  <section class="game-page">
    <div class="cinema-overlay"></div>

    <div v-if="isLoading" class="loading">{{ $t('game.loading') }}</div>

    <div class="game-container" v-else>
      <!-- STATS -->
      <GameStats
        :score="score"
        :streak="streak"
        :time="formattedTime"
        :show-timer="mode === 'beat-the-clock'"
      />

      <!-- MOVIE POSTER -->
      <MoviePoster
        :poster="currentMovie?.poster_path"
        :sliding="isSkipping"
        :correct="isCorrect"
        :wrong="isWrong"
      />

      <!-- HANGMAN -->
      <HangmanMask :mask="hangmanMask" />

      <!-- JOKERS -->
      <div class="joker-row">
        <!-- ALWAYS SHOW -->
        <GameButton
          variant="joker"
          :is-disabled="jokers.revealLetter <= 0"
          @click="handleRevealLetter"
        >
          {{ $t('rules.jokers.btcReveal') }} ({{ jokers.revealLetter }})
        </GameButton>

        <!-- CLASSIC -->
        <template v-if="mode === 'classic'">
          <GameButton variant="joker" :is-disabled="jokers.skip <= 0" @click="handleAutoCorrect">
            {{ $t('rules.jokers.str2') }} ({{ jokers.skip }})
          </GameButton>

          <GameButton variant="joker" :is-disabled="jokers.fiftyFifty <= 0" @click="openFiftyFifty">
            50/50 ({{ jokers.fiftyFifty }})
          </GameButton>
        </template>

        <!-- BEAT THE CLOCK -->
        <template v-else-if="mode === 'beat-the-clock'">
          <GameButton variant="joker" :is-disabled="jokers.skip <= 0" @click="useSkip(nextMovie)">
            {{ $t('rules.jokers.btcSkip') }} ({{ jokers.skip }})
          </GameButton>

          <GameButton variant="joker" :is-disabled="jokers.stopTimer <= 0" @click="handleStopTimer">
            {{ $t('rules.jokers.btcPause', { secPause: 10 }) }}
            ({{ jokers.stopTimer }})
          </GameButton>

          <GameButton variant="joker" :is-disabled="jokers.addTime <= 0" @click="handleAddTime">
            {{ $t('rules.jokers.btcAdd', { secAdd: 15 }) }}
            ({{ jokers.addTime }})
          </GameButton>
        </template>

        <!-- LONGEST STREAK -->
        <template v-else-if="mode === 'longest-streak'">
          <GameButton variant="joker" :is-disabled="jokers.skip <= 0" @click="useSkip(nextMovie)">
            {{ $t('rules.jokers.str2') }} ({{ jokers.skip }})
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="jokers.protectStreak <= 0"
            @click="handleProtectStreak"
          >
            {{ $t('rules.jokers.str1') }} ({{ jokers.protectStreak }})
          </GameButton>

          <GameButton
            variant="joker"
            :is-disabled="jokers.instantWin <= 0"
            @click="handleInstantWin"
          >
            {{ $t('game.instantWin') }} ({{ jokers.instantWin }})
          </GameButton>
        </template>
      </div>

      <!-- ANSWER INPUT -->
      <div class="answer-box">
        <input
          v-model="userAnswer"
          @keyup.enter="checkAnswer"
          :placeholder="$t('game.placeholder')"
          class="answer-input"
          :class="{ error: showError }"
        />
        <GameButton variant="submit" @click="checkAnswer">
          {{ $t('game.submit') }}
        </GameButton>
      </div>

      <p v-if="showError" class="error-text">{{ $t('game.empty') }}</p>

      <!-- FEEDBACK -->
      <div class="feedback" :class="feedbackType">
        <span v-if="feedbackType === 'perfect'">{{ $t('game.perfect') }}</span>
        <span v-else-if="feedbackType === 'close'">{{ $t('game.close') }}</span>
        <span v-else-if="feedbackType === 'almost'">{{ $t('game.almost') }}</span>
        <span v-else-if="feedbackType === 'wrong'">
          {{ $t('game.wrong') }}! {{ $t('game.answer') }}: {{ correctAnswer }}
        </span>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="button-row">
        <GameButton variant="skip" @click="nextMovie">
          {{ $t('game.skip') }}
        </GameButton>
        <GameButton variant="danger" @click="endSession">
          {{ $t('game.quit') }}
        </GameButton>
      </div>
    </div>

    <!-- 50/50 MODAL -->
    <div v-if="showFiftyModal" class="modal-overlay">
      <div class="modal-card">
        <h3>{{ $t('game.correctTitle') }}</h3>
        <div class="choices">
          <GameButton variant="choice" @click="choose(option1)">{{ option1 }}</GameButton>
          <GameButton variant="choice" @click="choose(option2)">{{ option2 }}</GameButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n' // ⬅️ ADD THIS
const { t } = useI18n() // ⬅️ ADD THIS

// UI
import '@/components/game/ui/game-ui.css'
import GameStats from '@/components/game/ui/GameStats.vue'
import MoviePoster from '@/components/game/ui/MoviePoster.vue'
import HangmanMask from '@/components/game/ui/HangmanMask.vue'
import GameButton from '@/components/game/ui/GameButton.vue'

// CORE
import { TMDBService } from '@/core/TMDBService'
import { useGameLogic } from '@/composables/game/useGameLogic'
import { useHangman } from '@/composables/game/useHangman'
import { useAnswerChecker } from '@/composables/game/useAnswerChecker'
import { useJokers } from '@/composables/useJokers'
import { useGameTimer } from '@/composables/useGameTimer'
import { useGameWinCondition } from '@/composables/useGameWinCondition'

const route = useRoute()
const router = useRouter()
const tmdb = new TMDBService()

const mode = ref(route.query.mode || 'classic')
const difficulty = ref(route.query.difficulty || 'easy')
const userAnswer = ref('')
const showError = ref(false)
const showFiftyModal = ref(false)
const option1 = ref('')
const option2 = ref('')

// Logic
const {
  score,
  streak,
  currentMovie,
  movieList,
  isLoading,
  isSkipping,
  hangmanMask,
  addScore,
  addStreak,
  breakStreak,
} = useGameLogic()

const { buildHangmanMask, revealLetterInMask } = useHangman()
const { feedbackType, correctAnswer, isCorrect, isWrong, check, reset } = useAnswerChecker()

// Jokers
const {
  jokers,
  streakProtected,
  useSkip,
  useAutoCorrect,
  useFiftyFifty,
  useStopTimer,
  useAddTime,
  useProtectStreak,
  useInstantWin,
} = useJokers()

provide('streakProtected', streakProtected)

// Timer
const winCond = useGameWinCondition(difficulty.value)
const timer = useGameTimer(winCond.getTimerDuration())

const formattedTime = computed(() => {
  const m = String(Math.floor(timer.timeLeft.value / 60)).padStart(2, '0')
  const s = String(timer.timeLeft.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

// ------------------------------
// GAME LOGIC
// ------------------------------
const nextMovie = () => {
  if (!movieList.value || movieList.value.length === 0) return

  isSkipping.value = true

  setTimeout(() => {
    const currentId = currentMovie.value?.id
    const index = movieList.value.findIndex((m) => m.id === currentId)
    const nextIndex = (index + 1) % movieList.value.length

    currentMovie.value = movieList.value[nextIndex] || null

    if (currentMovie.value) {
      hangmanMask.value = buildHangmanMask(currentMovie.value.title)
    }

    isSkipping.value = false
    reset()
    userAnswer.value = ''
  }, 400)
}

const checkAnswer = () => {
  if (!userAnswer.value.trim()) {
    showError.value = true
    setTimeout(() => (showError.value = false), 2000)
    return
  }
  if (!currentMovie.value) return

  check(
    userAnswer.value,
    currentMovie.value.title,
    (pts) => {
      addScore(pts)
      addStreak()
    },
    () => {
      breakStreak()
    },
  )

  setTimeout(() => {
    reset()
    userAnswer.value = ''
    nextMovie()
  }, 2000)
}

// ------------------------------
// JOKERS
// ------------------------------
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

const handleStopTimer = () => useStopTimer(difficulty.value, timer.stopTimerFor)
const handleAddTime = () => useAddTime(difficulty.value, timer.addTime)
const handleProtectStreak = () => useProtectStreak()
const handleInstantWin = () =>
  useInstantWin(() => {
    userAnswer.value = currentMovie.value.title
    checkAnswer()
  })

// ------------------------------
// SESSION
// ------------------------------
const endSession = () => {
  timer.clearTimer()
  router.push('/')
}

onMounted(async () => {
  isLoading.value = true
  const movies = await tmdb.getRandomMovies()
  movieList.value = movies
  currentMovie.value = movies[0] || null

  if (currentMovie.value) {
    hangmanMask.value = buildHangmanMask(currentMovie.value.title)
  }

  isLoading.value = false
  if (mode.value === 'beat-the-clock') timer.startTimer(endSession)
})

onUnmounted(() => timer.clearTimer())
</script>

<style scoped>
.game-page {
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: #0f172a;
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.game-container {
  width: 100%;
  max-width: 90vw;
  height: 95vh;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  overflow: hidden;
}

.hangman-mask {
  font-size: clamp(1.2rem, 4vw, 2rem);
  color: #fbbf24;
  margin: 0.5rem 0;
  min-height: 30px;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  flex-wrap: wrap;
}

.joker-row {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
}

.answer-box {
  display: flex;
  gap: 0.5rem;
  margin: 0;
}

.answer-input {
  flex: 1;
  padding: 0.7rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
}

.button-row {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 0.2rem;
}

.feedback {
  padding: 0.4rem;
  border-radius: 8px;
  margin: 0.2rem 0;
  font-weight: bold;
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  min-height: 24px;
}

.feedback.perfect {
  color: #22c55e;
}
.feedback.close {
  color: #fbbf24;
}
.feedback.almost {
  color: #fb923c;
}
.feedback.wrong {
  color: #ef4444;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-card {
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid #fbbf24;
  width: 90%;
  max-width: 420px;
  text-align: center;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
}

:global(body),
:global(html),
:global(#app) {
  overflow: hidden !important;
  height: 100vh !important;
}
</style>
