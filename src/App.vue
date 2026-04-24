<template>
  <!-- Global Navigation -->
  <AppNav />

  <!-- Page wrapper: add top padding so content is not hidden under fixed nav -->
  <main class="page-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
</script>

<style lang="scss">
.page-wrapper {
  padding-top: 70px; /* Match nav height */
  min-height: 100vh;
}
</style>