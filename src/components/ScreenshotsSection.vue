<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { X, ChevronLeft, ChevronRight, FlaskConical } from 'lucide-vue-next'
import { asset } from '../utils/assets'

interface Shot {
  src: string
  title: string
  description: string
}

/* ── Свайпы в лайтбоксе (pointer events) ─── */
const dragX = ref(0)
const dragging = ref(false)
let startX = 0
let startY = 0
let startTime = 0
let isHorizontalSwipe = false

const SWIPE_THRESHOLD = 60   // px
const SWIPE_VELOCITY = 0.4   // px/ms

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  startX = e.clientX
  startY = e.clientY
  startTime = performance.now()
  isHorizontalSwipe = false
  dragging.value = true
  dragX.value = 0
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY

  if (!isHorizontalSwipe) {
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
    isHorizontalSwipe = Math.abs(dx) > Math.abs(dy)
  }

  if (!isHorizontalSwipe) return

  e.preventDefault()
  dragX.value = dx
}

function onPointerUp(e: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false

  if (!isHorizontalSwipe) {
    dragX.value = 0
    return
  }

  const dx = dragX.value
  const dt = performance.now() - startTime
  const velocity = Math.abs(dx) / Math.max(dt, 1)
  const shouldSwitch = Math.abs(dx) > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY

  if (shouldSwitch) {
    if (dx < 0) next()
    else prev()
  }

  dragX.value = 0
  isHorizontalSwipe = false

  try {
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
  } catch {
    /* уже отпущен */
  }
}

const shots: Shot[] = [
  {
    src: asset('screens/screen-profile.png'),
    title: 'Профиль',
    description: 'ФИО, класс, учителя, кабинеты, нагрузка',
  },
  {
    src: asset('screens/screen-grades.png'),
    title: 'Оценки',
    description: 'По предметам и периодам, со средним баллом',
  },
  {
    src: asset('screens/screen-schedule.png'),
    title: 'Расписание',
    description: 'На любую неделю, с парами и звонками',
  },
  {
    src: asset('screens/screen-homework.png'),
    title: 'Домашка',
    description: 'По дню выдачи или дедлайну, с вложениями',
  },
]

const galleryEl = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)
const lightboxOpen = computed(() => activeIndex.value !== null)

/* ── Лайтбокс ─────────────────────────────── */
function openLightbox(i: number) {
  activeIndex.value = i
  document.documentElement.classList.add('no-scroll')
}

function closeLightbox() {
  activeIndex.value = null
  document.documentElement.classList.remove('no-scroll')
}

function next() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % shots.length
}

function prev() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + shots.length) % shots.length
}

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

/* ── Автоскролл (только на маленьких экранах) ─ */
const SPEED = 0.03 // px/ms → ~30px/s
let rafId: number | null = null
let lastTs = 0
let pausedUntil = 0

function shouldAutoScroll(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return window.innerWidth <= 900
}

function pauseAutoScroll(ms = 6000) {
  pausedUntil = performance.now() + ms
}

function onUserInteract() {
  pauseAutoScroll()
}

function loop(ts: number) {
  if (!lastTs) lastTs = ts
  const dt = ts - lastTs
  lastTs = ts

  const el = galleryEl.value
  if (el && ts >= pausedUntil && !lightboxOpen.value) {
    const max = el.scrollWidth - el.clientWidth
    if (max > 1) {
      el.scrollLeft += SPEED * dt
      if (el.scrollLeft >= max - 0.5) {
        el.scrollLeft = 0
      }
    }
  }

  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  if (shouldAutoScroll()) {
    rafId = requestAnimationFrame(loop)
    const el = galleryEl.value
    if (el) {
      el.addEventListener('pointerdown', onUserInteract)
      el.addEventListener('wheel', onUserInteract, { passive: true })
      el.addEventListener('touchstart', onUserInteract, { passive: true })
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (rafId !== null) cancelAnimationFrame(rafId)
  document.documentElement.classList.remove('no-scroll')
})
</script>

<template>
  <section id="screenshots" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">PREVIEW</span>
        <h2 class="section-header__title">Как это выглядит</h2>
        <p class="section-header__note mono">
          <span>данные на скриншотах вымышленные — демонстрация интерфейса</span>
        </p>
      </header>
    </div>

    <div class="gallery-wrap">
      <div ref="galleryEl" class="gallery">
        <figure
          v-for="(s, i) in shots"
          :key="s.src"
          class="shot"
          role="button"
          tabindex="0"
          :aria-label="`Открыть скриншот: ${s.title}`"
          @click="openLightbox(i)"
          @keydown.enter="openLightbox(i)"
          @keydown.space.prevent="openLightbox(i)"
        >
          <div class="shot__frame">
            <img :src="s.src" :alt="s.title" class="shot__img" loading="lazy" />
          </div>
          <figcaption class="shot__caption">
            <div class="shot__title mono">{{ s.title }}</div>
            <div class="shot__desc">{{ s.description }}</div>
          </figcaption>
        </figure>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen && activeIndex !== null"
          class="lightbox"
          @click.self="closeLightbox"
        >
          <button
            class="lightbox__close"
            aria-label="Закрыть"
            @click="closeLightbox"
          >
            <X :size="22" />
          </button>

          <button
            class="lightbox__nav lightbox__nav--prev"
            aria-label="Предыдущий"
            @click.stop="prev"
          >
            <ChevronLeft :size="28" />
          </button>

          <div
            class="lightbox__stage"
            :style="{
              transform: dragX !== 0 ? `translateX(${dragX}px)` : undefined,
              transition: dragging ? 'none' : undefined,
            }"
            @click.stop
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <img
              :src="shots[activeIndex].src"
              :alt="shots[activeIndex].title"
              class="lightbox__img"
              draggable="false"
            />
            <div class="lightbox__caption mono">
              {{ shots[activeIndex].title }}
              <span class="lightbox__counter">
                {{ activeIndex + 1 }} / {{ shots.length }}
              </span>
            </div>
          </div>

          <button
            class="lightbox__nav lightbox__nav--next"
            aria-label="Следующий"
            @click.stop="next"
          >
            <ChevronRight :size="28" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* ── Галерея ─────────────────────────────── */
