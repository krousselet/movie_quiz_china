<template>
  <section class="rules-page">
    <div class="cinema-overlay"></div>

    <div class="rules-wrapper">
      <!-- HEADER (STAYS FIXED) -->
      <div class="page-heading">
        <h1 class="main-heading">{{ t('rules.pageTitle') }}</h1>
        <p class="sub-heading">{{ t('rules.subTitle') }}</p>
        <div class="divider">❖ ❖ ❖</div>
      </div>

      <!-- SWIPER CAROUSEL -->
      <Swiper
        class="rules-swiper"
        :modules="[Navigation, Pagination]"
        :space-between="20"
        :slides-per-view="1"
        navigation
        pagination
        :allow-touch-move="true"
        :mousewheel="false"
      >
        <!-- Slide 1: Classic Mode -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">🎬 {{ t('rules.classic.title') }}</h2>
            <div class="rule-content">
              <p>{{ t('rules.classic.desc') }}</p>
              <ul>
                <li>{{ t('rules.classic.point1') }}</li>
                <li>{{ t('rules.classic.point2') }}</li>
                <li>{{ t('rules.classic.point3') }}</li>
                <li>{{ t('rules.classic.point4') }}</li>
              </ul>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 2: Beat The Clock -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">⏱️ {{ t('rules.beatClock.title') }}</h2>
            <div class="rule-content">
              <p>{{ t('rules.beatClock.desc', { min: rules.modes.beatTheClock.timeLimit }) }}</p>
              <ul>
                <li>
                  {{
                    t('rules.beatClock.diffLine', {
                      diff: t('rules.beatClock.diffLabel.easy'),
                      count: rules.modes.beatTheClock.difficulties.easy,
                      min: rules.modes.beatTheClock.timeLimit,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.beatClock.diffLine', {
                      diff: t('rules.beatClock.diffLabel.medium'),
                      count: rules.modes.beatTheClock.difficulties.medium,
                      min: rules.modes.beatTheClock.timeLimit,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.beatClock.diffLine', {
                      diff: t('rules.beatClock.diffLabel.hard'),
                      count: rules.modes.beatTheClock.difficulties.hard,
                      min: rules.modes.beatTheClock.timeLimit,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.beatClock.diffLine', {
                      diff: t('rules.beatClock.diffLabel.master'),
                      count: rules.modes.beatTheClock.difficulties.master,
                      min: rules.modes.beatTheClock.timeLimit,
                    })
                  }}
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 3: Longest Streak -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">🔥 {{ t('rules.streak.title') }}</h2>
            <div class="rule-content">
              <p>{{ t('rules.streak.desc') }}</p>
              <ul>
                <li>
                  {{
                    t('rules.streak.lines.easy', {
                      count: rules.modes.longestStreak.difficulties.easy,
                    })
                  }}
                </li>
                <li>{{ t('rules.streak.lines.medium') }}</li>
                <li>{{ t('rules.streak.lines.hard') }}</li>
                <li>{{ t('rules.streak.lines.master') }}</li>
              </ul>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 4: Investigation Mode -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">🔍 {{ t('rules.investigation.title') }}</h2>
            <div class="rule-content">
              <p>{{ t('rules.investigation.desc') }}</p>
              <ul>
                <li>{{ t('rules.investigation.mech1') }}</li>
                <li>{{ t('rules.investigation.mech2') }}</li>
                <li>
                  {{
                    t('rules.investigation.diffLine', {
                      diff: t('rules.beatClock.diffLabel.easy'),
                      count: rules.modes.investigation.difficulties.easy,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.investigation.diffLine', {
                      diff: t('rules.beatClock.diffLabel.medium'),
                      count: rules.modes.investigation.difficulties.medium,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.investigation.diffLine', {
                      diff: t('rules.beatClock.diffLabel.hard'),
                      count: rules.modes.investigation.difficulties.hard,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.investigation.diffLine', {
                      diff: t('rules.beatClock.diffLabel.master'),
                      count: rules.modes.investigation.difficulties.master,
                    })
                  }}
                </li>
              </ul>
              <p class="text-muted">
                <em>{{ t('rules.investigation.note') }}</em>
              </p>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 5: Jokers -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">🃏 {{ t('rules.jokers.title') }}</h2>
            <div class="rule-content">
              <p>{{ t('rules.jokers.desc') }}</p>

              <h3>{{ t('rules.jokers.btcTitle') }}</h3>
              <ul>
                <li>{{ t('rules.jokers.btcSkip') }}</li>
                <li>
                  {{
                    t('rules.jokers.btcPause', {
                      secPause: rules.modes.beatTheClock.jokerPauseSec,
                    })
                  }}
                </li>
                <li>
                  {{
                    t('rules.jokers.btcAdd', {
                      secAdd: rules.modes.beatTheClock.jokerTimeAdd,
                    })
                  }}
                </li>
                <li>{{ t('rules.jokers.btcReveal') }}</li>
              </ul>

              <h3>{{ t('rules.jokers.streakTitle') }}</h3>
              <ul>
                <li>{{ t('rules.jokers.str1') }}</li>
                <li>{{ t('rules.jokers.str2') }}</li>
                <li>{{ t('rules.jokers.str3') }}</li>
              </ul>

              <h3>{{ t('rules.jokers.investTitle') }}</h3>
              <ul>
                <li>{{ t('rules.jokers.inv1') }}</li>
                <li>{{ t('rules.jokers.inv2') }}</li>
                <li>{{ t('rules.jokers.inv3') }}</li>
              </ul>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 6: Stats -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">📊 {{ t('rules.stats.title') }}</h2>
            <ul>
              <li>{{ t('rules.stats.s1') }}</li>
              <li>{{ t('rules.stats.s2') }}</li>
              <li>{{ t('rules.stats.s3') }}</li>
              <li>{{ t('rules.stats.s4') }}</li>
            </ul>
          </div>
        </SwiperSlide>

        <!-- Slide 7: Accessibility -->
        <SwiperSlide class="rule-slide">
          <div class="rule-block">
            <h2 class="rule-title">♿ {{ t('rules.accessibility.title') }}</h2>
            <ul>
              <li>{{ t('rules.accessibility.a1') }}</li>
              <li>{{ t('rules.accessibility.a2') }}</li>
              <li>{{ t('rules.accessibility.a3') }}</li>
              <li>{{ t('rules.accessibility.a4') }}</li>
              <li>{{ t('rules.accessibility.a5') }}</li>
            </ul>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGameRules } from '@/config/gameRules'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'

