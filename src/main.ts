// 👇 WE IMPORT watch HERE
import { createApp, watch } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import { createPinia } from 'pinia'
import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

// Update browser title with translation
function updateDocumentTitle() {
  document.title = i18n.global.t('app.title')
}

// Set title once on load
updateDocumentTitle()

// ✅ WATCH LOCALE CHANGES (NOW WORKS)
watch(
  () => i18n.global.locale.value,
  () => updateDocumentTitle(),
)

app.mount('#app')
