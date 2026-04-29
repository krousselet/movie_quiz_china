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
  padding: 0.5rem;
  border-radius: 12px;
  min-height: unset;
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
  max-width: 100%;
  border-radius: 8px;
  object-fit: contain;
}

/* ✅ MOBILE STYLES INSIDE COMPONENT (MODULAR) */
@media (max-width: 768px) {
  .poster-card {
    max-height: 160px;
    padding: 0;
  }
  .poster {
    max-height: 160px;
    width: auto;
  }
}
</style>
