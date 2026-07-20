<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'
import { experience } from '../../data/experience'

const { t, tm, rt } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0.1 })
</script>

<template>
  <section id="experience" class="experience">
    <div class="experience__inner">

      <!-- LEFT — sticky label -->
      <div class="experience__left">
        <p class="experience__section-label">{{ t('experience.label') }}</p>
      </div>

      <!-- RIGHT — entries -->
      <div class="experience__right">
        <div
          v-for="(entry, index) in experience"
          :key="entry.roleKey"
          class="experience__entry animate-up"
          :class="{ 'experience__entry--has-divider': index > 0 }"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          :style="`--delay: ${index * 120}ms`"
        >
          <!-- Entry header -->
          <div class="experience__entry-header">
            <div class="experience__entry-left">
              <p class="experience__role">{{ t(entry.roleKey) }}</p>
              <p class="experience__company">
                {{ entry.company }} · {{ entry.location }}
              </p>
            </div>
            <div class="experience__entry-right">
              <p class="experience__period">
                <span
                  v-if="entry.current"
                  class="experience__current-dot"
                  aria-hidden="true"
                ></span>
                {{ t(entry.periodKey) }}
              </p>
            </div>
          </div>

          <!-- Bullets -->
          <ul class="experience__bullets">
            <li
              v-for="(bullet, bi) in (tm(entry.bulletsKey) as string[])"
              :key="bi"
              class="experience__bullet"
            >
              <span class="experience__bullet-dash" aria-hidden="true">—</span>
              <span class="experience__bullet-text">{{ rt(bullet) }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.experience {
  background-color: var(--color-bg);
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}

.experience__inner {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Left — sticky label ────────────────────────────────────────────────────── */
.experience__left {
  grid-column: 1 / 4;
  position: sticky;
  top: 48px;
  align-self: start;
}

.experience__section-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
}

.experience__section-label::before {
  content: '// ';
  color: var(--color-text-muted);
}

/* ─── Right — entries ────────────────────────────────────────────────────────── */
.experience__right {
  grid-column: 5 / 13;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

/* ─── Entry ──────────────────────────────────────────────────────────────────── */
.experience__entry--has-divider {
  border-top: 1px solid var(--color-border);
  padding-top: 64px;
  /* cancel the gap on the container so divider + padding control spacing */
  margin-top: -64px;
}

/* ─── Entry header ───────────────────────────────────────────────────────────── */
.experience__entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
}

.experience__entry-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.experience__role {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
  line-height: 1.1;
}

.experience__company {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--color-text-muted);
}

.experience__entry-right {
  flex-shrink: 0;
}

.experience__period {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.experience__current-dot {
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-signal);
}

/* ─── Bullets ────────────────────────────────────────────────────────────────── */
.experience__bullets {
  list-style: none;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.experience__bullet {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

.experience__bullet-dash {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--color-accent);
  flex-shrink: 0;
  margin-right: 12px;
  /* keep dash vertically aligned with first line of text */
  line-height: 1.7;
}

.experience__bullet-text {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text);
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
  .experience__inner {
    display: block;
  }

  .experience__left {
    position: static;
    margin-bottom: 40px;
  }

  .experience__right {
    gap: 48px;
  }

  .experience__entry--has-divider {
    border-top: 1px solid var(--color-border);
    padding-top: 48px;
    margin-top: -48px;
  }

  .experience__entry-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .experience__role {
    font-size: 22px;
  }

  .experience__period {
    font-size: 12px;
  }

  .experience__bullet-text {
    font-size: 15px;
  }
}
</style>