// ✅ CORRECT for latest Swiper + no unused imports
import { Navigation, Pagination } from 'swiper/modules'

// ✅ CORRECT CSS (works in Vite + Netlify)
import 'swiper/swiper-bundle.css'

const rules = useGameRules()
const { t } = useI18n()
</script>

<style scoped lang="scss">
.rules-page {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cinema-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(207, 168, 88, 0.06) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: slowPan 30s linear infinite;
  pointer-events: none;
  z-index: 1;
}

.rules-wrapper {
  width: 100%;
  max-width: 920px;
  height: 90vh;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem 1rem 2rem;
}

/* HEADER SMALL & COMPACT */
.page-heading {
  text-align: center;
  flex-shrink: 0;
}

.main-heading {
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  color: var(--text-primary);
  letter-spacing: 0.1em;
  margin: 0;
}

.sub-heading {
  color: var(--text-secondary);
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  margin: 0.2rem 0 0;
}

.divider {
  color: var(--cinema-gold);
  opacity: 0.6;
  margin: 0.6rem 0;
  letter-spacing: 0.5em;
  font-size: 0.7rem;
}

/* 🔥 SWIPER CONTAINER (FITS VIEWPORT, NO SCROLL) */
.rules-swiper {
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.rule-slide {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔥 RULE BLOCK = FULLY RESPONSIVE, NO SCROLL */
.rule-block {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: clamp(1rem, 3vw, 1.4rem);
  width: 100%;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.rule-title {
  color: var(--cinema-gold);
  font-size: clamp(1rem, 3vw, 1.3rem);
  margin: 0 0 0.6rem;
  flex-shrink: 0;
}

.rule-content {
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
}

li {
  margin-bottom: 0.3rem;
}

h3 {
  font-size: clamp(0.85rem, 2vw, 1rem);
  margin: 0.8rem 0 0.4rem;
  color: var(--text-primary);
}

.text-muted {
  opacity: 0.7;
  margin-top: 0.5rem;
}

@keyframes slowPan {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}

// Swiper default colors
:deep(.swiper-pagination-bullet) {
  background: var(--text-secondary);
  opacity: 0.4;
}
:deep(.swiper-pagination-bullet-active) {
  background: var(--cinema-gold);
  opacity: 1;
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--cinema-gold);
  scale: 0.7;
}
</style>

@import "./transition.scss";
