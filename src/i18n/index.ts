import { createI18n } from 'vue-i18n'

// 👇 CORRECT PATH FOR src/locales/
import en from './en.json'
import fr from './fr.json'
import id from './id.json'
import zh from './zh.json'
import ja from './ja.json'
import ru from './ru.json'
import it from './it.json'
import es from './es.json'

const savedLocale = localStorage.getItem('user-locale') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, fr, id, zh, ja, ru, it, es },
  missingWarn: false,
  fallbackWarn: false,
})
