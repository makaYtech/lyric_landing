<script setup lang="ts">
import { onMounted } from 'vue'
import { Download, Github, AlertCircle, Loader2 } from 'lucide-vue-next'
import { useReleases } from '../composables/useReleases'
import { asset } from '../utils/assets'

const mascotSrc = asset('logo-512.png')

const {
  release,
  loading,
  error,
  fetchLatestRelease,
  getApkAsset,
  formatVersion,
  formatDate,
  formatSize,
} = useReleases()

onMounted(() => {
  fetchLatestRelease()
})
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero__inner">
      <div class="hero__art">
        <img
        :src="mascotSrc"
        alt="Маскот Лирики"
        class="hero__mascot"
        />
      </div>

      <div class="hero__content">
        <span class="hero__eyebrow mono">EPOS · PERM KRAI · UNOFFICIAL</span>

        <h1 class="hero__title">Лирика</h1>

        <p class="hero__tagline">
          Неофициальный Android-клиент системы «ЭПОС Образование»
          Пермского края. Расписание, оценки, домашние задания
          и профиль ученика — в одном месте.
        </p>

        <div class="hero__actions">
          <a
            v-if="release && getApkAsset(release)"
            :href="getApkAsset(release)!.browser_download_url"
            class="btn btn--filled btn--lg"
          >
            <Download :size="20" />
            <span>Скачать APK</span>
          </a>

          <button
            v-else-if="loading"
            class="btn btn--filled btn--lg btn--disabled"
            disabled
          >
            <Loader2 :size="20" class="spin" />
            <span>Загрузка…</span>
          </button>

          <a
            v-else
            href="https://github.com/makaYtech/lyric_apk/releases/latest"
            target="_blank"
            rel="noopener"
            class="btn btn--filled btn--lg"
          >
            <Download :size="20" />
            <span>Скачать APK</span>
          </a>

          <a
            href="https://github.com/makaYtech/lyric_apk"
            target="_blank"
            rel="noopener"
            class="btn btn--outlined btn--lg"
          >
            <Github :size="20" />
            <span>GitHub</span>
          </a>
        </div>

        <div class="hero__meta mono">
          <template v-if="release">
            <span class="hero__meta-item">
              <span class="hero__meta-key">version</span>
              <span class="hero__meta-val">{{ formatVersion(release.tag_name) }}</span>
            </span>
            <span class="hero__meta-sep">·</span>
            <span class="hero__meta-item">
              <span class="hero__meta-key">released</span>
              <span class="hero__meta-val">{{ formatDate(release.published_at) }}</span>
            </span>
            <template v-if="getApkAsset(release)">
              <span class="hero__meta-sep">·</span>
              <span class="hero__meta-item">
                <span class="hero__meta-key">size</span>
                <span class="hero__meta-val">{{ formatSize(getApkAsset(release)!.size) }}</span>
              </span>
            </template>
          </template>

          <span v-else-if="loading" class="hero__meta-item">
            <span class="hero__meta-val">получаем данные релиза…</span>
          </span>

          <span v-else-if="error" class="hero__meta-item hero__meta-item--error">
            <AlertCircle :size="14" />
            <span class="hero__meta-val">{{ error }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 64px 0 96px;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 70% 20%,
    color-mix(in srgb, var(--yellow) 8%, transparent),
    transparent 55%
  );
  pointer-events: none;
  z-index: 0;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
  align-items: center;
}

.hero__art {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__mascot {
  width: 100%;
  max-width: 420px;
  height: auto;
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.4));
  animation: float 6s ease-in-out infinite;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hero__eyebrow {
  display: block;
  font-size: 0.8125rem;
  color: var(--md-on-surface-variant);
  letter-spacing: 0.08em;
  opacity: 0.7;
  margin-bottom: 16px;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: 20px;
  background: linear-gradient(
    120deg,
    var(--yellow) 0%,
    var(--orange) 60%,
    var(--red) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__tagline {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--md-on-surface-variant);
  max-width: 560px;
  margin-bottom: 32px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--md-on-surface-variant);
}

.hero__meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.hero__meta-item--error {
  color: var(--md-error);
}

.hero__meta-key {
  color: var(--md-on-surface-variant);
  opacity: 0.6;
}

.hero__meta-val {
  color: var(--md-on-surface);
}

.hero__meta-sep {
  opacity: 0.4;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
  .hero__art { order: -1; }
  .hero__mascot { max-width: 240px; }
  .hero__tagline { margin-left: auto; margin-right: auto; }
  .hero__actions { justify-content: center; }
  .hero__meta { justify-content: center; }
}
</style>