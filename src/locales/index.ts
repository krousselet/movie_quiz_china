import { createI18n } from 'vue-i18n'
import fr from './fr.json'
import id from './id.json'
import zh from './zh.json'
import ja from './ja.json'
import ru from './ru.json'
import it from './it.json'
import es from './es.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh', // Default: Chinese (China accessible)
  fallbackLocale: 'en',
  messages: { fr, id, zh, ja, ru, it, es }
})