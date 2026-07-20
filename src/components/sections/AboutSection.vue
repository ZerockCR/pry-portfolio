<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls)
</script>

<template>
  <section id="about" class="about">
    <div class="about__inner">

      <!-- LEFT — stats (sticky on desktop) -->
      <div class="about__stats">
        <div
          class="about__stat animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 120ms"
        >
          <span class="about__stat-value">3+</span>
          <span class="about__stat-label">{{ t('about.stat1Label') }}</span>
        </div>
        <div
          class="about__stat animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 120ms"
        >
          <span class="about__stat-value">1000+</span>
          <span class="about__stat-label">{{ t('about.stat2Label') }}</span>
        </div>
        <div
          class="about__stat animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 120ms"
        >
          <span class="about__stat-value">2</span>
          <span class="about__stat-label">{{ t('about.stat3Label') }}</span>
        </div>
      </div>

      <!-- RIGHT — text -->
      <div class="about__text">
        <p
          class="about__section-label animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 0ms"
        >
          {{ t('about.label') }}
        </p>

        <p
          class="about__body animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 80ms"
        >
          {{ t('about.body1') }}
        </p>

        <p
          class="about__body animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 160ms"
        >
          {{ t('about.body2') }}
        </p>

        <p
          class="about__closing animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 240ms"
        >
          {{ t('about.closing') }}
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.about {
  background-color: var(--color-bg);
  padding-top: var(--space-9);
  padding-bottom: var(--space-8);
}

/* ─── Inner grid ─────────────────────────────────────────────────────────────── */
.about__inner {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Left: stats ────────────────────────────────────────────────────────────── */
.about__stats {
  grid-column: 1 / 5;
  display: flex;
  flex-direction: column;
  gap: 40px;
  /* sticky so stats stay visible as long prose scrolls */
  position: sticky;
  top: 48px;
  align-self: start;
}

.about__stat {
  display: flex;
  flex-direction: column;
}

.about__stat-value {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.about__stat-label {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-top: 8px;
}

/* ─── Right: text ────────────────────────────────────────────────────────────── */
.about__text {
  grid-column: 6 / 13;
}

.about__section-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 32px;
}

.about__section-label::before {
  content: '// ';
  color: var(--color-text-muted);
}

.about__body {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.75;
  max-width: 560px;
}

.about__body + .about__body {
  margin-top: 24px;
}

.about__closing {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.5;
  margin-top: 40px;
  padding-left: 16px;
  border-left: 2px solid var(--color-accent);
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
  .about__inner {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .about__stats {
    position: static; /* disable sticky on mobile */
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
  }

  .about__stat-value {
    font-size: 36px;
  }

  .about__body {
    max-width: 100%;
  }
}
</style>
