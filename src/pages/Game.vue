<template>
  <section class="game-page">
    <div class="cinema-overlay"></div>

    <div v-if="isLoading" class="global-loader">
      {{ $t('game.loading') }}
    </div>

    <div class="game-container" v-else>
      <div class="game-stats">
        <!-- ✅ FIX: No more TS error -->
        <div class="stat" :class="{ warning: timer.timeLeft.value <= 10 }">
            {{ String(Math.floor(timer.timeLeft.value / 60)).padStart(2, '0') }}:
            {{ String(timer.timeLeft.value % 60).padStart(2, '0') }}
</div>
        <div class="stat">{{ $t('game.stats.score') }}: {{ score }}</div>
        <div class="stat">{{ $t('game.stats.streak') }}: {{ streak }}</div>
      </div>

      <div
        class="poster-card"
        :class="{ correct: isCorrect, wrong: isWrong, slideOut: isSkipping }"
      >
        <img
          v-if="currentMovie"
          :src="currentMovie.poster_path"
          alt="Movie"
          class="poster"
        />
        <div v-else class="loading">Loading...</div>
      </div>

      <!-- Jokers only for beat-the-clock -->
      <div v-if="mode === 'beat-the-clock'" class="joker-row">
        <!-- ✅ FIX: All jokers work with NO TS errors -->
        <button
          class="joker-btn"
          :disabled="jokers.jokers.skip <= 0"
          @click="jokers.useSkip(nextMovie)"
        >
          Skip ({{ jokers.jokers.skip }})
        </button>

        <button
          class="joker-btn"
          :disabled="jokers.jokers.revealLetter <= 0"
          @click="handleRevealLetter"
        >
          Reveal Letter ({{ jokers.jokers.revealLetter }})
        </button>

        <button
          class="joker-btn"
          :disabled="jokers.jokers.fiftyFifty <= 0"
          @click="handleFiftyFifty"
        >
          50/50 ({{ jokers.jokers.fiftyFifty }})
        </button>
      </div>

      <div class="answer-box">
        <input
          v-model="userAnswer"
          @keyup.enter="checkAnswer"
          :placeholder="$t('game.input.placeholder')"
          class="answer-input"
          :class="{ error: showError }"
        />
        <button class="btn-submit" @click="checkAnswer">
          {{ $t('game.buttons.submit') }}
        </button>
      </div>

      <p v-if="showError" class="error-text">
        {{ $t('game.errors.emptyInput') }}
      </p>

      <div class="feedback" :class="feedbackType">
        <span v-if="feedbackType === 'perfect'">{{ $t('game.feedback.perfect') }}</span>
        <span v-else-if="feedbackType === 'close'">{{ $t('game.feedback.great') }}</span>
        <span v-else-if="feedbackType === 'almost'">{{ $t('game.feedback.almost') }}</span>
        <span v-else-if="feedbackType === 'wrong'">
          {{ $t('game.feedback.wrong') }} {{ correctAnswer }}
        </span>
      </div>

      <div class="button-row">
        <button class="btn-skip" @click="nextMovie">
          {{ $t('game.buttons.skip') }}
        </button>

        <button
          v-if="mode === 'classic'"
          class="btn-end-primary"
          @click="endAndSaveGame"
        >
          {{ $t('game.buttons.endGame') }}
        </button>

        <button v-else class="btn-end" @click="endSession">
          {{ $t('game.buttons.quit') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TMDBService } from '../core/TMDBService'
import { useGameTimer } from '@/composables/useGameTimer'
import { useJokers } from '@/composables/useJokers'
import { useGameWinCondition } from '@/composables/useGameWinCondition'
import { ANSWER_SCORE } from '@/constants/gameConfig'
import type { Movie } from '@/types'

// Route
const route = useRoute()
const router = useRouter()
const tmdb = new TMDBService()

// Base game props
const mode = ref(route.query.mode as string)
const difficulty = ref(route.query.difficulty as string)

// Core state
const score = ref(0)
const streak = ref(0)
const userAnswer = ref('')
const currentMovie = ref<Movie | null>(null)
const movieList = ref<Movie[]>([])
const isLoading = ref(true)
const isSkipping = ref(false)

// UI state
const isCorrect = ref(false)
const isWrong = ref(false)
const showError = ref(false)
const feedbackType = ref('')
const correctAnswer = ref('')

// Composables
const winCondition = useGameWinCondition(difficulty.value)
const timer = useGameTimer(winCondition.getTimerDuration())
const jokers = useJokers()

// Utils
function cleanText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim()
    .toLowerCase()
}

function calculateSimilarity(a: string, b: string): number {
  const s1 = cleanText(a)
  const s2 = cleanText(b)
  if (s1 === s2) return 1
  if (!s1 || !s2) return 0
  const words1 = new Set(s1.split(' '))
  const words2 = new Set(s2.split(' '))
  const common = [...words1].filter(w => words2.has(w)).length
  return common / Math.max(words1.size, words2.size)
}

