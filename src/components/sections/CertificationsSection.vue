<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'
import { certifications } from '../../data/certifications'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0.15 })
</script>

<template>
  <section class="certs">
    <div class="certs__inner">

      <!-- LEFT — sticky label -->
      <div class="certs__left">
        <p class="certs__section-label">{{ t('certifications.label') }}</p>
      </div>

      <!-- RIGHT — list -->
      <ul
        class="certs__list animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 0ms"
      >
        <li
          v-for="cert in certifications"
          :key="cert.name"
          class="certs__item"
        >
          <div class="certs__item-left">
            <p class="certs__name">{{ cert.name }}</p>
            <p class="certs__issuer">{{ cert.issuer }}</p>
          </div>
          <p class="certs__date">{{ t(cert.dateKey) }}</p>
        </li>
      </ul>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.certs {
  background-color: var(--color-bg);
  padding-top: var(--space-7);
  padding-bottom: var(--space-7);
}

.certs__inner {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Left ───────────────────────────────────────────────────────────────────── */
.certs__left {
  grid-column: 1 / 4;
  position: sticky;
  top: 48px;
  align-self: start;
}

.certs__section-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
}

.certs__section-label::before {
  content: '// ';
  color: var(--color-text-muted);
}

/* ─── List ───────────────────────────────────────────────────────────────────── */
.certs__list {
  grid-column: 5 / 13;
  list-style: none;
  display: flex;
  flex-direction: column;
}

.certs__item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}

.certs__item:first-child {
  border-top: 1px solid var(--color-border);
}

.certs__item-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.certs__name {
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
}

.certs__issuer {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
}

.certs__date {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ─── Entrance animation ─────────────────────────────────────────────────────── */
.animate-up {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity var(--duration-enter) var(--ease-out-expo),
    transform var(--duration-enter) var(--ease-out-expo);
  transition-delay: var(--delay, 0ms);
}

.animate-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-up {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ─── Mobile ─────────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .certs__inner {
    display: block;
  }

  .certs__left {
    position: static;
    margin-bottom: 40px;
  }

  .certs__item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
