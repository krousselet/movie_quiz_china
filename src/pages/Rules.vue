<template>
  <section class="rules-page">
    <div class="cinema-overlay"></div>
    <div class="rules-container">
      <div class="page-heading">
        <h1 class="main-heading">{{ $t('rules.pageTitle') }}</h1>
        <p class="sub-heading">{{ $t('rules.subTitle') }}</p>
        <div class="divider">❖ ❖ ❖</div>
      </div>

      <!-- Classic Mode -->
      <div class="rule-block">
        <h2 class="rule-title">🎬 {{ $t('rules.classic.title') }}</h2>
        <div class="rule-content">
          <p>{{ $t('rules.classic.desc') }}</p>
          <ul>
            <li>{{ $t('rules.classic.point1') }}</li>
            <li>{{ $t('rules.classic.point2') }}</li>
            <li>{{ $t('rules.classic.point3') }}</li>
            <li>{{ $t('rules.classic.point4') }}</li>
          </ul>
        </div>
      </div>

      <!-- Beat The Clock -->
      <div class="rule-block">
        <h2 class="rule-title">⏱️ {{ $t('rules.beatClock.title') }}</h2>
        <div class="rule-content">
          <p>{{ $t('rules.beatClock.desc', { min: rules.modes.beatTheClock.timeLimit }) }}</p>
          <ul>
            <li>
              {{
                $t('rules.beatClock.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.easy'),
                  count: rules.modes.beatTheClock.difficulties.easy,
                  min: rules.modes.beatTheClock.timeLimit,
                })
              }}
            </li>
            <li>
              {{
                $t('rules.beatClock.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.medium'),
                  count: rules.modes.beatTheClock.difficulties.medium,
                  min: rules.modes.beatTheClock.timeLimit,
                })
              }}
            </li>
            <li>
              {{
                $t('rules.beatClock.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.hard'),
                  count: rules.modes.beatTheClock.difficulties.hard,
                  min: rules.modes.beatTheClock.timeLimit,
                })
              }}
            </li>
            <li>
              {{
                $t('rules.beatClock.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.master'),
                  count: rules.modes.beatTheClock.difficulties.master,
                  min: rules.modes.beatTheClock.timeLimit,
                })
              }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Longest Streak -->
      <div class="rule-block">
        <h2 class="rule-title">🔥 {{ $t('rules.streak.title') }}</h2>
        <div class="rule-content">
          <p>{{ $t('rules.streak.desc') }}</p>
          <ul>
            <li>
              {{
                $t('rules.streak.lines.easy', {
                  count: rules.modes.longestStreak.difficulties.easy,
                })
              }}
            </li>
            <li>{{ $t('rules.streak.lines.medium') }}</li>
            <li>{{ $t('rules.streak.lines.hard') }}</li>
            <li>{{ $t('rules.streak.lines.master') }}</li>
          </ul>
        </div>
      </div>

      <!-- Investigation Mode -->
      <div class="rule-block">
        <h2 class="rule-title">🔍 {{ $t('rules.investigation.title') }}</h2>
        <div class="rule-content">
          <p>{{ $t('rules.investigation.desc') }}</p>
          <ul>
            <li>{{ $t('rules.investigation.mech1') }}</li>
            <li>{{ $t('rules.investigation.mech2') }}</li>
            <li>
              {{
                $t('rules.investigation.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.easy'),
                  count: rules.modes.investigation.difficulties.easy,
                })
              }}
            </li>
            <li>
              {{
                $t('rules.investigation.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.medium'),
                  count: rules.modes.investigation.difficulties.medium,
                })
              }}
            </li>
            <li>
              {{
                $t('rules.investigation.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.hard'),
                  count: rules.modes.investigation.difficulties.hard,
                })
              }}
            </li>
            <li>
              {{
                $t('rules.investigation.diffLine', {
                  diff: $t('rules.beatClock.diffLabel.master'),
                  count: rules.modes.investigation.difficulties.master,
                })
              }}
            </li>
          </ul>
          <p class="text-muted">
            <em>{{ $t('rules.investigation.note') }}</em>
          </p>
        </div>
      </div>

      <!-- Jokers -->
      <div class="rule-block">
        <h2 class="rule-title">🃏 {{ $t('rules.jokers.title') }}</h2>
        <div class="rule-content">
          <p>{{ $t('rules.jokers.desc') }}</p>

          <h3>{{ $t('rules.jokers.btcTitle') }}</h3>
          <ul>
            <li>{{ $t('rules.jokers.btcSkip') }}</li>
            <li>
              {{
                $t('rules.jokers.btcPause', {
                  secPause: rules.modes.beatTheClock.jokerPauseSec,
                })
              }}
            </li>
            <li>
              {{ $t('rules.jokers.btcAdd', { secAdd: rules.modes.beatTheClock.jokerTimeAdd }) }}
            </li>
            <li>{{ $t('rules.jokers.btcReveal') }}</li>
          </ul>

          <h3>{{ $t('rules.jokers.streakTitle') }}</h3>
          <ul>
            <li>{{ $t('rules.jokers.str1') }}</li>
            <li>{{ $t('rules.jokers.str2') }}</li>
            <li>{{ $t('rules.jokers.str3') }}</li>
          </ul>

          <h3>{{ $t('rules.jokers.investTitle') }}</h3>
          <ul>
            <li>{{ $t('rules.jokers.inv1') }}</li>
            <li>{{ $t('rules.jokers.inv2') }}</li>
            <li>{{ $t('rules.jokers.inv3') }}</li>
          </ul>
        </div>
      </div>

      <!-- Stats -->
      <div class="rule-block">
        <h2 class="rule-title">📊 {{ $t('rules.stats.title') }}</h2>
        <ul>
          <li>{{ $t('rules.stats.s1') }}</li>
          <li>{{ $t('rules.stats.s2') }}</li>
          <li>{{ $t('rules.stats.s3') }}</li>
          <li>{{ $t('rules.stats.s4') }}</li>
        </ul>
      </div>

      <!-- Accessibility -->
      <div class="rule-block">
        <h2 class="rule-title">♿ {{ $t('rules.accessibility.title') }}</h2>
        <ul>
          <li>{{ $t('rules.accessibility.a1') }}</li>
          <li>{{ $t('rules.accessibility.a2') }}</li>
          <li>{{ $t('rules.accessibility.a3') }}</li>
          <li>{{ $t('rules.accessibility.a4') }}</li>
          <li>{{ $t('rules.accessibility.a5') }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGameRules } from '@/config/gameRules'
const rules = useGameRules()
</script>

<style scoped lang="scss">
.rules-page {
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  padding: 1rem 0.8rem;
  margin: 0;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.cinema-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(207, 168, 88, 0.06) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: slowPan 30s linear infinite;
  pointer-events: none;
}

@keyframes slowPan {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}

.rules-container {
  width: 100%;
  max-width: 1100px;
  height: 100%;
  position: relative;
  z-index: 2;
  overflow-y: auto;
  padding-right: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.page-heading {
  text-align: center;
  margin-bottom: 0.5rem;
}

.main-heading {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  color: var(--text-primary);
  letter-spacing: 0.15em;
  margin: 0 0 0.4rem;
}

.sub-heading {
  color: var(--text-secondary);
  font-size: clamp(0.85rem, 2vw, 1rem);
  margin: 0;
}

.divider {
  color: var(--cinema-gold);
  opacity: 0.6;
  margin: 1rem 0;
  letter-spacing: 0.6em;
  font-size: 0.9rem;
}

.rule-block {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 1rem 1.4rem;
  transition: border 0.3s ease;
}

.rule-title {
  color: var(--cinema-gold);
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  margin: 0 0 0.6rem;
}

.rule-content {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
}

.text-muted {
  opacity: 0.7;
}
</style>
