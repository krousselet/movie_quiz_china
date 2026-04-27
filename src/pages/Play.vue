<template>
  <section class="play-page">
    <div class="play-container">
      <h1 class="play-title">{{ t('play.title') }}</h1>
      <p class="play-sub">{{ t('play.chooseMode') }}</p>

      <!-- GAME MODES (TRANSLATED) -->
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

      <!-- DIFFICULTY (TRANSLATED) -->
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

      <!-- START BUTTON -->
      <button v-if="selectedMode && selectedDifficulty" class="start-btn" @click="startGame">
        {{ t('play.startGame') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGameModes } from '@/config/gameMods'

const router = useRouter()
const { t } = useI18n()
const gameModes = useGameModes()

// 👇 Define types
type ModeId = 'classic' | 'beat-the-clock' | 'longest-streak' | 'investigation'
type DifficultyId = 'easy' | 'medium' | 'hard' | 'master'

// 👇 Use union type with empty string to allow initial empty value
const selectedMode = ref<ModeId | ''>('')
const selectedDifficulty = ref<DifficultyId | ''>('')

// 👇 Typed functions
const selectMode = (id: ModeId) => {
  selectedMode.value = id
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem;
}

.play-container {
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.play-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--cinema-gold);
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.mode-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: 0.2s;

  &.active {
    border-color: var(--cinema-gold);
    background: rgba(251, 191, 36, 0.1);
  }
}

.mode-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.difficulty-section {
  margin: 2rem 0;
}

.difficulty-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.diff-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;

  &.active {
    background: var(--cinema-gold);
    color: #111;
  }
}

.start-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 10px;
  border: none;
  background: var(--cinema-gold);
  color: #111;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
