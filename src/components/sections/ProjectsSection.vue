<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'
import { projects, type Project } from '../../data/projects'

const { t, tm, rt } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls)

function cardVariant(project: Project): 'image' | 'dark' | 'light' {
  return project.cardVariant ?? (project.image ? 'image' : project.featured ? 'dark' : 'light')
}

function tags(project: Project): string[] {
  return (tm(project.tagsKey) as string[]).map((tag) => rt(tag))
}
</script>

<template>
  <section id="projects" class="projects">
    <div class="projects__inner">

      <!-- Section header -->
      <div class="projects__header">
        <p
          class="projects__label animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 0ms"
        >
          {{ t('projectsSection.label') }}
        </p>
        <h2
          class="projects__title animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 80ms"
        >
          {{ t('projectsSection.title') }}
        </h2>
      </div>

      <!-- Project rows -->
      <div class="projects__list">
        <template v-for="(project, index) in projects" :key="project.slug">
          <div v-if="index > 0" class="projects__divider" aria-hidden="true"></div>

          <div
            class="project-row animate-up"
            :class="{ 'project-row--reversed': index % 2 !== 0 }"
            :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
            :style="`--delay: ${index * 120}ms`"
          >
            <!-- Image / placeholder column -->
            <div class="project-row__image-wrap">
              <img
                v-if="cardVariant(project) === 'image'"
                :src="project.image!"
                :alt="project.title"
                class="project-row__image"
              />

              <!--
                Dark typographic card: intentional, not a fallback. Communicates
                "enterprise / confidential" without looking empty.
              -->
              <div
                v-else-if="cardVariant(project) === 'dark'"
                class="project-row__placeholder project-row__placeholder--dark"
              >
                <div class="ph-dark__inner">
                  <span class="ph-dark__eyebrow">
                    {{ tags(project)[0] }} · {{ t(project.yearKey) }}
                  </span>
                  <span class="ph-dark__title">{{ project.title }}</span>
                  <span class="ph-dark__tagline">{{ project.caseTitleKey ? t(project.caseTitleKey) : t(project.taglineKey) }}</span>
                </div>
              </div>

              <!-- Light placeholder: correct proportion, ready to swap for a real screenshot. -->
              <div
                v-else
                class="project-row__placeholder project-row__placeholder--light"
              >
                <span class="ph-light__title">{{ project.title }}</span>
              </div>
            </div>

            <!-- Text column -->
            <div class="project-row__text">
              <ul class="project-row__tags" :aria-label="t('projectsSection.tagsAriaLabel')">
                <li v-for="tag in tags(project)" :key="tag" class="project-row__tag">
                  {{ tag }}
                </li>
              </ul>

              <h3 class="project-row__name">{{ project.title }}</h3>
              <p class="project-row__year">{{ t(project.yearKey) }}</p>
              <p class="project-row__desc">{{ t(project.descriptionKey) }}</p>

              <ul class="project-row__stack" :aria-label="t('projectsSection.stackAriaLabel')">
                <li v-for="tech in project.stack" :key="tech" class="project-row__pill">
                  {{ tech }}
                </li>
              </ul>

              <RouterLink :to="`/projects/${project.slug}`" class="project-row__cta">
                {{ t('projectsSection.viewCase') }}
              </RouterLink>
            </div>
          </div>
        </template>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.projects {
  background-color: var(--color-bg);
  padding-top: var(--space-8);
  padding-bottom: var(--space-9);
}

.projects__inner {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Section header ─────────────────────────────────────────────────────────── */
.projects__header {
  margin-bottom: var(--space-8);
}

.projects__label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
}

.projects__label::before {
  content: '// ';
  color: var(--color-text-muted);
}

.projects__title {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-top: 12px;
  line-height: 1.05;
}

/* ─── Project list ───────────────────────────────────────────────────────────── */
.projects__list {
  display: flex;
  flex-direction: column;
}

.projects__divider {
  border-top: 1px solid var(--color-border);
  margin-block: var(--space-8);
}

