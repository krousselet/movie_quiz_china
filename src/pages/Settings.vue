<template>
  <section class="settings-page" aria-labelledby="settings-title">
    <div class="cinema-overlay"></div>

    <div class="settings-container">
      <div class="page-heading">
        <h1 id="settings-title" class="page-title">Settings</h1>
        <p class="page-sub">Customize your experience, accessibility & display</p>
        <div class="divider">❖ ❖ ❖</div>
      </div>

      <!-- Theme / Dark Mode -->
      <div class="setting-block">
        <div class="setting-info">
          <h2 class="setting-label">Dark Mode</h2>
          <p class="setting-desc">Switch between light and cinema dark theatre theme</p>
        </div>
        <label class="toggle-switch" aria-label="Toggle dark mode">
          <input
            v-model="darkMode"
            type="checkbox"
            @change="saveSettings"
          />
          <span class="slider"></span>
        </label>
      </div>

      <!-- Background Music -->
      <div class="setting-block">
        <div class="setting-info">
          <h2 class="setting-label">Background Music</h2>
          <p class="setting-desc">Enable or disable vintage theatre ambient music</p>
        </div>
        <label class="toggle-switch" aria-label="Toggle background music">
          <input
            v-model="musicEnabled"
            type="checkbox"
            @change="saveSettings"
          />
          <span class="slider"></span>
        </label>
      </div>

      <!-- Font Size -->
      <div class="setting-block">
        <div class="setting-info">
          <h2 class="setting-label">Font Size</h2>
          <p class="setting-desc">Adjust text size for visual comfort & accessibility</p>
        </div>
        <div class="select-wrapper">
          <select
            v-model="fontSize"
            @change="saveSettings"
            aria-label="Choose font size"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
      </div>

      <!-- Font Style -->
      <div class="setting-block">
        <div class="setting-info">
          <h2 class="setting-label">Font Style</h2>
          <p class="setting-desc">Change typography (cinema / classic / readable)</p>
        </div>
        <div class="select-wrapper">
          <select
            v-model="fontStyle"
            @change="saveSettings"
            aria-label="Choose font style"
          >
            <option value="cinema">Cinema Vintage</option>
            <option value="classic">Classic Serif</option>
            <option value="readable">High Readable</option>
          </select>
        </div>
      </div>

      <!-- Accessibility Info Block -->
      <div class="setting-block info-block">
        <div class="setting-info">
          <h2 class="setting-label">Accessibility</h2>
          <p class="setting-desc">
            This website is optimized for screen readers, keyboard navigation,
            visually impaired and deaf users. All interactive elements have
            aria labels, high contrast support and focus states.
          </p>
        </div>
      </div>

      <!-- Reset Settings -->
      <div class="action-row">
        <button class="btn-reset" @click="resetSettings" aria-label="Reset all settings to default">
          Restore Default Settings
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

type FontSize = 'small' | 'medium' | 'large' | 'xl'
type FontStyle = 'cinema' | 'classic' | 'readable'

const darkMode = ref<boolean>(true)
const musicEnabled = ref<boolean>(false)
const fontSize = ref<FontSize>('medium')
const fontStyle = ref<FontStyle>('cinema')

onMounted(() => {
  const saved = localStorage.getItem('movie-quiz-user-settings')
  if (saved) {
    const parsed = JSON.parse(saved)
    darkMode.value = parsed.darkMode ?? true
    musicEnabled.value = parsed.musicEnabled ?? false
    fontSize.value = (parsed.fontSize as FontSize) ?? 'medium'
    fontStyle.value = (parsed.fontStyle as FontStyle) ?? 'cinema'
  }
  applySettings()
})

const saveSettings = () => {
  localStorage.setItem(
    'movie-quiz-user-settings',
    JSON.stringify({
      darkMode: darkMode.value,
      musicEnabled: musicEnabled.value,
      fontSize: fontSize.value,
      fontStyle: fontStyle.value,
    })
  )
  applySettings()
}

const applySettings = () => {
  const html = document.documentElement

  // Explicitly add/remove the class that matches your CSS
  if (darkMode.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }

  // Font size
  const sizeMap: Record<FontSize, string> = {
    small: '90%',
    medium: '100%',
    large: '115%',
    xl: '130%',
  }
  html.style.fontSize = sizeMap[fontSize.value]

  // Font style
  const fontMap: Record<FontStyle, string> = {
    cinema: "'Playfair Display', serif",
    classic: "'Times New Roman', serif",
    readable: "'Segoe UI', sans-serif",
  }
  html.style.fontFamily = fontMap[fontStyle.value]
}

const resetSettings = () => {
  darkMode.value = true
  musicEnabled.value = false
  fontSize.value = 'medium'
  fontStyle.value = 'cinema'
  saveSettings()
}

watch(darkMode, applySettings)
</script>

<style scoped lang="scss">
.settings-page {
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

.settings-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.page-heading {
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

/* Setting Row Block */
.setting-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1.6rem 1.8rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-bottom: 1.2rem;
  color: var(--text-primary);

  &:hover {
    border-color: rgba(207, 168, 88, 0.25);
  }
}

.setting-info {
  flex: 1;
}

.setting-label {
  color: var(--cinema-gold);
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
  letter-spacing: 0.05em;
}

.setting-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.info-block {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #333;
    transition: 0.35s ease;
    border-radius: 30px;

    &:before {
      position: absolute;
      content: '';
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
      background: #fff;
      transition: 0.35s ease;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background: var(--cinema-gold);
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
}

/* Select Dropdown */
.select-wrapper select {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 0.6rem 1rem;
  border-radius: 2px;
  min-width: 180px;
  cursor: pointer;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--cinema-gold);
  }
}

/* Reset Button */
.action-row {
  text-align: center;
  margin-top: 3rem;
}

.btn-reset {
  padding: 0.8rem 2rem;
  background: transparent;
  border: 1px solid var(--cinema-red);
  color: var(--text-secondary);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    background: rgba(123, 16, 16, 0.15);
    color: var(--text-primary);
  }
}

/* Responsive Mobile */
@media (max-width: 640px) {
  .setting-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>