import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'lyric-theme'

const theme = ref<Theme>('dark')

function applyTheme(value: Theme) {
  document.documentElement.setAttribute('data-theme', value)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', value === 'dark' ? '#1d2021' : '#fbf1c7')
  }
}

function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  const initial: Theme = stored ?? (prefersLight ? 'light' : 'dark')
  theme.value = initial
  applyTheme(initial)

  watch(theme, (value) => {
    applyTheme(value)
    localStorage.setItem(STORAGE_KEY, value)
  })
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export function useTheme() {
  return {
    theme,
    initTheme,
    toggleTheme,
  }
}