<template>
  <section class="home-page">
    <div class="overlay"></div>

    <div class="content">
      <h1 class="title">
        <span>Movie</span>
        <span class="gold">Quiz</span>
      </h1>
      <p class="subtitle">{{ t('home.subtitle') }}</p>

      <div class="actions">
        <button @click="go('/play')" class="btn primary">
          {{ t('home.buttons.play.label') }}
        </button>
        <button @click="go('/rules')" class="btn secondary">
          {{ t('navigation.rules') }}
        </button>
        <button @click="go('/leaderboard')" class="btn tertiary">
          {{ t('navigation.leaderboard') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSound } from '@/composables/useSound'

const router = useRouter()
const { t } = useI18n()
const { playClick } = useSound()

const go = (path: string) => {
  playClick()
  router.push(path)
}
</script>

<style scoped lang="scss">
.home-page {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  overflow: hidden !important;
  z-index: 1;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(207, 168, 88, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.content {
  z-index: 2;
  text-align: center;
  max-width: 700px;
  width: 90%;
}

.title {
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;

  .gold {
    color: var(--cinema-gold);
  }
}

.subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.9rem 2.2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.primary {
  background: var(--cinema-gold);
  color: #111;
}

.secondary {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.tertiary {
  background: transparent;
  color: var(--text-secondary);
}
</style>
