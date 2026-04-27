<template>
  <main class="settings-page">
    <div class="settings-container">
      <h1 class="page-title">{{ $t('settings.title') }}</h1>

      <!-- LANGUAGE SELECTOR (NOW USING languages ARRAY ✅) -->
      <div class="settings-card">
        <label class="label">{{ $t('settings.language') }}</label>
        <select v-model="currentLang" @change="changeLanguage" class="select">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.label }}
          </option>
        </select>
      </div>

      <!-- MUSIC -->
      <div class="settings-card">
        <label class="settings-label">
          {{ $t('settings.music') }}
          <input type="checkbox" v-model="musicEnabled" @change="toggleMusic" />
        </label>
      </div>

      <!-- DARK MODE -->
      <div class="settings-card">
        <label class="settings-label">
          {{ $t('settings.darkMode') }}
          <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" />
        </label>
      </div>

      <!-- FONT SIZE -->
      <div class="settings-card">
        <label class="settings-label">
          {{ $t('settings.fontSize') }}
          <select v-model="fontSize" @change="changeFont">
            <option value="small">{{ $t('settings.small') }}</option>
            <option value="normal">{{ $t('settings.normal') }}</option>
            <option value="large">{{ $t('settings.large') }}</option>
          </select>
        </label>
      </div>

      <!-- BACK BUTTON -->
      <button @click="goBack" class="back-btn">{{ $t('common.back') }}</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()

// 👇 NOW USED IN TEMPLATE → NO WARNING
const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
  { code: 'it', label: 'Italiano' },
]

const currentLang = ref('')
const musicEnabled = ref(true)
const darkMode = ref(false)
const fontSize = ref('normal')

// Load saved settings
onMounted(() => {
  currentLang.value = locale.value
  musicEnabled.value = localStorage.getItem('music-enabled') !== 'false'
  darkMode.value = localStorage.getItem('dark-mode') === 'true'
  fontSize.value = localStorage.getItem('font-size') || 'normal'
})

// Change language
const changeLanguage = () => {
  locale.value = currentLang.value
  localStorage.setItem('user-locale', currentLang.value)
}

// Toggle music
const toggleMusic = () => {
  localStorage.setItem('music-enabled', musicEnabled.value ? 'true' : 'false')
}

// Toggle dark mode
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark', darkMode.value)
  localStorage.setItem('dark-mode', darkMode.value ? 'true' : 'false')
}

// Change font size
const changeFont = () => {
  document.documentElement.dataset.fontSize = fontSize.value
  localStorage.setItem('font-size', fontSize.value)
}

// Go back
const goBack = () => router.back()
</script>

<style scoped>
.settings-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 2rem;
}
.settings-container {
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.page-title {
  text-align: center;
  font-size: 1.8rem;
  color: var(--text-primary);
}
.settings-card {
  background: var(--bg-secondary);
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}
.settings-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  font-weight: 500;
}
.label {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  display: block;
  color: var(--text-primary);
}
.select {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
.back-btn {
  padding: 1rem;
  border-radius: 10px;
  background: var(--cinema-gold);
  color: black;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>
