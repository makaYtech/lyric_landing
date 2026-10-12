<script setup lang="ts">
import { AlertTriangle, Bot } from 'lucide-vue-next'
</script>

<template>
  <section id="warning" class="section">
    <div class="container">
      <header class="section-header">
        <span class="section-header__label">06 · DISCLAIMER</span>
        <h2 class="section-header__title">Важно</h2>
      </header>

      <div class="warning">
        <div class="warning__head">
          <AlertTriangle :size="22" />
          <span class="warning__badge mono">неофициальный клиент</span>
        </div>

        <ul class="warning__list">
          <li>
            Приложение <strong>не является</strong> продуктом, разработкой
            или собственностью системы ЭПОС Пермского края
            (<span class="mono">edu-epos.permkrai.ru</span>) или её операторов.
          </li>
          <li>
            Приложение <strong>не заменяет</strong> оригинальный ЭПОС.
            Оригинальный веб-интерфейс остаётся единственным официальным
            источником данных и функциональности.
          </li>
          <li>
            Работа идёт <strong>исключительно с открытыми данными</strong>,
            которые пользователь получает при собственной авторизации через
            официальный механизм ЭПОСа. Никаких закрытых API, обходов
            авторизации или скрытых эндпоинтов.
          </li>
          <li>
            Пользователь сам решает, использовать ли приложение, и делает это
            <strong>на свой риск</strong>. Автор не несёт ответственности за
            возможные последствия.
          </li>
        </ul>
      </div>

      <aside class="ai-note">
        <div class="ai-note__icon">
          <Bot :size="20" />
        </div>
        <div class="ai-note__body">
          <h4 class="ai-note__title mono">Об использовании ИИ-инструментов</h4>
          <p>
            Проект пишется одним автором. Архитектура, сетевой слой, работа
            с локальной базой, парсинг API, логика расписания и правок —
            написано вручную. ИИ-ассистенты привлекались точечно, в основном
            для визуальной вёрстки, шаблонных виджетов и рутинных моделей
            данных. Всё, что касается поведения приложения, принималось
            и проверялось автором.
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.warning {
  padding: 28px;
  border-radius: var(--r-xl);
  background: color-mix(in srgb, var(--red) 6%, var(--md-surface));
  border: 1px solid color-mix(in srgb, var(--red) 30%, transparent);
  margin-bottom: 16px;
}

.warning__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: var(--red);
}

.warning__badge {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--r-full);
  background: color-mix(in srgb, var(--red) 18%, transparent);
  color: var(--red);
}

.warning__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.warning__list li {
  position: relative;
  padding-left: 20px;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--md-on-surface-variant);
}

.warning__list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--red);
  opacity: 0.6;
}

.warning__list strong {
  color: var(--md-on-surface);
  font-weight: 600;
}

.warning__list .mono {
  color: var(--md-link);
  font-size: 0.875em;
}

.ai-note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border-radius: var(--r-xl);
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
}

.ai-note__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-full);
  background: color-mix(in srgb, var(--purple) 18%, transparent);
  color: var(--purple);
  flex-shrink: 0;
}

.ai-note__title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--md-on-surface);
  margin-bottom: 8px;
}

.ai-note__body p {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--md-on-surface-variant);
}

@media (max-width: 640px) {
  .warning { padding: 20px; }
  .ai-note { padding: 16px; }
}
</style>