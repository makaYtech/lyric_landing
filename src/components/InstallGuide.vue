<script setup lang="ts">
import { Info } from 'lucide-vue-next'

interface Step {
  n: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Скачай APK',
    description:
      'Нажми «Скачать APK» в шапке сайта или в разделе «Платформы». Файл начнёт качаться сразу с последней версией.',
  },
  {
    n: '02',
    title: 'Разреши установку из источника',
    description:
      'Android покажет диалог «Установка из этого источника запрещена». Нажми «Настройки» и включи разрешение для браузера или файлового менеджера.',
  },
  {
    n: '03',
    title: 'Установи приложение',
    description:
      'Вернись назад и нажми «Установить». После завершения открой приложение с рабочего стола или из списка приложений.',
  },
  {
    n: '04',
    title: 'Готово — обновления сами',
    description:
      'Дальше приложение будет проверять обновления и предлагать их установить прямо из интерфейса. Скачивать APK вручную нужно только один раз.',
  },
]
</script>

<template>
  <section id="install" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">04 · INSTALL</span>
        <h2 class="section-header__title">Установка</h2>
      </header>

      <p class="install__lead">
        Приложение распространяется как APK, вне Google Play. Android
        при первой установке покажет предупреждение — это нормально для
        любого APK из интернета.
      </p>

      <ol class="install__steps">
        <li v-for="s in steps" :key="s.n" class="step">
          <span class="step__n mono">{{ s.n }}</span>
          <div class="step__body">
            <h3 class="step__title mono">{{ s.title }}</h3>
            <p class="step__desc">{{ s.description }}</p>
          </div>
        </li>
      </ol>

      <aside class="install__note">
        <Info :size="18" />
        <p>
          На Xiaomi, Huawei и Samsung путь к разрешениям может отличаться.
          Ищи в системных настройках раздел <span class="mono">Безопасность → Установка из неизвестных источников</span>.
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.install__lead {
  font-size: 1rem;
  color: var(--md-on-surface-variant);
  max-width: 640px;
  margin-bottom: 32px;
}

.install__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 24px;
  border-radius: var(--r-lg);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  transition: border-color var(--dur-short) var(--ease-standard),
              background-color var(--dur-short) var(--ease-standard);
}

.step:hover {
  border-color: var(--md-primary);
  background: var(--md-surface-container);
}

.step__n {
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--md-primary);
  padding-top: 4px;
  letter-spacing: 0.05em;
}

.step__body {
  flex: 1;
  min-width: 0;
}

.step__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 6px;
}

.step__desc {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--md-on-surface-variant);
}

.install__note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-radius: var(--r-lg);
  background: color-mix(in srgb, var(--blue) 8%, var(--md-surface));
  border: 1px solid color-mix(in srgb, var(--blue) 25%, transparent);
}

.install__note svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--blue);
}

.install__note p {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--md-on-surface-variant);
}

.install__note .mono {
  color: var(--md-on-surface);
  font-size: 0.875em;
}

@media (max-width: 640px) {
  .step {
    padding: 16px;
    gap: 12px;
  }
}
</style>