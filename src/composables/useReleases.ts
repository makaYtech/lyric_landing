import { ref, computed } from 'vue'

const BASE_URL = 'https://raw.githubusercontent.com/makaYtech/lyric_apk/main/docs'
const CACHE_KEY = 'lyric-manifests-cache'
const CACHE_TTL = 10 * 60 * 1000 // 10 минут

export interface AndroidManifest {
  version: string
  apk_name: string
  changelog: string
  size_bytes: number
  sha256: string
}

export interface DesktopManifest {
  version: string
  download_url: string
  file_size: number
  sha256: string
  release_notes: string
}

// Состояния
const androidRelease = ref<AndroidManifest | null>(null)
const windowsRelease = ref<DesktopManifest | null>(null)
const linuxRelease = ref<DesktopManifest | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Определение ОС
export type OS = 'windows' | 'linux' | 'macos' | 'android' | 'ios' | 'unknown'

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('android')) return 'android'
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios'
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
}

const currentOS = ref<OS>(detectOS())

async function fetchLatestManifests(force = false) {
  if (loading.value) return
  
  // Проверка кэша
  if (!force) {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Date.now() - parsed.ts < CACHE_TTL) {
          androidRelease.value = parsed.android
          windowsRelease.value = parsed.windows
          linuxRelease.value = parsed.linux
          return
        }
      }
    } catch { /* ignore cache errors */ }
  }

  loading.value = true
  error.value = null

  try {
    const [resAndroid, resWin, resLinux] = await Promise.all([
      fetch(`${BASE_URL}/update.json`),
      fetch(`${BASE_URL}/windows_update.json`),
      fetch(`${BASE_URL}/linux_update.json`)
    ])

    // Android
    if (resAndroid.ok) {
      const data = await resAndroid.json()
      androidRelease.value = data.release // берем из канала release
    }

    // Windows
    if (resWin.ok) {
      windowsRelease.value = await resWin.json()
    }

    // Linux
    if (resLinux.ok) {
      linuxRelease.value = await resLinux.json()
    }

    // Сохраняем в кэш
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      ts: Date.now(),
      android: androidRelease.value,
      windows: windowsRelease.value,
      linux: linuxRelease.value
    }))

  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Не удалось получить данные о релизах'
  } finally {
    loading.value = false
  }
}

// Ссылка для Android (собирается из имени файла и версии)
const androidDownloadUrl = computed(() => {
  if (!androidRelease.value) return null
  const { version, apk_name } = androidRelease.value
  return `https://github.com/makaYtech/lyric_apk/releases/download/v${version}/${apk_name}`
})

// Форматирование размера
function formatSize(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1) + ' МБ'
}

function formatVersion(tag: string): string {
  return tag.replace(/^v/, '')
}

export function useReleases() {
  return {
    androidRelease,
    windowsRelease,
    linuxRelease,
    androidDownloadUrl,
    currentOS,
    loading,
    error,
    fetchLatestManifests,
    formatSize,
    formatVersion
  }
}