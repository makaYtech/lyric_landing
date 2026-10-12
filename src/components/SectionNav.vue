<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Hash, X } from 'lucide-vue-next'

interface SectionLink {
  id: string
  label: string
  labelEn: string
  num: string
}

const sections: SectionLink[] = [
  { id: 'top', label: 'Начало', labelEn: 'TOP', num: '00' },
	{ id: 'screenshots', label: 'Превью', labelEn: 'PREVIEW', num: '—' },
  { id: 'platforms', label: 'Платформы', labelEn: 'PLATFORMS', num: '01' },
  { id: 'features', label: 'Возможности', labelEn: 'FEATURES', num: '02' },
  { id: 'security', label: 'Безопасность', labelEn: 'SECURITY', num: '03' },
  { id: 'install', label: 'Установка', labelEn: 'INSTALL', num: '04' },
  { id: 'channels', label: 'Каналы', labelEn: 'CHANNELS', num: '05' },
  { id: 'warning', label: 'Важно', labelEn: 'DISCLAIMER', num: '06' },
  { id: 'about', label: 'Об авторе', labelEn: 'ABOUT', num: '07' },
]

const open = ref(false)
const activeId = ref('top')

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function goTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  close()
}

let observer: IntersectionObserver | null = null

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
  )

  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  setupObserver()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="section-nav">
    <Transition name="backdrop">
      <div v-if="open" class="section-nav__backdrop" @click="close" />
    </Transition>

    <Transition name="menu">
      <nav v-if="open" class="section-nav__menu" aria-label="Навигация по секциям">
        <div class="section-nav__menu-header mono">sections</div>
        <ul class="section-nav__list">
          <li v-for="s in sections" :key="s.id">
            <button
              class="section-nav__item"
              :class="{ 'section-nav__item--active': activeId === s.id }"
              @click="goTo(s.id)"
            >
              <span class="section-nav__num mono">{{ s.num }}</span>
              <span class="section-nav__labels">
                <span class="section-nav__label">{{ s.label }}</span>
                <span class="section-nav__label-en mono">{{ s.labelEn }}</span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </Transition>

    <button
      class="section-nav__fab"
      :aria-label="open ? 'Закрыть навигацию' : 'Открыть навигацию'"
      :aria-expanded="open"
      @click="toggle"
    >
      <Transition name="icon" mode="out-in">
        <X v-if="open" :size="22" key="close" />
        <Hash v-else :size="22" key="hash" />
      </Transition>
    </button>
  </div>
</template>

<style scoped>
.section-nav {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.section-nav__backdrop {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--bg-hard) 55%, transparent);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: -2;
}

.section-nav__menu {
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  border-radius: var(--r-xl);
  box-shadow: var(--elev-3);
  padding: 8px;
  min-width: 260px;
  max-height: min(70vh, 520px);
  overflow-y: auto;
}

.section-nav__menu-header {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--md-on-surface-variant);
  opacity: 0.6;
  padding: 8px 12px 10px;
}

.section-nav__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.section-nav__item {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: var(--r-md);
  background: transparent;
  color: var(--md-on-surface);
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--dur-short) var(--ease-standard),
              color var(--dur-short) var(--ease-standard);
}

.section-nav__item:hover {
  background: var(--md-surface-container);
}

.section-nav__item--active {
  background: color-mix(in srgb, var(--md-primary) 12%, transparent);
  color: var(--md-primary);
}

.section-nav__num {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--md-on-surface-variant);
  opacity: 0.7;
  flex-shrink: 0;
}

.section-nav__item--active .section-nav__num {
  color: var(--md-primary);
  opacity: 1;
}

.section-nav__labels {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.section-nav__label {
  font-size: 0.9375rem;
  font-weight: 500;
}

.section-nav__label-en {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--md-on-surface-variant);
  opacity: 0.55;
}

.section-nav__item--active .section-nav__label-en {
  color: var(--md-primary);
  opacity: 0.85;
}

.section-nav__fab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: var(--r-full);
  background: var(--md-primary);
  color: var(--md-on-primary);
  cursor: pointer;
  box-shadow: var(--elev-3);
  transition: transform var(--dur-short) var(--ease-standard),
              box-shadow var(--dur-short) var(--ease-standard);
}

.section-nav__fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px 4px rgba(0, 0, 0, 0.25);
}

.section-nav__fab:active {
  transform: scale(0.96);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity var(--dur-medium) var(--ease-standard);
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--dur-medium) var(--ease-standard),
              transform var(--dur-medium) var(--ease-emphasized);
  transform-origin: bottom right;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity var(--dur-short) var(--ease-standard),
              transform var(--dur-short) var(--ease-standard);
}

.icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg);
}

.icon-leave-to {
  opacity: 0;
  transform: rotate(90deg);
}

@media (max-width: 640px) {
  .section-nav {
    bottom: 16px;
    right: 16px;
  }
  .section-nav__menu {
    min-width: 220px;
  }
  .section-nav__fab {
    width: 52px;
    height: 52px;
  }
}
</style>