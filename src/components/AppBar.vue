<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="appbar" :class="{ 'appbar--scrolled': scrolled }">
    <div class="container appbar__inner">
      <a href="#top" class="appbar__brand">
        <img
          src="/lyric_landing/logo-512.png"
          alt="Лирика"
          class="appbar__logo"
        />
        <span class="appbar__name mono">Лирика</span>
      </a>

      <nav class="appbar__actions">
        <a
          href="https://github.com/makaYtech/lyric_apk"
          target="_blank"
          rel="noopener"
          class="appbar__icon-btn"
          aria-label="GitHub"
        >
          <Github :size="20" />
        </a>

        <button
          class="appbar__icon-btn"
          :aria-label="theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'"
          @click="toggleTheme"
        >
          <Sun v-if="theme === 'dark'" :size="20" />
          <Moon v-else :size="20" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.appbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background-color var(--dur-medium) var(--ease-standard),
              backdrop-filter var(--dur-medium) var(--ease-standard),
              border-color var(--dur-medium) var(--ease-standard);
  border-bottom: 1px solid transparent;
}

.appbar--scrolled {
  background: color-mix(in srgb, var(--md-surface-dim) 80%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--md-outline-variant);
}

.appbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.appbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--md-on-surface);
  text-decoration: none;
}

.appbar__brand:hover {
  opacity: 1;
}

.appbar__logo {
  width: 36px;
  height: 30px;
  object-fit: contain;
  border-radius: var(--r-sm);
}

.appbar__name {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.appbar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.appbar__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--r-full);
  background: transparent;
  color: var(--md-on-surface-variant);
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--dur-short) var(--ease-standard),
              color var(--dur-short) var(--ease-standard);
}

.appbar__icon-btn:hover {
  background: var(--md-surface-container);
  color: var(--md-on-surface);
  opacity: 1;
}

@media (max-width: 640px) {
  .appbar__name { display: none; }
}
</style>