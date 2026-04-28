<template>
  <div class="game-stats">
    <div class="stat warning" v-if="showTimer">
      {{ time }}
    </div>
    <div class="stat">{{ $t('leaderboard.score') }} : {{ score }}</div>
    <div class="stat">{{ $t('leaderboard.streak') }} : {{ streak }}</div>
  </div>
</template>

<script setup>
defineProps({
  score: Number,
  streak: Number,
  time: String,
  showTimer: Boolean,
})
</script>

<style scoped>
.game-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat {
  background: #1e293b;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #334155;
  color: #fbbf24;
  font-weight: 600;
}

.stat.warning {
  color: #ef4444;
}
</style>
