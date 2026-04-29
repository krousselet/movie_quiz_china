<template>
  <div class="hangman-mask">
    <span
      v-for="(char, idx) in mask"
      :key="idx"
      class="char-block"
      :class="{ wordGap: char === ' ' }"
    >
      {{ char === ' ' ? '' : char }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  mask: String,
})
</script>

<style scoped>
.hangman-mask {
  font-size: 2rem;
  color: #fbbf24;
  margin: 2rem 0;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  flex-wrap: wrap;
}

.char-block {
  min-width: 14px;
}

.wordGap {
  margin-inline: 1rem;
}

/* ✅ MOBILE STYLES INSIDE COMPONENT (MODULAR) */
@media (max-width: 768px) {
  .hangman-mask {
    font-size: 1.2rem;
    margin: 0.4rem 0;
  }
  .char-block {
    min-width: 10px;
  }
}
</style>