/* ─── Project row ────────────────────────────────────────────────────────────── */
.project-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 480px;
}

.project-row--reversed .project-row__image-wrap { order: 2; }
.project-row--reversed .project-row__text       { order: 1; }

/* ─── Image / placeholder wrapper ───────────────────────────────────────────── */
.project-row__image-wrap {
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.project-row__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 400ms var(--ease-out-expo);
}

.project-row:hover .project-row__image {
  transform: scale(1.03);
}

/* ─── Dark typographic placeholder — inverted like Contact: bg/text flip with theme ─ */
.project-row__placeholder--dark {
  width: 100%;
  height: 100%;
  min-height: 480px;
  background-color: var(--color-text);
  border: 1px solid color-mix(in srgb, var(--color-bg) 8%, transparent);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  transition: transform 400ms var(--ease-out-expo), background-color var(--duration-base) ease;
}

.project-row:hover .project-row__placeholder--dark {
  transform: scale(1.02);
}

.ph-dark__inner {
  position: relative;
  z-index: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ph-dark__eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.ph-dark__title {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--color-bg);
}

.ph-dark__tagline {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 400;
  color: color-mix(in srgb, var(--color-bg) 45%, transparent);
  max-width: 300px;
  line-height: 1.5;
}

/* ─── Light placeholder (Horizontes Salvajes — ready for image) ──────────────── */
.project-row__placeholder--light {
  width: 100%;
  height: 100%;
  min-height: 480px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 400ms var(--ease-out-expo), background-color var(--duration-base) ease;
}

.project-row:hover .project-row__placeholder--light {
  transform: scale(1.02);
}

.ph-light__title {
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ─── Text column ────────────────────────────────────────────────────────────── */
.project-row__text {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ─── Tags ───────────────────────────────────────────────────────────────────── */
.project-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin-bottom: 20px;
}

.project-row__tag {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border: 1px solid currentColor;
  padding: 4px 10px;
  border-radius: 2px;
}

/* ─── Title + year ───────────────────────────────────────────────────────────── */
.project-row__name {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: 1.1;
}

.project-row__year {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

/* ─── Description ────────────────────────────────────────────────────────────── */
.project-row__desc {
  font-family: var(--font-ui);
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 420px;
  margin-bottom: 32px;
}

/* ─── Stack pills ────────────────────────────────────────────────────────────── */
.project-row__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin-bottom: 40px;
}

.project-row__pill {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
  border-radius: 2px;
}

/* ─── CTA ────────────────────────────────────────────────────────────────────── */
.project-row__cta {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--duration-base) ease;
  align-self: flex-start;
}

.project-row:hover .project-row__cta {
  color: var(--color-accent);
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
  .animate-up { opacity: 1; transform: none; transition: none; }
}

/* ─── Mobile ─────────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .project-row {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .project-row--reversed .project-row__image-wrap { order: 0; }
  .project-row--reversed .project-row__text       { order: 1; }

  .project-row__image-wrap,
  .project-row__placeholder--dark,
  .project-row__placeholder--light {
    min-height: auto;
    aspect-ratio: 16 / 9;
  }

  /* Anchor to the top instead of the bottom-flush desktop treatment: at
     mobile widths the box is short, so a title that wraps to two lines
     (Horizontes) needs the same top margin as a one-line title (ZF) rather
     than being pushed flush against the top edge by bottom alignment. */
  .project-row__placeholder--dark {
    align-items: flex-start;
  }

  .project-row__text {
    padding: 32px 0 0;
  }

  .projects__divider {
    margin-block: 48px;
  }

  .ph-dark__title {
    font-size: 28px;
    text-wrap: balance;
  }

  /* The dark/light card already shows its own title + tagline, so once the
     columns stack, the text block below only needs to add tags, stack,
     year and CTA — repeating the title here would read as a duplication bug. */
  .project-row__name,
  .project-row__desc {
    display: none;
  }

  .project-row__tags {
    margin-bottom: 16px;
  }

  .project-row__year {
    margin-bottom: 16px;
  }

  .project-row__cta {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
}
</style>
