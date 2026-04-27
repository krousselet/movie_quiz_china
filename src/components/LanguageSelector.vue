<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' }, // 👈 ADD MISSING CHINESE
  { code: 'it', label: 'Italiano' },
]

const currentLang = ref('')

// Load saved lang
onMounted(() => {
  currentLang.value = locale.value
})

// Change lang + save
const changeLanguage = () => {
  locale.value = currentLang.value
  localStorage.setItem('user-locale', currentLang.value)
}
</script>
