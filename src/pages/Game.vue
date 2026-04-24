<template>
  <section class="game-page">
    <div class="cinema-overlay"></div>

    <div class="game-container">
      <div class="game-stats">
        <div class="stat">Score: {{ score }}</div>
        <div class="stat">Streak: {{ streak }}</div>
        <div class="stat" v-if="mode === 'beat-the-clock'">
          {{ minutes }}:{{ seconds }}
        </div>
      </div>

      <!-- ✅ ANIMATED CARD (NO DUPLICATES) -->
      <div 
        class="poster-card" 
        :class="{ correct: isCorrect, wrong: isWrong }"
      >
        <img
          v-if="currentMovie"
          :src="currentMovie.poster_path"
          alt="Movie"
          class="poster"
        />
        <div v-else class="loading">Loading...</div>
      </div>

      <div class="answer-box">
        <input
          v-model="userAnswer"
          @keyup.enter="checkAnswer"
          placeholder="Type the title..."
          class="answer-input"
          :class="{ error: showError }"
        />
        <button class="btn-submit" @click="checkAnswer">Submit</button>
      </div>
      <p v-if="showError" class="error-text">Please enter a title!</p>

      <button class="btn-skip" @click="nextMovie">Skip</button>
      <button class="btn-end" @click="endSession">End Session</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TMDBService } from '../core/TMDBService'
import type { Movie } from '../types'

const route = useRoute()
const router = useRouter()
const tmdb = new TMDBService()

const mode = ref(route.query.mode as string)
const difficulty = ref(route.query.difficulty as string)

const score = ref(0)
const streak = ref(0)
const userAnswer = ref('')
const currentMovie = ref<Movie | null>(null)
const movieList = ref<Movie[]>([])

const isCorrect = ref(false)
const isWrong = ref(false)
const showError = ref(false)

let timerInterval: number | null = null
const timeLeft = ref(300)
const minutes = ref('05')
const seconds = ref('00')

onMounted(async () => {
  const movies = await tmdb.getRandomMovies()
  movieList.value = [...movies]
  if (movies.length > 0) currentMovie.value = movies[0] as Movie
  if (mode.value === 'beat-the-clock') startTimer()
})

const startTimer = () => {
  timerInterval = window.setInterval(() => {
    timeLeft.value--
    const min = Math.floor(timeLeft.value / 60)
    const sec = timeLeft.value % 60
    minutes.value = String(min).padStart(2, '0')
    seconds.value = String(sec).padStart(2, '0')
    if (timeLeft.value <= 0) endSession()
  }, 1000)
}

const checkAnswer = () => {
  const guess = userAnswer.value.trim()
  if (!guess) {
    showError.value = true
    setTimeout(() => showError.value = false, 2000)
    return
  }
  if (!currentMovie.value) return

  const correct = currentMovie.value.title.toLowerCase()
  const right = guess.toLowerCase() === correct

  if (right) {
    score.value += 10
    streak.value += 1
    isCorrect.value = true
  } else {
    streak.value = 0
    isWrong.value = true
  }

  userAnswer.value = ''

  setTimeout(() => {
    isCorrect.value = false
    isWrong.value = false
    nextMovie()
  }, 800)
}

const nextMovie = () => {
  if (movieList.value.length === 0) return
  const currentId = currentMovie.value?.id
  const idx = movieList.value.findIndex(m => m.id === currentId)
  const nextIdx = (idx + 1) % movieList.value.length
  const next = movieList.value[nextIdx]
  if (next) currentMovie.value = next as Movie
}

const endSession = () => {
  if (timerInterval) clearInterval(timerInterval)
  router.push('/leaderboard')
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped lang="scss">
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

.poster-card {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid var(--cinema-gold);
  margin-bottom: 2rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.poster {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.poster-card.correct {
  border-color: #22c55e;
  animation: correctPulse 0.8s ease;
}

.poster-card.wrong {
  border-color: #ef4444;
  animation: wrongShake 0.8s ease;
}

@keyframes correctPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes wrongShake {
  0%,100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
}

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

.answer-input.error {
  border-color: #ef4444;
  animation: inputShake 0.4s;
}

.error-text {
  color: #ef4444;
  font-size: 0.9rem;
}

@keyframes inputShake {
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.btn-submit {
  padding: 0 1.8rem;
  background: var(--cinema-gold);
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-skip, .btn-end {
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0.5rem;
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

@media (max-width: 768px) {
  .answer-box { flex-direction: column; }
}
</style>