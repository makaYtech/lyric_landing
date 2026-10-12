<script setup lang="ts">
interface Channel {
  id: string
  name: string
  audience: string
  stability: string
  color: string
  isDefault?: boolean
}

const channels: Channel[] = [
  {
    id: 'release',
    name: 'release',
    audience: 'Все пользователи',
    stability: 'Стабильные версии',
    color: 'var(--green)',
    isDefault: true,
  },
  {
    id: 'beta',
    name: 'beta',
    audience: 'Желающие пораньше',
    stability: 'Могут быть баги',
    color: 'var(--yellow)',
  },
  {
    id: 'alpha',
    name: 'alpha',
    audience: 'Тестировщики',
    stability: 'Могут ломаться',
    color: 'var(--orange)',
  },
]
</script>

<template>
  <section id="channels" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">05 · CHANNELS</span>
        <h2 class="section-header__title">Каналы обновлений</h2>
      </header>

      <p class="channels__lead">
        Приложение проверяет обновления само. По умолчанию используется
        стабильный канал <span class="mono">release</span>. Бета и альфа
        доступны в настройках приложения, если хочется пораньше.
      </p>

      <div class="channels__grid">
        <article
          v-for="c in channels"
          :key="c.id"
          class="channel"
          :style="{ '--accent': c.color }"
        >
          <header class="channel__head">
            <span class="channel__name mono">{{ c.name }}</span>
            <span v-if="c.isDefault" class="channel__default mono">
              default
            </span>
          </header>
          <dl class="channel__meta">
            <div>
              <dt class="mono">для кого</dt>
              <dd>{{ c.audience }}</dd>
            </div>
            <div>
              <dt class="mono">стабильность</dt>
              <dd>{{ c.stability }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.channels__lead {
  font-size: 1rem;
  color: var(--md-on-surface-variant);
  max-width: 640px;
  margin-bottom: 32px;
}

.channels__lead .mono {
  color: var(--md-primary);
  font-weight: 700;
}

.channels__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.channel {
  padding: 24px;
  border-radius: var(--r-xl);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  transition: border-color var(--dur-short) var(--ease-standard),
              transform var(--dur-short) var(--ease-standard);
}

.channel:hover {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--md-outline-variant));
  transform: translateY(-2px);
}

.channel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--md-outline-variant);
}

.channel__name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent);
}

.channel__default {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--r-full);
  background: color-mix(in srgb, var(--green) 18%, transparent);
  color: var(--green);
}

.channel__meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.channel__meta div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.channel__meta dt {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--md-on-surface-variant);
  opacity: 0.6;
}

.channel__meta dd {
  font-size: 0.9375rem;
  color: var(--md-on-surface);
}
</style>