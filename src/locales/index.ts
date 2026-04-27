import { createI18n } from 'vue-i18n'
import en from './en.json'
import fr from './fr.json'
import id from './id.json'
import zh from './zh.json'
import ja from './ja.json'
import ru from './ru.json'
import it from './it.json'
import es from './es.json'

// Load saved language first
const savedLocale = localStorage.getItem('user-locale') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale, //  Used so automatically detects the local language in the browser
  fallbackLocale: 'en',
  messages: { en, fr, id, zh, ja, ru, it, es },
  missingWarn: false,
  fallbackWarn: false,
})
