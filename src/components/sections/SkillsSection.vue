<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'
import { skillGroups, BACKEND_CORE_COUNT } from '../../data/skills'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0.15 })

function isBackendCore(groupIndex: number, skillIndex: number): boolean {
  return groupIndex === 0 && skillIndex < BACKEND_CORE_COUNT
}
</script>

<template>
  <section class="skills">
    <div class="skills__inner">

      <!-- LEFT — sticky label -->
      <div class="skills__left">
        <p class="skills__section-label">{{ t('skills.label') }}</p>
      </div>

      <!-- RIGHT — groups -->
      <div class="skills__right">
        <div
          v-for="(group, gi) in skillGroups"
          :key="group.labelKey"
          class="skills__group animate-up"
          :class="{ 'skills__group--has-divider': gi > 0 }"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          :style="`--delay: ${gi * 100}ms`"
        >
          <p class="skills__group-label">{{ t(group.labelKey) }}</p>
          <p class="skills__group-sublabel">{{ t(group.sublabelKey) }}</p>

          <ul class="skills__pills">
            <li
              v-for="(skill, si) in group.skills"
              :key="skill"
              class="skills__pill"
              :class="{ 'skills__pill--core': isBackendCore(gi, si), 'skills__pill--secondary': gi === 0 && si >= BACKEND_CORE_COUNT }"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.skills {
  background-color: var(--color-bg);
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}

.skills__inner {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Left ───────────────────────────────────────────────────────────────────── */
.skills__left {
  grid-column: 1 / 4;
  position: sticky;
  top: 48px;
  align-self: start;
}

.skills__section-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
}

.skills__section-label::before {
  content: '// ';
  color: var(--color-text-muted);
}

/* ─── Right ──────────────────────────────────────────────────────────────────── */
.skills__right {
  grid-column: 5 / 13;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

/* ─── Group ──────────────────────────────────────────────────────────────────── */
.skills__group--has-divider {
  border-top: 1px solid var(--color-border);
  padding-top: 56px;
  margin-top: -56px;
}

.skills__group-label {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.skills__group-sublabel {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

/* ─── Pills ──────────────────────────────────────────────────────────────────── */
.skills__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.skills__pill {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 6px 12px;
  border-radius: 2px;
}

/* Backend core (first 4): heavier weight to signal depth */
.skills__pill--core {
  font-weight: 500;
}

/* Remaining backend skills: muted to distinguish from core */
.skills__pill--secondary {
  color: var(--color-text-muted);
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
  .skills__inner {
    display: block;
  }

  .skills__left {
    position: static;
    margin-bottom: 40px;
  }

  .skills__right {
    gap: 40px;
  }

  .skills__group--has-divider {
    padding-top: 40px;
    margin-top: -40px;
  }
}
</style>
