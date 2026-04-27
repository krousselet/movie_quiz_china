<template>
  <button
    :class="['btn', variant, { disabled: isDisabled }]"
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
    validator: (v) => ['default', 'joker', 'submit', 'skip', 'danger', 'choice'].includes(v),
  },
  isDisabled: Boolean,
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: 0.2s;
}

/* DEFAULT */
.default {
  background: #7c3aed;
  color: white;
}

/* JOKER */
.joker {
  background: #7c3aed;
  color: white;
}

/* SUBMIT */
.submit {
  background: #fbbf24;
  color: black;
}

/* SKIP */
.skip {
  background: transparent;
  border: 1px solid #9ca3af;
  color: white;
}

/* DANGER / QUIT */
.danger {
  background: #ef4444;
  color: white;
}

/* CHOICE BUTTON (50/50) */
.choice {
  background: #334155;
  color: white;
  border: 1px solid #fbbf24;
}
.choice:hover {
  background: #7c3aed;
}

/* DISABLED */
.btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
