<template>
  <section class="leaderboard-page" aria-labelledby="leaderboard-title">
    <div class="cinema-overlay"></div>

    <div class="container">
      <div class="page-head">
        <h1 id="leaderboard-title" class="page-title">Leaderboard</h1>
        <p class="page-sub">Your best quiz sessions & personal records</p>
        <div class="divider">❖ ❖ ❖</div>
      </div>

      <!-- Sort Controls -->
      <div class="sort-controls">
        <button
          class="sort-btn"
          :class="{ active: sortKey === 'score' }"
          @click="setSort('score')"
        >
          Highest Score
        </button>
        <button
          class="sort-btn"
          :class="{ active: sortKey === 'timeSpent' }"
          @click="setSort('timeSpent')"
        >
          Time Spent
        </button>
        <button
          class="sort-btn"
          :class="{ active: sortKey === 'date' }"
          @click="setSort('date')"
        >
          Latest Session
        </button>
      </div>

      <!-- No Data Fallback -->
      <div v-if="sortedEntries.length === 0" class="empty-state">
        <p>No game sessions found.<br>Play a game to save your first score.</p>
      </div>

      <!-- Leaderboard Table -->
      <div v-else class="table-wrapper">
        <table class="leader-table" aria-label="Game session scores ranking">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Mode</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Streak</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, idx) in sortedEntries" :key="entry.sessionId">
              <td class="rank">{{ idx + 1 }}</td>
              <td>{{ formatMode(entry.mode) }}</td>
              <td>{{ formatDiff(entry.difficulty) }}</td>
              <td class="highlight">{{ entry.score }}</td>
              <td>{{ entry.streak }}</td>
              <td>{{ formatTime(entry.timeSpent) }}</td>
              <td>{{ formatDate(entry.date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { LeaderboardEntry } from '@/types'

// Sort state
const sortKey = ref<'score' | 'timeSpent' | 'date'>('score')

// Raw entries from localStorage
const entries = ref<LeaderboardEntry[]>([])

// Load saved leaderboard on mount
onMounted(() => {
  const raw = localStorage.getItem('movie-quiz-leaderboard')
  if (raw) entries.value = JSON.parse(raw)
})

// Sorting logic
const setSort = (key: typeof sortKey.value) => {
  sortKey.value = key
}

const sortedEntries = computed(() => {
  const list = [...entries.value]
  switch (sortKey.value) {
    case 'score':
      return list.sort((a, b) => b.score - a.score)
    case 'timeSpent':
      return list.sort((a, b) => a.timeSpent - b.timeSpent)
    case 'date':
      return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    default:
      return list
  }
})

// ===== Formatters (i18n ready later) =====
const formatMode = (mode: string) => {
  const map: Record<string, string> = {
    classic: 'Classic',
    'beat-the-clock': 'Beat The Clock',
    'longest-streak': 'Longest Streak',
    investigation: 'Investigation'
  }
  return map[mode] || mode
}

const formatDiff = (diff: string) => {
  const map: Record<string, string> = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    master: 'Master'
  }
  return map[diff] || diff
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString()
}
</script>

<style scoped lang="scss">
.leaderboard-page {
  min-height: calc(100vh - 70px);
  padding: 3rem 1.2rem;
  position: relative;
  background: var(--bg-primary);
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
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.page-head {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text-primary);
  letter-spacing: 0.15em;
  margin-bottom: 0.6rem;
}

.page-sub {
  color: var(--text-secondary);
  font-size: 1rem;
}

.divider {
  color: var(--cinema-gold);
  opacity: 0.6;
  margin: 1.8rem 0;
  letter-spacing: 0.6em;
}

/* Sort Buttons */
.sort-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.sort-btn {
  padding: 0.6rem 1.4rem;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(207, 168, 88, 0.4);
    color: var(--text-primary);
  }

  &.active {
    background: var(--cinema-gold);
    color: #000;
    border-color: var(--cinema-gold);
  }
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

.leader-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.leader-table thead {
  border-bottom: 1px solid var(--border-color);
}

.leader-table th {
  padding: 1.1rem 0.8rem;
  color: var(--cinema-gold);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-align: left;
  white-space: nowrap;
}

.leader-table td {
  padding: 1rem 0.8rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.leader-table tr:hover td {
  background: rgba(207, 168, 88, 0.05);
}

.rank {
  color: var(--cinema-gold);
  font-weight: 600;
}

.highlight {
  color: var(--cinema-gold);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .leader-table th,
  .leader-table td {
    padding: 0.8rem 0.5rem;
    font-size: 0.9rem;
  }
}

/* Ultra wide cinema screens */
@media (min-width: 1920px) {
  .container {
    max-width: 1600px;
  }
}
</style>