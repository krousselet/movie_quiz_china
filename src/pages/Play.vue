<template>
  <section class="play-page">
    <div class="play-container">
      <h1 class="title">{{ t('play.pageTitle') }}</h1>
      <p class="sub">{{ t('play.pageDescription') }}</p>

      <!-- 🔥 SINGLE FLOW BOX - ALL STEPS HERE -->
      <div class="flow-box">
        <!-- Step 1: Game Modes -->
        <div class="flow-item modes" :class="{ hidden: selectedMode }">
          <div class="mode-scroll">
            <div
              v-for="mode in gameModes.modes"
              :key="mode.id"
              class="mode-card"
              @click="selectMode(mode.id)"
            >
              <span class="icon">{{ mode.icon }}</span>
              <span>{{ mode.label }}</span>
            </div>
          </div>
        </div>

        <!-- Step 2: Difficulty -->
        <div class="flow-item difficulty" :class="{ hidden: !selectedMode || selectedDifficulty }">
          <h4 class="flow-label">{{ t('play.chooseDifficulty') }}</h4>
          <div class="diff-scroll">
            <button
              v-for="diff in gameModes.difficulties"
              :key="diff.id"
              class="diff-btn"
              @click="selectDifficulty(diff.id)"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Step 3: Play Button -->
        <div class="flow-item start" :class="{ show: selectedMode && selectedDifficulty }">
          <button class="play-btn" @click="startGame">
            {{ t('play.startGame') }}
          </button>
        </div>
      </div>
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

type ModeId = 'classic' | 'beat-the-clock' | 'longest-streak' | 'investigation'
type DifficultyId = 'easy' | 'medium' | 'hard' | 'master'

const selectedMode = ref<ModeId | ''>('')
const selectedDifficulty = ref<DifficultyId | ''>('')

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
    query: { mode: selectedMode.value, difficulty: selectedDifficulty.value },
  })
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_play';
</style>
