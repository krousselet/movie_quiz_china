<template>
  <section class="home-page" aria-labelledby="home-title">
    <!-- subtle cinema animated background overlay -->
    <div class="cinema-overlay"></div>

    <div class="home-content">
      <header class="home-header">
        <h1 id="home-title" class="main-title">
          <span class="title-first">Movie</span>
          <span class="title-second">Quiz</span>
        </h1>
        <p class="subtitle" aria-describedby="home-title">
          Guess movies, beat the clock, build your streak & unlock cinema challenges
        </p>
      </header>

      <!-- animated decorative divider (theater style) -->
      <div class="divider">❖ ❖ ❖</div>

      <!-- main navigation buttons -->
      <div class="home-actions">
        <router-link to="/play" class="btn btn-primary" aria-label="Start playing the quiz">
          Play Game
        </router-link>

        <router-link to="/rules" class="btn btn-secondary" aria-label="Read game rules">
          Rules
        </router-link>

        <router-link to="/settings" class="btn btn-tertiary" aria-label="Open application settings">
          Settings
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No local logic needed for home
// All global state (dark mode, audio, lang) will come from Pinia later
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem 1rem;
  background: var(--bg-primary);
}

.cinema-overlay {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(rgba(207, 168, 88, 0.08) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: slowPan 25s linear infinite;
  pointer-events: none;
}

@keyframes slowPan {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

.home-content {
  text-align: center;
  z-index: 2;
  max-width: 900px;
  width: 100%;
}

.main-title {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  letter-spacing: 0.3em;
  margin-bottom: 1rem;

  .title-first {
    color: var(--text-secondary);
    font-weight: 300;
  }
  .title-second {
    color: var(--cinema-gold);
    font-weight: 700;
    margin-left: 0.2em;
    text-shadow: 0 0 12px rgba(207, 168, 88, 0.35);
  }
}

.subtitle {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.divider {
  color: var(--cinema-gold);
  opacity: 0.65;
  font-size: 1.2rem;
  margin: 2.5rem 0;
  letter-spacing: 0.8em;
}

.home-actions {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.9rem 2.2rem;
  border-radius: 2px;
  text-decoration: none;
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.4s ease;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
}

.btn-primary {
  background: var(--cinema-gold);
  color: #000;
  font-weight: 600;

  &:hover {
    box-shadow: 0 0 18px rgba(207, 168, 88, 0.5);
  }
}

.btn-secondary {
  background: transparent;
  border-color: var(--cinema-text-muted);
  color: var(--text-primary);

  &:hover {
    border-color: var(--cinema-gold);
    box-shadow: 0 0 12px rgba(207, 168, 88, 0.25);
  }
}

.btn-tertiary {
  background: transparent;
  color: var(--text-secondary);

  &:hover {
    color: var(--cinema-gold);
  }
}

/* Ultra wide cinema screen support */
@media (min-width: 1920px) {
  .home-content {
    max-width: 1200px;
  }
}
</style>