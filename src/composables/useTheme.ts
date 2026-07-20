import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(getInitialTheme())

watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value
    localStorage.setItem('theme', value)
  },
  { immediate: true },
)

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
