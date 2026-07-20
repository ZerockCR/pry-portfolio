<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'
import { education } from '../../data/education'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0.15 })
</script>

<template>
  <section class="education">
    <div class="education__inner">

      <!-- LEFT — sticky label -->
      <div class="education__left">
        <p class="education__section-label">{{ t('education.label') }}</p>
      </div>

      <!-- RIGHT — entries -->
      <div class="education__right">
        <div
          v-for="(entry, index) in education"
          :key="entry.degreeKey"
          class="education__entry animate-up"
          :class="{ 'education__entry--last': index === education.length - 1 }"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          :style="`--delay: ${index * 80}ms`"
        >
          <div class="education__entry-left">
            <p class="education__degree">{{ t(entry.degreeKey) }}</p>
            <p class="education__institution">
              {{ entry.institution }} · {{ entry.location }}
            </p>
          </div>
          <div class="education__entry-right">
            <p class="education__period">
              <span
                v-if="entry.current"
                class="education__current-dot"
                aria-hidden="true"
              ></span>
              {{ t(entry.periodKey) }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.education {
  background-color: var(--color-bg);
  padding-top: var(--space-8);
  padding-bottom: var(--space-7);
}

.education__inner {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Left ───────────────────────────────────────────────────────────────────── */
.education__left {
  grid-column: 1 / 4;
  position: sticky;
  top: 48px;
  align-self: start;
}

.education__section-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
}

.education__section-label::before {
  content: '// ';
  color: var(--color-text-muted);
}

/* ─── Right ──────────────────────────────────────────────────────────────────── */
.education__right {
  grid-column: 5 / 13;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ─── Entry ──────────────────────────────────────────────────────────────────── */
.education__entry {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}

.education__entry--last {
  border-bottom: none;
  padding-bottom: 0;
}

.education__entry-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.education__degree {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
}

.education__institution {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--color-text-muted);
}

.education__entry-right {
  flex-shrink: 0;
}

.education__period {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.education__current-dot {
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-signal);
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
  .education__inner {
    display: block;
  }

  .education__left {
    position: static;
    margin-bottom: 40px;
  }

  .education__entry {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
