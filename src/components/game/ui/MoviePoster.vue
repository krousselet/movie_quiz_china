<template>
  <div class="poster-card" :class="{ slideOut: sliding, correct, wrong }">
    <img v-if="poster" :src="poster" alt="Movie" class="poster" />
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script setup>
defineProps({
  poster: String,
  sliding: Boolean,
  correct: Boolean,
  wrong: Boolean,
})
</script>

<style scoped>
.poster-card {
  background: #1e293b;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #fbbf24;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}

.poster-card.slideOut {
  transform: translateX(150vw);
  opacity: 0;
}

.poster {
  max-height: 400px;
  border-radius: 8px;
}
</style>
