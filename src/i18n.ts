import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

export type AppLocale = 'es' | 'en'

function getInitialLocale(): AppLocale {
  const stored = localStorage.getItem('locale')
  if (stored === 'es' || stored === 'en') return stored
  return 'es'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'es',
  messages: { es, en },
})

export default i18n
