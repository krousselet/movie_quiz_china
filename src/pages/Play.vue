<template>
  <section class="play-page" aria-labelledby="play-title">
    <!-- Cinematic background overlay -->
    <div class="cinema-overlay"></div>

    <div class="play-container">
      <div class="page-heading">
        <h1 id="play-title" class="heading-title">
          Choose Your Challenge
        </h1>
        <p class="heading-subtitle">
          Select a game mode & difficulty to start a new quiz session
        </p>
        <div class="divider">❖ ❖ ❖</div>
      </div>

      <!-- Game Mode Selection -->
      <div class="section-block">
        <h2 class="block-title">Game Mode</h2>
        <div class="grid-mode">
          <button
            v-for="mode in gameModes"
            :key="mode.value"
            class="mode-card"
            :class="{ active: selectedMode === mode.value }"
            @click="selectedMode = mode.value"
            :aria-label="mode.aria"
          >
            <span class="card-icon">{{ mode.icon }}</span>
            <h3 class="card-heading">{{ mode.label }}</h3>
            <p class="card-desc">{{ mode.desc }}</p>
          </button>
        </div>
      </div>

      <!-- Difficulty Selection -->
      <div class="section-block">
        <h2 class="block-title">Difficulty</h2>
        <div class="grid-difficulty">
          <button
            v-for="diff in difficulties"
            :key="diff.value"
            class="diff-tag"
            :class="{ active: selectedDifficulty === diff.value }"
            @click="selectedDifficulty = diff.value"
            :aria-label="diff.aria"
          >
            {{ diff.label }}
          </button>
        </div>
      </div>

      <!-- Start Game Button -->
      <div class="action-wrapper">
        <button
          class="btn-start"
          :disabled="!selectedMode || !selectedDifficulty"
          @click="launchGame"
          aria-label="Start game session"
        >
          Launch Game Session
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// ✅ IMPORT YOUR TMDB SERVICE
import { TMDBService } from '../core/TMDBService'

const router = useRouter()
// ✅ CREATE INSTANCE
const tmdb = new TMDBService()

// === Reactive State ===
const selectedMode = ref<string>('')
const selectedDifficulty = ref<string>('')

// === Game Modes ===
const gameModes = ref([
  {
    value: 'classic',
    label: 'Classic',
    icon: '🎬',
    desc: 'Guess posters at your own pace, no timer',
    aria: 'Select classic mode'
  },
  {
    value: 'beat-the-clock',
    label: 'Beat The Clock',
    icon: '⏱️',
    desc: 'Race against time to reach movie quotas',
    aria: 'Select beat the clock mode'
  },
  {
    value: 'longest-streak',
    label: 'Longest Streak',
    icon: '🔥',
    desc: 'Chain correct answers to win',
    aria: 'Select longest streak mode'
  },
  {
    value: 'investigation',
    label: 'Investigation',
    icon: '🔍',
    desc: 'Reveal blurred poster by answering questions',
    aria: 'Select investigation mode'
  }
])

// === Difficulties ===
const difficulties = ref([
  { value: 'easy', label: 'Easy', aria: 'Select easy difficulty' },
  { value: 'medium', label: 'Medium', aria: 'Select medium difficulty' },
  { value: 'hard', label: 'Hard', aria: 'Select hard difficulty' },
  { value: 'master', label: 'Master', aria: 'Select master difficulty' }
])

// === ✅ LAUNCH GAME WITH CLEAR CACHE + NEW MOVIES ===
const launchGame = () => {
  // 👇 THIS IS THE KEY LINE
  tmdb.clearMovieCache()
  console.log('🧹 Old movie cache cleared')

  // Then start game
  router.push({
    path: '/game',
    query: {
      mode: selectedMode.value,
      difficulty: selectedDifficulty.value
    }
  })
}
</script>

<style scoped lang="scss">
.play-page {
  min-height: calc(100vh - 70px);
  width: 100%;
  padding: 3rem 1.5rem;
  position: relative;
  background: var(--bg-primary);
}

.cinema-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(207, 168, 88, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  animation: slowPan 28s linear infinite;
  pointer-events: none;
}

@keyframes slowPan {
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}

.play-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.page-heading {
  text-align: center;
  margin-bottom: 3rem;
}

.heading-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--text-primary);
  letter-spacing: 0.15em;
  margin-bottom: 0.8rem;
}

.heading-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

.divider {
  color: var(--cinema-gold);
  opacity: 0.6;
  margin: 2rem 0;
  letter-spacing: 0.6em;
}

.section-block {
  margin-bottom: 3rem;
}

.block-title {
  font-size: 1.4rem;
  color: var(--cinema-gold);
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  padding-left: 0.3rem;
}

/* Game Mode Grid */
.grid-mode {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.mode-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1.8rem 1.4rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    border-color: rgba(207, 168, 88, 0.35);
    transform: translateY(-4px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
  }

  &.active {
    border-color: var(--cinema-gold);
    background: rgba(207, 168, 88, 0.08);
    box-shadow: 0 0 18px rgba(207, 168, 88, 0.18);
  }
}

.card-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.card-heading {
  color: var(--text-primary);
  font-size: 1.15rem;
  margin-bottom: 0.6rem;
  letter-spacing: 0.08em;
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Difficulty Row */
.grid-difficulty {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.diff-tag {
  padding: 0.7rem 1.8rem;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    border-color: rgba(207, 168, 88, 0.4);
    color: var(--text-primary);
  }

  &.active {
    background: var(--cinema-gold);
    color: #000;
    border-color: var(--cinema-gold);
    font-weight: 600;
  }
}

/* Start Button */
.action-wrapper {
  text-align: center;
  margin-top: 4rem;
}

.btn-start {
  padding: 1.1rem 3.5rem;
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--cinema-gold);
  color: #000;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 0 25px rgba(207, 168, 88, 0.45);
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

/* === Responsive Ultra-Wide Cinema Support === */
@media (min-width: 1920px) {
  .play-container {
    max-width: 1600px;
  }
  .grid-mode {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-mode {
    grid-template-columns: 1fr;
  }
  .diff-tag {
    flex: 1 1 calc(50% - 0.5rem);
    text-align: center;
  }
}
</style>