<template>
  <section class="play-page">
    <div class="play-container">
      <!-- TITLE -->
      <div class="title-group">
        <h1 class="play-title">{{ t('play.pageTitle') }}</h1>
        <p class="play-sub">{{ t('play.pageDescription') }}</p>
      </div>

      <!-- GAME MODES -->
      <div class="mode-wrapper" :class="{ slideOut: selectedMode && !difficultyVisible }">
        <div class="mode-grid">
          <div
            v-for="mode in gameModes.modes"
            :key="mode.id"
            class="mode-card"
            @click="selectMode(mode.id)"
            :class="{ active: selectedMode === mode.id }"
          >
            <span class="mode-icon">{{ mode.icon }}</span>
            <h3>{{ mode.label }}</h3>
          </div>
        </div>
      </div>

      <!-- DIFFICULTY + START BUTTON -->
      <div class="difficulty-start-wrapper" :class="{ slideIn: selectedMode && difficultyVisible }">
        <div v-if="selectedMode" class="difficulty-section">
          <h3>{{ t('play.chooseDifficulty') }}</h3>
          <div class="difficulty-row">
            <button
              v-for="diff in gameModes.difficulties"
              :key="diff.id"
              class="diff-btn"
              :class="{ active: selectedDifficulty === diff.id }"
              @click="selectDifficulty(diff.id)"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <button v-if="selectedMode && selectedDifficulty" class="start-btn" @click="startGame">
          {{ t('play.startGame') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGameModes } from '@/config/gameMods'

const router = useRouter()
const { t } = useI18n()
const gameModes = useGameModes()

type ModeId = 'classic' | 'beat-the-clock' | 'longest-streak' | 'investigation'
type DifficultyId = 'easy' | 'medium' | 'hard' | 'master'

const selectedMode = ref<ModeId | ''>('')
const selectedDifficulty = ref<DifficultyId | ''>('')

// 🔥 ANIMATION CONTROL
const difficultyVisible = ref(false)

const selectMode = (id: ModeId) => {
  selectedMode.value = id
  setTimeout(() => {
    difficultyVisible.value = true
  }, 300)
}

const selectDifficulty = (id: DifficultyId) => {
  selectedDifficulty.value = id
}

const startGame = () => {
  if (!selectedMode.value || !selectedDifficulty.value) return
  router.push({
    path: '/game',
    query: {
      mode: selectedMode.value,
      difficulty: selectedDifficulty.value,
    },
  })
}
</script>

<style scoped lang="scss">
.play-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 1.5rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.play-container {
  max-width: 900px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.title-group {
  margin-bottom: 0.5rem;
}

.play-title {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  color: var(--cinema-gold);
  margin: 0;
}

.play-sub {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  opacity: 0.8;
  margin-top: 0.4rem;
}

// ------------------------------
// MODES WITH SLIDE ANIMATION
// ------------------------------
.mode-wrapper {
  width: 100%;
  transition:
    transform 0.45s ease-out,
    opacity 0.35s ease;
}

.mode-wrapper.slideOut {
  transform: translateX(-150vw);
  opacity: 0;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.8rem;
  width: 100%;
}

.mode-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: clamp(1rem, 4vw, 1.6rem) 0.8rem;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;

  &.active {
    border-color: var(--cinema-gold);
    background: rgba(251, 191, 36, 0.12);
    transform: scale(1.03);
  }

  &:hover {
    transform: scale(1.02);
  }
}

.mode-icon {
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  margin-bottom: 0.5rem;
  display: block;
}

.mode-card h3 {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  margin: 0;
}

// ------------------------------
// DIFFICULTY + START (SLIDE IN)
// ------------------------------
.difficulty-start-wrapper {
  width: 100%;
  position: absolute;
  transform: translateX(150vw);
  opacity: 0;
  transition:
    transform 0.45s ease-out,
    opacity 0.35s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.difficulty-start-wrapper.slideIn {
  position: static;
  transform: translateX(0);
  opacity: 1;
}

.difficulty-section {
  width: 100%;
}

.difficulty-section h3 {
  font-size: clamp(1rem, 4vw, 1.4rem);
  margin-bottom: 0.8rem;
}

.difficulty-row {
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.diff-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  transition: 0.2s;

  &.active {
    background: var(--cinema-gold);
    color: #111;
    font-weight: bold;
  }

  &:hover {
    filter: brightness(1.1);
  }
}

.start-btn {
  padding: 0.9rem 2rem;
  font-size: clamp(1rem, 3vw, 1.2rem);
  border-radius: 12px;
  border: none;
  background: var(--cinema-gold);
  color: #111;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s ease;
  max-width: 320px;
  width: 100%;

  &:hover {
    transform: scale(1.04);
  }
}
</style>
