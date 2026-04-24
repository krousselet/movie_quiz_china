<!-- src/components/ui/Button.vue -->
<template>
  <button
    :aria-label="ariaLabel"
    :class="['btn', variant, { 'btn-dark': isDark }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>