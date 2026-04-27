<template>
  <section class="leaderboard-page">
    <div class="container">
      <h1>{{ $t('leaderboard.pageTitle') }}</h1>
      <p class="subtitle">{{ $t('leaderboard.pageDescription') }}</p>

      <!-- Clear Button (only if there are scores) -->
      <button v-if="leaderboard.length > 0" class="clear-btn" @click="clearLeaderboard">
        {{ $t('leaderboard.clearLeaderboard') }}
      </button>

      <!-- NO SAVED GAMES -->
      <div v-if="leaderboard.length === 0" class="empty-state">
        <p>{{ $t('leaderboard.noSave') }}</p>
        <p>{{ $t('leaderboard.message') }}</p>
      </div>

      <!-- SAVED GAMES LIST -->
      <div v-else class="leaderboard-list">
        <div v-for="(entry, index) in leaderboard" :key="index" class="leaderboard-card">
          <div class="rank">#{{ index + 1 }}</div>
          <div class="info">
            <div class="mode-badge">{{ entry.mode }} • {{ entry.difficulty }}</div>
            <div class="score">{{ $t('leaderboard.score') }} {{ entry.score }}</div>
            <div class="streak">{{ $t('leaderboard.bestStreak') }}{{ entry.bestStreak }}</div>
            <div class="date">{{ formatDate(entry.date) }}</div>
          </div>
        </div>
      </div>

      <button class="back-btn" @click="goBack">{{ $t('backMenu') }}</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leaderboard = ref<any[]>([])

// LOAD SAVED SCORES ON PAGE LOAD
onMounted(() => {
  const saved = localStorage.getItem('leaderboard')
  if (saved) {
    leaderboard.value = JSON.parse(saved)
    // Sort by highest score FIRST
    leaderboard.value.sort((a, b) => b.score - a.score)
  }
})

// FORMAT DATE FOR DISPLAY
const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString()
}

// GO BACK TO MENU
const goBack = () => {
  router.push('/')
}

// 🔥 CLEAR LEADERBOARD (with confirmation)
const clearLeaderboard = () => {
  if (confirm('Are you sure you want to clear ALL scores? This cannot be undone.')) {
    localStorage.removeItem('leaderboard')
    leaderboard.value = []
  }
}
</script>

<style scoped lang="scss">
.leaderboard-page {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: var(--cinema-gold);
  margin-bottom: 0.5rem;
}

.subtitle {
  opacity: 0.7;
  margin-bottom: 1rem;
}

// ✅ Clear Button Style
.clear-btn {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: 0.2s;
}
.clear-btn:hover {
  background: #c53030;
}

.empty-state {
  padding: 3rem 1rem;
  opacity: 0.5;
  line-height: 1.6;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.leaderboard-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-align: left;
}

.rank {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cinema-gold);
  min-width: 50px;
}

.info {
  flex: 1;
}

.mode-badge {
  background: #444;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.score {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.streak {
  opacity: 0.8;
  margin: 0.2rem 0;
}

.date {
  font-size: 0.8rem;
  opacity: 0.5;
}

.back-btn {
  background: var(--cinema-gold);
  color: black;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
