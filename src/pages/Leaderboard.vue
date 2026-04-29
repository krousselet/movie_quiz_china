<template>
  <section class="leaderboard-page">
    <div class="container">
      <h1>{{ $t('leaderboard.pageTitle') }}</h1>
      <p class="subtitle">{{ $t('leaderboard.pageDescription') }}</p>

      <button v-if="leaderboard.length > 0" class="clear-btn" @click="clearLeaderboard">
        {{ $t('leaderboard.clearLeaderboard') }}
      </button>

      <div v-if="leaderboard.length === 0" class="empty-state">
        <p>{{ $t('leaderboard.noSave') }}</p>
        <p>{{ $t('leaderboard.message') }}</p>
      </div>

      <div v-else class="leaderboard-list">
        <div v-for="(entry, index) in leaderboard" :key="index" class="leaderboard-card">
          <div class="rank">#{{ index + 1 }}</div>

          <div class="info">
            <div class="mode-badge">{{ entry.mode }} • {{ entry.difficulty }}</div>

            <div class="score">{{ $t('leaderboard.score') }} {{ entry.score }}</div>

            <div class="stat-line">
              {{ $t('leaderboard.bestStreak') }}
              <strong>{{ entry.bestStreak || 0 }}</strong>
            </div>

            <div class="stat-line">
              {{ $t('leaderboard.duration') }}
              {{ formatDuration(entry.durationSeconds || 0) }}
            </div>

            <div class="stat-line">
              {{ $t('leaderboard.jokersUsed') }}
              {{ getJokerText(entry.jokersUsed) }}
            </div>

            <div class="date">{{ formatDate(entry.date) }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const leaderboard = ref<any[]>([])

onMounted(() => {
  const saved = localStorage.getItem('leaderboard')
  if (saved) {
    leaderboard.value = JSON.parse(saved)
    leaderboard.value.sort((a, b) => b.score - a.score)
  }
})

// DATE WITHOUT SECONDS
const formatDate = (isoString: string) => {
  const d = new Date(isoString)
  return (
    d.toLocaleDateString() +
    ' ' +
    d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  )
}

// GAME DURATION
const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}m ${s}s`
}

// DYNAMIC JOKER LIST WITH TRANSLATIONS
const getJokerText = (jokers: any) => {
  if (!jokers) return t('leaderboard.jokersNone')
  const list = []

  if (jokers.revealLetter) {
    list.push(`${t('jokers.revealLetter')} ×${jokers.revealLetter}`)
  }
  if (jokers.skip) {
    list.push(`${t('jokers.skip')} ×${jokers.skip}`)
  }
  if (jokers.fiftyFifty) {
    list.push(`${t('jokers.fiftyFifty')} ×${jokers.fiftyFifty}`)
  }
  if (jokers.stopTimer) {
    list.push(`${t('jokers.stopTimer')} ×${jokers.stopTimer}`)
  }
  if (jokers.addTime) {
    list.push(`${t('jokers.addTime')} ×${jokers.addTime}`)
  }
  if (jokers.protectStreak) {
    list.push(`${t('jokers.protectStreak')} ×${jokers.protectStreak}`)
  }
  if (jokers.instantWin) {
    list.push(`${t('jokers.instantWin')} ×${jokers.instantWin}`)
  }

  return list.length ? list.join(' • ') : t('leaderboard.jokersNone')
}

// CLEAR CONFIRM WITH TRANSLATION
const clearLeaderboard = () => {
  if (confirm(t('leaderboard.confirmClear'))) {
    localStorage.removeItem('leaderboard')
    leaderboard.value = []
  }
}
</script>

<style scoped lang="scss">
.leaderboard-page {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: clamp(1.8rem, 6vw, 2.5rem);
  color: var(--cinema-gold);
  margin-bottom: 0.5rem;
}

.subtitle {
  opacity: 0.7;
  margin-bottom: 1.5rem;
}

.clear-btn {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: 0.2s;
}
.clear-btn:hover {
  background: #c53030;
}

.empty-state {
  padding: 3rem 1rem;
  opacity: 0.5;
  line-height: 1.6;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.leaderboard-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-align: left;
}

.rank {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cinema-gold);
  min-width: 50px;
}

.info {
  flex: 1;
}

.mode-badge {
  background: #444;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.score {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.stat-line {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0.2rem 0;
}

.date {
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 0.5rem;
}
</style>
