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
import { ref } from 'vue'

const route = useRoute()
const mobileMenuOpen = ref(false)

// All your official pages
const navItems = ref([
  { path: '/', label: 'Home' },
  { path: '/play', label: 'Play' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/rules', label: 'Rules' },
  { path: '/settings', label: 'Settings' }
])
</script>

<style scoped lang="scss">
// Reuse your cinema theme variables
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: rgba(15, 15, 20, 0.92);
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
  color: #f0e9e0;
  text-decoration: none;
  font-weight: 400;

  .logo-accent {
    color: var(--cinema-gold);
    font-weight: 700;
    margin-left: 0.3rem;
  }
}

// Desktop links
.nav-desktop {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  letter-spacing: 0.1em;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: var(--cinema-gold);
  }

  &.active {
    color: var(gold);

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

// Hamburger button
.nav-hamburger {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  .bar {
    display: block;
    width: 26px;
    height: 2px;
    background: var(--text-primary);
    margin: 6px 0;
    transition: 0.3s ease;
  }
}

// Mobile menu
.nav-mobile {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  background: rgba(15, 15, 20, 0.98);
  border-bottom: 1px solid rgba(207, 168, 88, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
}

.mobile-link {
  font-size: 1.1rem;
}

// Mobile transition
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

// Responsive breakpoint
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .nav-hamburger {
    display: block;
  }
}

// Ultra wide cinema screens
@media (min-width: 1920px) {
  .nav-container {
    padding: 0 4rem;
  }
}
</style>