// Answer
const checkAnswer = () => {
  const guess = userAnswer.value.trim()
  if (!guess) {
    showError.value = true
    setTimeout(() => showError.value = false, 2000)
    return
  }
  if (!currentMovie.value) return

  correctAnswer.value = currentMovie.value.title
  const sim = calculateSimilarity(guess, currentMovie.value.title)
  let resultType = 'wrong'
  let addScore = ANSWER_SCORE.wrong

  if (sim >= 0.9) { resultType = 'perfect'; addScore = ANSWER_SCORE.perfect }
  else if (sim >= 0.7) { resultType = 'close'; addScore = ANSWER_SCORE.close }
  else if (sim >= 0.5) { resultType = 'almost'; addScore = ANSWER_SCORE.almost }

  feedbackType.value = resultType
  if (addScore > 0) {
    score.value += addScore
    streak.value++
    isCorrect.value = true

    if (mode.value === 'beat-the-clock' && winCondition.checkWin(score.value)) {
      endAndSaveGame()
      return
    }
  } else {
    streak.value = 0
    isWrong.value = true
  }

  userAnswer.value = ''
  setTimeout(() => {
    isCorrect.value = false
    isWrong.value = false
    feedbackType.value = ''
    correctAnswer.value = ''
    nextMovie()
  }, 2000)
}

// Next movie
const nextMovie = () => {
  if (!movieList.value.length) return
  isSkipping.value = true
  setTimeout(() => {
    const currIdx = movieList.value.findIndex(m => m.id === currentMovie.value?.id)
    const nextIdx = (currIdx + 1) % movieList.value.length
    // FIX: undefined → null
    currentMovie.value = movieList.value[nextIdx] ?? null
    isSkipping.value = false
  }, 400)
}

// Jokers
const handleRevealLetter = () => {
  if (!currentMovie.value) return
  userAnswer.value = jokers.useRevealLetter(currentMovie.value.title, userAnswer.value)
}

const handleFiftyFifty = () => {
  jokers.useFiftyFifty()
}

// Save & exit
const endAndSaveGame = () => {
  timer.clearTimer()
  const session = {
    mode: mode.value,
    difficulty: difficulty.value,
    score: score.value,
    bestStreak: streak.value,
    date: new Date().toISOString()
  }
  const board = JSON.parse(localStorage.getItem('leaderboard') || '[]')
  board.push(session)
  localStorage.setItem('leaderboard', JSON.stringify(board))
  router.push('/leaderboard')
}

const endSession = () => {
  timer.clearTimer()
  router.push('/leaderboard')
}

// Init
onMounted(async () => {
  isLoading.value = true;
  try {
    const movies = await tmdb.getRandomMovies();
    // Only assign if movies exist (fixes undefined error)
    if (movies && movies.length > 0) {
      movieList.value = movies;
      currentMovie.value = movies[0] ?? null;
    } else {
      currentMovie.value = null;
    }

    // Start timer for beat-the-clock mode
    if (mode.value === 'beat-the-clock') {
      timer.startTimer(endSession);
    }
  } catch (e) {
    currentMovie.value = null;
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => timer.clearTimer())
</script>

<style scoped lang="scss">
/* YOUR STYLES — NO CHANGES */
.game-page {
  min-height: calc(100vh - 70px);
  padding: 3rem 1.5rem;
  position: relative;
  background: var(--bg-primary);
}
.cinema-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(207, 168, 88, 0.06) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: slowPan 30s linear infinite;
  pointer-events: none;
}
@keyframes slowPan {
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}
.global-loader {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  display: grid;
  place-items: center;
  color: var(--cinema-gold);
  font-size: 1.4rem;
  z-index: 9999;
}
.game-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.game-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.stat {
  background: var(--bg-secondary);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  color: var(--cinema-gold);
  font-weight: 600;
}
.stat.warning {
  border-color: #ef4444;
  color: #ef4444;
}
.poster-card {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid var(--cinema-gold);
  margin-bottom: 1rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  position: relative;
}
.poster-card.slideOut {
  transform: translateX(120vw);
  opacity: 0;
}
.poster {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  filter: blur(0.4px) saturate(1.1);
  user-select: none;
}
.joker-row {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.joker-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background: #7c3aed;
  color: #fff;
  cursor: pointer;
  opacity: 0.9;
}
.joker-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.feedback {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 3rem;
}
.feedback.perfect { color: #22c55e; background: rgba(34,197,94,0.1); }
.feedback.close { color: #f59e0b; background: rgba(245,158,11,0.1); }
.feedback.almost { color: #3b82f6; background: rgba(59,130,246,0.1); }
.feedback.wrong { color: #ef4444; background: rgba(239,68,68,0.1); }
.poster-card.correct { border-color: #22c55e; }
.poster-card.wrong { border-color: #ef4444; }
.answer-box {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}
.answer-input {
  flex: 1;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 6px;
  font-size: 1rem;
}
.answer-input.error { border-color: #ef4444; }
.error-text { color: #ef4444; font-size: 0.9rem; }
.btn-submit {
  padding: 0 1.8rem;
  background: var(--cinema-gold);
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.button-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.btn-skip, .btn-end, .btn-end-primary {
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}
.btn-skip {
  background: transparent;
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
}
.btn-end {
  background: var(--cinema-red);
  color: #fff;
  border: none;
}
.btn-end-primary {
  background: #f59e0b;
  color: white;
  font-weight: bold;
  border: none;
}
@media (max-width: 768px) {
  .answer-box { flex-direction: column; }
}
</style>