<script setup lang="ts">
import {
  User,
  GraduationCap,
  CalendarDays,
  BookOpen,
  RefreshCw,
  type LucideIcon,
} from 'lucide-vue-next'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  accent: string
}

const features: Feature[] = [
  {
    icon: User,
    title: 'Профиль ученика',
    description:
      'ФИО, класс, профиль обучения, список учителей с предметами и кабинетами. Аватарки можно задавать локально.',
    accent: 'var(--blue)',
  },
  {
    icon: GraduationCap,
    title: 'Оценки',
    description:
      'По предметам и периодам, с подсветкой среднего балла, деталями по каждой оценке и историей изменений.',
    accent: 'var(--green)',
  },
  {
    icon: CalendarDays,
    title: 'Расписание',
    description:
      'На любую неделю года, с расписанием звонков, пар, окон и оценок прямо на карточках. Есть режим правок с откатом.',
    accent: 'var(--yellow)',
  },
  {
    icon: BookOpen,
    title: 'Домашние задания',
    description:
      'Группировка по дню выдачи или дедлайну, вложения от учителя и возможность прикрепить свою работу.',
    accent: 'var(--purple)',
  },
]
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">02 · FEATURES</span>
        <h2 class="section-header__title">Возможности</h2>
      </header>

      <div class="features">
        <article
          v-for="f in features"
          :key="f.title"
          class="feature"
          :style="{ '--accent': f.accent }"
        >
          <div class="feature__icon-wrap">
            <component :is="f.icon" :size="24" class="feature__icon" />
          </div>
          <h3 class="feature__title mono">{{ f.title }}</h3>
          <p class="feature__desc">{{ f.description }}</p>
        </article>
      </div>

      <aside class="autoupdate">
        <div class="autoupdate__icon">
          <RefreshCw :size="20" />
        </div>
        <div class="autoupdate__body">
          <h4 class="autoupdate__title mono">Автообновления</h4>
          <p class="autoupdate__desc">
            Приложение само проверяет новые версии и предлагает обновиться
            прямо из интерфейса. APK нужно скачать вручную только один раз.
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.feature {
  padding: 24px;
  border-radius: var(--r-xl);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  transition: border-color var(--dur-short) var(--ease-standard),
              transform var(--dur-short) var(--ease-standard);
}

.feature:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--md-outline-variant));
  transform: translateY(-2px);
}

.feature__icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--r-md);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  margin-bottom: 20px;
}

.feature__icon {
  color: var(--accent);
}

.feature__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 10px;
}

.feature__desc {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--md-on-surface-variant);
}

.autoupdate {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border-radius: var(--r-xl);
  background: color-mix(in srgb, var(--md-primary) 8%, var(--md-surface));
  border: 1px solid color-mix(in srgb, var(--md-primary) 25%, transparent);
}

.autoupdate__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-full);
  background: color-mix(in srgb, var(--md-primary) 20%, transparent);
  color: var(--md-primary);
  flex-shrink: 0;
}

.autoupdate__title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 6px;
}

.autoupdate__desc {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--md-on-surface-variant);
}

@media (max-width: 640px) {
  .feature {
    padding: 20px;
  }
}
</style>