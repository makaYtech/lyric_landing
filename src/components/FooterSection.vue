<script setup lang="ts">
import { Github, Package, ExternalLink } from 'lucide-vue-next'
import { asset } from '../utils/assets'

const logoSrc = asset('logo-512.png')

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <img
        :src="logoSrc"
        alt="Лирика"
        class="footer__logo"
        />
        <div>
          <div class="footer__name mono">Лирика</div>
          <div class="footer__tag">неофициальный клиент ЭПОС</div>
        </div>
      </div>

      <nav class="footer__links">
        <a
          href="https://github.com/makaYtech/lyric_apk"
          target="_blank"
          rel="noopener"
        >
          <Github :size="16" />
          <span>Исходный код</span>
          <ExternalLink :size="12" class="footer__ext" />
        </a>
        <a
          href="https://github.com/makaYtech/lyric_apk/releases"
          target="_blank"
          rel="noopener"
        >
          <Package :size="16" />
          <span>Все релизы</span>
          <ExternalLink :size="12" class="footer__ext" />
        </a>
      </nav>
    </div>

    <div class="container footer__bottom">
      <span class="mono">© {{ year }} makaYtech · MIT License</span>
      <span class="mono footer__no-aff">not affiliated with EPOS Perm Krai</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  padding: 48px 0 32px;
  border-top: 1px solid var(--md-outline-variant);
  background: var(--md-surface-dim);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer__logo {
  width: 44px;
  height: 36px;
  object-fit: contain;
  border-radius: var(--r-sm);
}

.footer__name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--md-on-surface);
}

.footer__tag {
  font-size: 0.8125rem;
  color: var(--md-on-surface-variant);
  opacity: 0.7;
}

.footer__links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.footer__links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: var(--r-full);
  font-family: '0xProto', monospace;
  font-size: 0.8125rem;
  color: var(--md-on-surface-variant);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  transition: border-color var(--dur-short) var(--ease-standard),
              color var(--dur-short) var(--ease-standard),
              background-color var(--dur-short) var(--ease-standard);
}

.footer__links a:hover {
  color: var(--md-primary);
  border-color: var(--md-primary);
  background: var(--md-surface-container);
  opacity: 1;
}

.footer__ext {
  opacity: 0.5;
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--md-outline-variant);
  font-size: 0.8125rem;
  color: var(--md-on-surface-variant);
  opacity: 0.7;
}

.footer__no-aff {
  font-style: italic;
}

@media (max-width: 640px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>