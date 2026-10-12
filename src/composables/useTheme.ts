import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'
type Stored = Theme | 'auto'

const STORAGE_KEY = 'lyric-theme'
const mql = window.matchMedia('(prefers-color-scheme: light)')

const preference = ref<Stored>('auto')      // выбор пользователя
const systemTheme = ref<Theme>(mql.matches ? 'light' : 'dark')
const theme = ref<Theme>(systemTheme.value) // итоговая активная тема

function applyTheme(value: Theme) {
  document.documentElement.setAttribute('data-theme', value)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', value === 'dark' ? '#1d2021' : '#fbf1c7')
  }
}

function resolveTheme(pref: Stored, sys: Theme): Theme {
  if (pref === 'auto') return sys
  return pref
}

function syncTheme() {
  const next = resolveTheme(preference.value, systemTheme.value)
  if (next !== theme.value) {
    theme.value = next
    applyTheme(next)
  }
}

function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY) as Stored | null
  if (stored === 'dark' || stored === 'light' || stored === 'auto') {
    preference.value = stored
  } else {
    preference.value = 'auto'
  }

  systemTheme.value = mql.matches ? 'light' : 'dark'
  theme.value = resolveTheme(preference.value, systemTheme.value)
  applyTheme(theme.value)

  // Следим за сменой системной темы
  mql.addEventListener('change', (e) => {
    systemTheme.value = e.matches ? 'light' : 'dark'
    syncTheme()
  })

  watch(preference, (p) => {
    if (p === 'auto') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, p)
    syncTheme()
  })
}

function toggleTheme() {
  // Переключатель всегда ставит явную тему, выходя из auto
  preference.value = theme.value === 'dark' ? 'light' : 'dark'
}

function resetToAuto() {
  preference.value = 'auto'
}

export function useTheme() {
  return {
    theme,
    preference,
    initTheme,
    toggleTheme,
    resetToAuto,
  }
}