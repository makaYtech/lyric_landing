import { ref } from 'vue'

const REPO = 'makaYtech/lyric_apk'
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`
const CACHE_KEY = 'lyric-latest-release'
const CACHE_TTL = 10 * 60 * 1000 // 10 минут

export interface ReleaseAsset {
  name: string
  browser_download_url: string
  size: number
}

export interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string
  assets: ReleaseAsset[]
}

interface CachedRelease {
  data: Release
  ts: number
}

const release = ref<Release | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

function readCache(): Release | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed: CachedRelease = JSON.parse(raw)
    if (Date.now() - parsed.ts > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

function writeCache(data: Release) {
  try {
    const payload: CachedRelease = { data, ts: Date.now() }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // sessionStorage может быть недоступен — игнорируем
  }
}

async function fetchLatestRelease(force = false): Promise<void> {
  if (loading.value) return
  if (!force) {
    const cached = readCache()
    if (cached) {
      release.value = cached
      return
    }
  }

  loading.value = true
  error.value = null

  try {
    const res = await fetch(API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) {
      throw new Error(`GitHub API: ${res.status} ${res.statusText}`)
    }
    const data: Release = await res.json()
    release.value = data
    writeCache(data)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Не удалось получить релиз'
  } finally {
    loading.value = false
  }
}

/** Находит APK-файл в ассетах последнего релиза */
function getApkAsset(r: Release | null): ReleaseAsset | null {
  if (!r) return null
  return r.assets.find((a) => a.name.endsWith('.apk')) ?? null
}

/** Красивая версия без префикса «v» */
function formatVersion(tag: string): string {
  return tag.replace(/^v/, '')
}

/** Дата в формате «12 окт 2026» */
function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

/** Размер файла в МБ */
function formatSize(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1) + ' МБ'
}

export function useReleases() {
  return {
    release,
    loading,
    error,
    fetchLatestRelease,
    getApkAsset,
    formatVersion,
    formatDate,
    formatSize,
  }
}