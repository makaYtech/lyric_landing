<script setup lang="ts">
import { platforms } from '../data/platforms'
import { useReleases } from '../composables/useReleases'
import { Check, Clock } from 'lucide-vue-next'

const {
  androidRelease,
  windowsRelease,
  linuxRelease,
  androidDownloadUrl,
  formatVersion
} = useReleases()

function getHref(id: string): string {
  if (id === 'android' && androidDownloadUrl.value) return androidDownloadUrl.value
  if (id === 'windows' && windowsRelease.value) return windowsRelease.value.download_url
  if (id === 'linux' && linuxRelease.value) return linuxRelease.value.download_url
  return '#'
}

function isClickable(id: string): boolean {
  if (id === 'android') return !!androidDownloadUrl.value
  if (id === 'windows') return !!windowsRelease.value
  if (id === 'linux') return !!linuxRelease.value
  return false
}

function getVersion(id: string): string {
  if (id === 'android' && androidRelease.value) return androidRelease.value.version
  if (id === 'windows' && windowsRelease.value) return windowsRelease.value.version
  if (id === 'linux' && linuxRelease.value) return linuxRelease.value.version
  return ''
}
</script>

<template>
  <section id="platforms" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">01 · PLATFORMS</span>
        <h2 class="section-header__title">Платформы</h2>
      </header>

      <div class="platforms">
        <component
          :is="isClickable(p.id) ? 'a' : 'div'"
          v-for="p in platforms"
          :key="p.id"
          :href="isClickable(p.id) ? getHref(p.id) : undefined"
          :target="isClickable(p.id) ? '_blank' : undefined"
          :rel="isClickable(p.id) ? 'noopener' : undefined"
          class="platform"
          :class="{
            'platform--active': p.available,
            'platform--soon': !p.available,
          }"
        >
          <div class="platform__head">
            <component :is="p.icon" :size="28" class="platform__icon" />
            <span
              v-if="p.available"
              class="platform__badge platform__badge--active"
              :title="'Доступно: ' + getVersion(p.id)"
            >
              <Check :size="12" />
            </span>
            <span v-else class="platform__badge platform__badge--soon">
              <Clock :size="12" />
            </span>
          </div>

          <div class="platform__body">
            <h3 class="platform__name mono">{{ p.name }}</h3>
            <p class="platform__desc">{{ p.description }}</p>
          </div>

          <span v-if="p.available" class="platform__cta mono">
            скачать →
          </span>
          <span v-else class="platform__cta platform__cta--soon mono">
            скоро
          </span>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platforms {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.platform {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: var(--r-lg);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: border-color var(--dur-short) var(--ease-standard),
              background-color var(--dur-short) var(--ease-standard),
              transform var(--dur-short) var(--ease-standard),
              box-shadow var(--dur-short) var(--ease-standard);
}

.platform--active {
  cursor: pointer;
}

.platform--active:hover {
  border-color: var(--md-primary);
  background: var(--md-surface-container);
  transform: translateY(-2px);
  box-shadow: var(--elev-2);
  opacity: 1;
}

.platform--soon {
  opacity: 0.55;
  cursor: not-allowed;
}

.platform__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.platform__icon {
  color: var(--md-on-surface);
}

.platform--active .platform__icon {
  color: var(--md-primary);
}

.platform__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: var(--r-full);
}

.platform__badge--active {
  background: color-mix(in srgb, var(--green) 20%, transparent);
  color: var(--green);
}

.platform__badge--soon {
  background: var(--md-surface-container);
  color: var(--md-on-surface-variant);
}

.platform__body {
  flex: 1;
}

.platform__name {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 4px;
}

.platform__desc {
  font-size: 0.875rem;
  color: var(--md-on-surface-variant);
  line-height: 1.4;
}

.platform__cta {
  font-size: 0.8125rem;
  color: var(--md-primary);
  opacity: 0.8;
}

.platform__cta--soon {
  color: var(--md-on-surface-variant);
  opacity: 0.5;
}

@media (max-width: 640px) {
  .platforms {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .platform {
    padding: 16px;
  }
  .platform__name {
    font-size: 0.9375rem;
  }
  .platform__desc {
    font-size: 0.8125rem;
  }
}
</style>