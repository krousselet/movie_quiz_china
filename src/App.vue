<template>
  <!-- Global Navigation -->
  <AppNav />

  <!-- Page wrapper -->
  <main class="page-wrapper">
    <router-view v-slot="{ Component }">
      <!-- ✅ WAVE WASH TRANSITION -->
      <transition name="wave" mode="out-in">
        <component :is="Component" key="$route.fullPath" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
</script>

<style lang="scss">
.page-wrapper {
  padding-top: 70px;
  min-height: 100vh;
}

/* ====================================== */
/* ✨ SMOOTH WAVE WASH PAGE TRANSITION */
/* ====================================== */
.wave-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  filter: blur(2px);
}

.wave-enter-active {
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.wave-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.wave-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.wave-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.wave-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.96);
  filter: blur(2px);
}
</style>