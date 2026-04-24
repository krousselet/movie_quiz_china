import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { router } from './router'

// Import your translation JSON files
import en from './locales/en.json'

// CREATE I18N INSTANCE ✅
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en }
})

// CREATE APP ✅
const app = createApp(App)

// INSTALL PLUGINS IN ORDER ✅
app.use(i18n)
app.use(router)

app.mount('#app')