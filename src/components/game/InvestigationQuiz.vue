<template>
  <!-- Fullscreen Overlay Modal -->
  <div class="investigation-modal" :class="{ visible: visible }">
    <div class="quiz-container">
      <!-- Close Button Inside Modal -->
      <button class="close-btn" @click="$emit('toggle-quiz')">✕</button>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-text">{{ t('quiz.progress') }}</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>

      <!-- Question -->
      <h3 class="question-text">{{ question }}</h3>

      <!-- Answer Choices -->
      <div class="choices-grid">
        <GameButton
          v-for="choice in choices"
          :key="choice.id"
          variant="choice"
          @click="select(choice)"
        >
          {{ choice.text }}
        </GameButton>
      </div>

      <!-- ✅ REAL JOKERS FROM PARENT (NO HARDCODE) -->
      <div class="jokers-bar">
        <GameButton
          v-for="(count, id) in investigationJokers"
          :key="id"
          variant="joker"
          :is-disabled="count <= 0"
          @click="useJoker(id)"
        >
          {{ t(`jokers.${id}`) }}
        </GameButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GameButton from '@/components/game/ui/GameButton.vue'

const { t } = useI18n()

const props = defineProps({
  visible: { type: Boolean, default: false },
  totalSteps: { type: Number, default: 5 },
  currentStep: { type: Number, default: 1 },
  question: { type: String, required: true },
  choices: { type: Array, required: true },
  // Jokers from parent (Game.vue)
  investigationJokers: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answer', 'joker', 'toggle-quiz'])

const progress = computed(() => (props.currentStep / props.totalSteps) * 100)

const useJoker = (id) => {
  emit('joker', id)
}

const select = (choice) => {
  emit('answer', choice)
}
</script>

<style scoped lang="scss">
.investigation-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  padding: 1rem;
}

.investigation-modal.visible {
  opacity: 1;
  visibility: visible;
}

.quiz-container {
  background: linear-gradient(145deg, #1a1d24, #111318);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: translateY(30px) scale(0.95);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.investigation-modal.visible .quiz-container {
  transform: translateY(0) scale(1);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-text {
  font-size: 0.85rem;
  color: #aaa;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-bar {
  height: 8px;
  background: #2a2d35;
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #eec44f);
  border-radius: 99px;
  transition: width 0.4s ease;
}

.question-text {
  font-size: 1.3rem;
  color: #fff;
  text-align: center;
  margin: 0;
  line-height: 1.4;
}

.choices-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.jokers-bar {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
</style>