.gallery-wrap {
  position: relative;
}

.gallery-wrap::before,
.gallery-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  pointer-events: none;
  z-index: 2;
}

.gallery-wrap::before {
  left: 0;
  background: linear-gradient(to right, var(--md-surface-dim), transparent);
}

.gallery-wrap::after {
  right: 0;
  background: linear-gradient(to left, var(--md-surface-dim), transparent);
}

.gallery {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 8px max(24px, calc((100vw - 1120px) / 2 + 24px)) 32px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: var(--surface-2) transparent;
}

.gallery::-webkit-scrollbar {
  height: 8px;
}

.gallery::-webkit-scrollbar-track {
  background: transparent;
}

.gallery::-webkit-scrollbar-thumb {
  background: var(--surface-2);
  border-radius: var(--r-full);
}

.shot {
  flex: 0 0 auto;
  width: 240px;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  outline: none;
}

.shot:focus-visible .shot__frame {
  outline: 2px solid var(--md-primary);
  outline-offset: 4px;
}

.shot__frame {
  position: relative;
  aspect-ratio: 9 / 19.5;
  border-radius: 32px;
  background: var(--surface-1);
  padding: 8px;
  box-shadow: var(--elev-3);
  border: 1px solid var(--md-outline-variant);
  overflow: hidden;
  transition: transform var(--dur-medium) var(--ease-standard),
              box-shadow var(--dur-medium) var(--ease-standard);
}

.shot:hover .shot__frame {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.shot__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 24px;
  display: block;
  background: var(--bg-hard);
}

.shot__caption {
  padding: 0 4px;
}

.shot__title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 4px;
}

.shot__desc {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--md-on-surface-variant);
}

/* ── Лайтбокс ────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--bg-hard) 85%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 32px;
}

.lightbox__close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--r-full);
  background: var(--md-surface);
  color: var(--md-on-surface);
  cursor: pointer;
  box-shadow: var(--elev-2);
  transition: background-color var(--dur-short) var(--ease-standard),
              transform var(--dur-short) var(--ease-standard);
  z-index: 210;
}

.lightbox__close:hover {
  background: var(--md-surface-container);
  transform: scale(1.05);
}

.lightbox__stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-height: 100%;
  transition: transform var(--dur-medium) var(--ease-emphasized);
  touch-action: pan-y;
  will-change: transform;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  background: var(--bg-hard);
  display: block;
}

.lightbox__caption {
  font-size: 0.875rem;
  color: var(--fg-bright);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  border-radius: var(--r-full);
  background: color-mix(in srgb, var(--md-surface) 80%, transparent);
  border: 1px solid var(--md-outline-variant);
}

.lightbox__counter {
  color: var(--md-on-surface-variant);
  opacity: 0.6;
  font-size: 0.8125rem;
}

.lightbox__nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--r-full);
  background: var(--md-surface);
  color: var(--md-on-surface);
  cursor: pointer;
  box-shadow: var(--elev-2);
  transition: background-color var(--dur-short) var(--ease-standard),
              transform var(--dur-short) var(--ease-standard);
  z-index: 210;
}

.lightbox__nav:hover {
  background: var(--md-surface-container);
  transform: translateY(-50%) scale(1.06);
}

.lightbox__nav--prev { left: 20px; }
.lightbox__nav--next { right: 20px; }

/* Переходы */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity var(--dur-medium) var(--ease-standard);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox__img,
.lightbox-leave-active .lightbox__img {
  transition: transform var(--dur-medium) var(--ease-emphasized);
}

.lightbox-enter-from .lightbox__img,
.lightbox-leave-to .lightbox__img {
  transform: scale(0.92);
}

/* ── Адаптив ─────────────────────────────── */
@media (max-width: 640px) {
  .shot {
    width: 200px;
  }
  .gallery {
    padding: 8px 16px 24px;
    gap: 16px;
  }
  .gallery-wrap::before,
  .gallery-wrap::after {
    width: 40px;
  }
  .lightbox {
    padding: 16px;
  }
  .lightbox__img {
    max-width: 100%;
    max-height: 78vh;
  }
  .lightbox__nav {
    width: 44px;
    height: 44px;
  }
  .lightbox__nav--prev { left: 8px; }
  .lightbox__nav--next { right: 8px; }
  .lightbox__close {
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
  }
}
</style>