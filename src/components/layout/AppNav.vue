<template>
  <header class="app-nav" role="banner">
    <div class="nav-container">
      <!-- Logo / Brand -->
      <router-link to="/" class="nav-logo" aria-label="Back to home page">
        Movie<span class="logo-accent">Quiz</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop" aria-label="Main navigation">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.path === item.path }"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button
        class="nav-hamburger"
        :aria-expanded="mobileMenuOpen"
        aria-label="Open navigation menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition name="menu">
      <div v-if="mobileMenuOpen" class="nav-mobile" @click="mobileMenuOpen = false">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link mobile-link"
          :class="{ active: route.path === item.path }"
        >
          {{ item.label }}
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const mobileMenuOpen = ref(false)

const { t, locale } = useI18n()

const navItems = computed(() => [
  { path: '/', label: t('navigation.home') },
  { path: '/play', label: t('navigation.play') },
  { path: '/leaderboard', label: t('navigation.leaderboard') },
  { path: '/rules', label: t('navigation.rules') },
  { path: '/settings', label: t('navigation.settings') },
])
</script>

<style scoped lang="scss">
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background: rgba(15, 15, 20, 1);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(207, 168, 88, 0.15);
}

.nav-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-size: 1.4rem;
  letter-spacing: 0.15em;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 400;

  .logo-accent {
    color: var(--cinema-gold);
    font-weight: 700;
    margin-left: 0.3rem;
  }
}

.nav-desktop {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.1em;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: var(--cinema-gold);
  }

  &.active {
    color: var(--cinema-gold);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--cinema-gold);
      box-shadow: 0 0 8px rgba(207, 168, 88, 0.4);
    }
  }
}

// --------------------------
// HAMBURGER BUTTON (VISIBLE)
// --------------------------
.nav-hamburger {
  display: none;
  position: relative;
  z-index: 99999;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;

  .bar {
    display: block;
    width: 28px;
    height: 3px;
    background: #ffffff;
    margin: 5px auto;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

.nav-hamburger[aria-expanded='true'] .bar {
  background: var(--cinema-gold);

  &:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  &:nth-child(2) {
    opacity: 0;
  }
  &:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}

.nav-mobile {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  background: rgba(15, 15, 20, 1);
  border-bottom: 1px solid rgba(207, 168, 88, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
  z-index: 9998;
}

.mobile-link {
  font-size: 1.1rem;
  color: var(--text-primary);
  text-decoration: none;

  &.active {
    color: var(--cinema-gold);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.4s ease;
}

.menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// --------------------------
// MOBILE
// --------------------------
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .nav-hamburger {
    display: block !important;
  }
}
</style>
