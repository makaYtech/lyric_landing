<script setup lang="ts">
import {
  ShieldCheck,
  KeyRound,
  ServerOff,
  EyeOff,
  Code2,
  type LucideIcon,
} from 'lucide-vue-next'

interface Point {
  icon: LucideIcon
  title: string
  description: string
}

const points: Point[] = [
  {
    icon: KeyRound,
    title: 'Вход через Госуслуги (ЕСИА)',
    description:
      'Логин и пароль вводятся только на официальной странице Госуслуг. Приложение их не видит и не сохраняет.',
  },
  {
    icon: ShieldCheck,
    title: 'Токены — в защищённом хранилище',
    description:
      'Сессия хранится в Android Keystore, никуда не отправляется и обновляется автоматически.',
  },
  {
    icon: ServerOff,
    title: 'Никаких сторонних API',
    description:
      'Работа только с открытыми данными ЭПОСа, полученными после твоей авторизации. Никаких обходов и скрытых эндпоинтов.',
  },
  {
    icon: EyeOff,
    title: 'Ноль телеметрии и аналитики',
    description:
      'Приложение не отправляет данные о тебе никуда, кроме самого ЭПОСа. Ни счётчиков, ни трекеров, ни «статистики».',
  },
]
</script>

<template>
  <section id="security" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">03 · SECURITY</span>
        <h2 class="section-header__title">Безопасность и данные</h2>
      </header>

      <p class="security__lead">
        Параноикам посвящается. Вот что происходит с твоими данными — а что нет.
      </p>

      <div class="security__grid">
        <article v-for="p in points" :key="p.title" class="security-point">
          <div class="security-point__icon">
            <component :is="p.icon" :size="22" />
          </div>
          <h3 class="security-point__title mono">{{ p.title }}</h3>
          <p class="security-point__desc">{{ p.description }}</p>
        </article>
      </div>

      <aside class="security__note">
        <Code2 :size="18" />
        <p>
          Код приложения открыт — можно проверить самостоятельно:
          <a
            href="https://github.com/makaYtech/lyric_apk"
            target="_blank"
            rel="noopener"
          >github.com/makaYtech/lyric_apk</a>
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.security__lead {
  font-size: 1rem;
  color: var(--md-on-surface-variant);
  max-width: 640px;
  margin-bottom: 32px;
}

.security__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.security-point {
  padding: 24px;
  border-radius: var(--r-xl);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  transition: border-color var(--dur-short) var(--ease-standard);
}

.security-point:hover {
  border-color: color-mix(in srgb, var(--green) 40%, var(--md-outline-variant));
}

.security-point__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--r-md);
  background: color-mix(in srgb, var(--green) 15%, transparent);
  color: var(--green);
  margin-bottom: 18px;
}

.security-point__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 10px;
}

.security-point__desc {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--md-on-surface-variant);
}

.security__note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--r-lg);
  background: var(--md-surface-container);
  border: 1px solid var(--md-outline-variant);
  color: var(--md-on-surface-variant);
}

.security__note svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--md-link);
}

.security__note p {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--md-on-surface-variant);
}
</style>