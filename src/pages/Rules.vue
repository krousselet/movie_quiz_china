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

<style lang="scss" scoped>
@use '@/assets/styles/_rules';
</style>
