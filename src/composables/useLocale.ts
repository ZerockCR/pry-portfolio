import { watch } from 'vue'
import i18n from '../i18n'

const locale = i18n.global.locale

watch(
  locale,
  (value) => {
    document.documentElement.lang = value
    localStorage.setItem('locale', value)
  },
  { immediate: true },
)

export function useLocale() {
  function toggleLocale() {
    locale.value = locale.value === 'es' ? 'en' : 'es'
  }

  return { locale, toggleLocale }
}
