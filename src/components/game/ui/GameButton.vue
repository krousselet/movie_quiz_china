<template>
  <button
    :class="['game-button', variant, { 'is-disabled': isDisabled }]"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    default: 'default',
    validator: (v) =>
      [
        'default',
        'joker',
        'submit',
        'skip',
        'danger',
        'choice',
        'success', // ✅ NEW for END GAME
      ].includes(v),
  },
  isDisabled: Boolean,
})

defineEmits(['click'])
</script>

<style scoped>
.game-button {
  position: relative;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
}

/* -------------------------- */
/* DEFAULT (PRIMARY) */
/* -------------------------- */
.default {
  background: #7c3aed;
  color: white;
}
.default:hover:not(.is-disabled) {
  background: #6d28d9;
  transform: translateY(-1px);
}

/* -------------------------- */
/* JOKER */
/* -------------------------- */
.joker {
  background: #8b5cf6;
  color: white;
}
.joker:hover:not(.is-disabled) {
  background: #7c3aed;
  transform: translateY(-1px);
}

/* -------------------------- */
/* SUBMIT */
/* -------------------------- */
.submit {
  background: #fbbf24;
  color: #0f172a;
}
.submit:hover:not(.is-disabled) {
  background: #f59e0b;
  transform: translateY(-1px);
}

/* -------------------------- */
/* SKIP */
/* -------------------------- */
.skip {
  background: transparent;
  border: 1px solid #9ca3af !important;
  color: white;
}
.skip:hover:not(.is-disabled) {
  background: rgba(156, 163, 175, 0.1);
  border-color: #d1d5db !important;
}

/* -------------------------- */
/* DANGER (QUIT) */
/* -------------------------- */
.danger {
  background: #ef4444;
  color: white;
}
.danger:hover:not(.is-disabled) {
  background: #dc2626;
  transform: translateY(-1px);
}

/* -------------------------- */
/* CHOICE (50/50) */
/* -------------------------- */
.choice {
  background: #334155;
  color: white;
  border: 1px solid #fbbf24 !important;
}
.choice:hover:not(.is-disabled) {
  background: #7c3aed;
  border-color: #fbbf24 !important;
}

/* -------------------------- */
/* ✅ SUCCESS (END GAME / SAVE) */
/* -------------------------- */
.success {
  background: #10b981;
  color: white;
}
.success:hover:not(.is-disabled) {
  background: #059669;
  transform: translateY(-1px);
}

/* -------------------------- */
/* DISABLED STATE */
/* -------------------------- */
.is-disabled {
  opacity: 0.45;
  cursor: not-allowed !important;
  transform: none !important;
}
</style>
