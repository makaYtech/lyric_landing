<script setup lang="ts">
import { Terminal, Coffee, Heart } from 'lucide-vue-next'

const facts = [
  { icon: Terminal, label: 'Rust', detail: 'низкоуровневые системы, Wayland, композиторы' },
  { icon: Coffee, label: 'Gentoo Linux', detail: 'основная система' },
  { icon: Heart, label: 'pet-проект', detail: 'без команды и без бюджета' },
]
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">07 · ABOUT</span>
        <h2 class="section-header__title">Об авторе</h2>
      </header>

      <div class="about">
        <p class="about__lead">
          «Лирика» пишется одним человеком. Автор — разработчик на Rust,
          работает с низкоуровневыми системами и использует Gentoo Linux
          в качестве основной системы. Приложение выросло из личной
          потребности: оригинальный веб-интерфейс ЭПОСа неудобен на телефоне,
          а мобильное приложение не покрывает все сценарии. Всё — в свободное
          время, без команды и без бюджета.
        </p>

        <div class="about__facts">
          <div v-for="f in facts" :key="f.label" class="fact">
            <component :is="f.icon" :size="18" class="fact__icon" />
            <div>
              <div class="fact__label mono">{{ f.label }}</div>
              <div class="fact__detail">{{ f.detail }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  max-width: 760px;
}

.about__lead {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--md-on-surface-variant);
  margin-bottom: 32px;
}

.about__facts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.fact {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--r-lg);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
}

.fact__icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--md-primary);
}

.fact__label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 4px;
}

.fact__detail {
  font-size: 0.8125rem;
  color: var(--md-on-surface-variant);
  line-height: 1.4;
}
</style>