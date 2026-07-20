<script setup lang="ts">
import { computed, onBeforeUpdate, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import { useReveal } from '../composables/useReveal'
import { usePageMeta } from '../composables/usePageMeta'
import CaseFigure from '../components/case-study/CaseFigure.vue'
import ClosingCard from '../components/case-study/ClosingCard.vue'

const route = useRoute()
const router = useRouter()
const { t, tm, rt } = useI18n()

const project = computed(() => {
  const found = projects.find((p) => p.slug === route.params.slug)
  if (!found) {
    router.replace('/')
  }
  return found
})

function tags(): string[] {
  const p = project.value
  return p ? (tm(p.tagsKey) as string[]).map((tag) => rt(tag)) : []
}

usePageMeta(() => {
  const p = project.value
  const title = p ? (p.caseTitleKey ? t(p.caseTitleKey) : p.title) : ''
  return {
    title: p ? `${title} — Andrés Lobo` : t('meta.siteTitle'),
    description: p ? t(p.descriptionKey) : '',
    path: `/projects/${route.params.slug}`,
  }
})

const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0 })

// Sections flagged `mergeNavWithPrevious` fold into the prior entry's nav
// item — one rail label can span a range of section indices, so it stays
// highlighted across all the sections it represents.
const navEntries = computed(() => {
  const sections = project.value?.caseStudy ?? []
  const entries: { label: string; startIndex: number; endIndex: number }[] = []
  sections.forEach((section, i) => {
    const last = entries[entries.length - 1]
    if (section.mergeNavWithPrevious && last) {
      last.label = section.navLabelKey ? t(section.navLabelKey) : `${last.label} · ${t(section.headingKey)}`
      last.endIndex = i
    } else {
      entries.push({ label: t(section.headingKey), startIndex: i, endIndex: i })
    }
  })
  return entries
})

// Tracks which case-study section is currently in view, to highlight it
// in the sticky Eje A rail — separate from useReveal, which is one-shot.
// Driven directly off scroll position (rAF-throttled) rather than
// IntersectionObserver: a two-mechanism setup (observer + scroll listener)
// raced, since the observer's async callback could fire after scroll
// stopped and silently revert the bottom-of-page correction.
const sectionEls = ref<HTMLElement[]>([])
const activeIndex = ref(0)
let ticking = false

// Function-style :ref callbacks re-fire on every re-render for v-for
// elements, so these arrays must be reset before each render or they
// accumulate duplicates — which broke index-based lookups into sectionEls.
onBeforeUpdate(() => {
  revealEls.value = []
  sectionEls.value = []
})

function updateActiveSection() {
  ticking = false
  const sections = sectionEls.value
  if (!sections.length) return

  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
  if (atBottom) {
    activeIndex.value = sections.length - 1
    return
  }

  const referenceY = window.innerHeight * 0.45
  let current = 0
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top <= referenceY) current = i
  }
  activeIndex.value = current
}

function handleScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateActiveSection)
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main v-if="project" class="project-view">
    <div class="project-view__grid">

      <!-- Eje A — page header -->
      <RouterLink to="/" class="project-view__back">
        {{ t('projectView.backLink') }}
      </RouterLink>

      <p
        class="project-view__eyebrow animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 40ms"
      >
        {{ t('projectView.eyebrow') }}
      </p>

      <h1
        class="project-view__title animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 80ms"
      >
        {{ project.caseTitleKey ? t(project.caseTitleKey) : project.title }}
      </h1>

      <p
        class="project-view__tagline animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 140ms"
      >
        {{ project.caseTaglineKey ? t(project.caseTaglineKey) : t(project.taglineKey) }}
      </p>

      <div
        class="project-view__meta animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 200ms"
      >
        <ul v-if="tags().length" class="project-view__tags">
          <li v-for="tag in tags()" :key="tag" class="project-view__tag">
            {{ tag }}
          </li>
        </ul>

        <ul class="project-view__pills">
          <li v-for="tech in project.stack" :key="tech" class="project-view__pill">
            {{ tech }}
          </li>
        </ul>
      </div>

      <!-- Eje B — hero content: scale (ZF) or live proof (HS) -->
      <div
        v-if="project.heroStats"
        class="project-view__stats animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 240ms"
      >
        <div v-for="stat in project.heroStats" :key="stat.labelKey" class="project-view__stat">
          <span class="project-view__stat-value">{{ stat.value }}</span>
          <span class="project-view__stat-label">{{ t(stat.labelKey) }}</span>
        </div>
      </div>

      <div
        v-if="project.heroCard"
        class="project-view__hero-card animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 240ms"
      >
        <ClosingCard :card="project.heroCard" />
      </div>

      <div
        v-if="project.image"
        class="project-view__hero-image animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 280ms"
      >
        <img :src="project.image" :alt="project.title" />
      </div>

      <hr class="project-view__divider" />

      <!-- Eje A — sticky section rail -->
      <div v-if="project.caseStudy" class="project-view__body-label">
        <p class="project-view__body-label-text">{{ t('projectView.process') }}</p>
        <ul class="project-view__nav">
          <li
            v-for="entry in navEntries"
            :key="entry.label"
            class="project-view__nav-item"
            :class="{ 'project-view__nav-item--active': activeIndex >= entry.startIndex && activeIndex <= entry.endIndex }"
          >
            {{ entry.label }}
          </li>
        </ul>
      </div>

      <!-- Eje B — case study body -->
      <div v-if="project.caseStudy" class="project-view__body-entries">
        <section
          v-for="(section, index) in project.caseStudy"
          :key="section.headingKey"
          class="project-view__entry animate-up"
          :class="{ 'project-view__entry--has-divider': index > 0 }"
          :ref="(el) => { if (el) { revealEls.push(el as HTMLElement); sectionEls.push(el as HTMLElement) } }"
          :style="`--delay: ${index * 100}ms`"
        >
          <h2 class="project-view__heading">{{ t(section.headingKey) }}</h2>

          <CaseFigure v-if="section.figure" :figure="section.figure" />

          <template v-if="section.paragraphs">
            <template v-for="(p, pi) in section.paragraphs" :key="pi">
              <p class="project-view__paragraph" v-html="t(p.textKey)"></p>
              <CaseFigure v-for="(fig, fi) in p.figures" :key="fi" :figure="fig" />
            </template>
          </template>

          <div v-if="section.subBlocks" class="project-view__subblocks">
            <div v-for="sub in section.subBlocks" :key="sub.headingKey" class="project-view__subblock">
              <h3 class="project-view__subheading">{{ t(sub.headingKey) }}</h3>
              <template v-for="(p, pi) in sub.paragraphs" :key="pi">
                <p class="project-view__paragraph" v-html="t(p.textKey)"></p>
                <CaseFigure v-for="(fig, fi) in p.figures" :key="fi" :figure="fig" />
              </template>
            </div>
          </div>

          <p
            v-for="(p, pi) in section.closingParagraphs"
            :key="`closing-${pi}`"
            class="project-view__paragraph"
            v-html="t(p.textKey)"
          ></p>
        </section>

        <ClosingCard v-if="project.resultCard" :card="project.resultCard" />
      </div>

      <div v-else class="project-view__coming">
        {{ t('projectView.comingSoon') }}
      </div>

    </div>
  </main>
</template>

<style scoped>
.project-view {
  min-height: 100svh;
  background-color: var(--color-bg);
}

.project-view__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
  padding-top: 140px;
  padding-bottom: 128px;
}

/* ─── Back link ──────────────────────────────────────────────────────────────── */
.project-view__back {
  grid-column: 1 / 13;
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--color-text-muted);
  display: inline-block;
  width: fit-content;
  margin-bottom: 56px;
  text-decoration: none;
  position: relative;
  transition: color var(--duration-base) ease;
}

.project-view__back::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) ease;
}

.project-view__back:hover,
.project-view__back:focus-visible {
  color: var(--color-accent);
}

.project-view__back:hover::after,
.project-view__back:focus-visible::after {
  transform: scaleX(1);
}

/* ─── Eyebrow ────────────────────────────────────────────────────────────────── */
.project-view__eyebrow {
  grid-column: 1 / 13;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
}

.project-view__eyebrow::before {
  content: '// ';
  color: var(--color-text-muted);
}

/* ─── Header ─────────────────────────────────────────────────────────────────── */
.project-view__title {
  grid-column: 1 / 13;
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--color-text);
  margin-top: 12px;
  max-width: 900px;
}

.project-view__tagline {
  grid-column: 1 / 13;
  font-family: var(--font-ui);
  font-style: italic;
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-top: 24px;
  max-width: 640px;
  line-height: 1.6;
}

/* ─── Meta (tags / stack) ─────────────────────────────────────────────────────── */
.project-view__meta {
  grid-column: 1 / 13;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-view__tags,
.project-view__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.project-view__tag {
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

.project-view__pill {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
  border-radius: 2px;
}

/* ─── Hero stats (ZF) — same typographic treatment as the hero TECNOLOGÍAS rail ─ */
.project-view__stats {
  grid-column: 5 / 13;
  margin-top: 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
}

.project-view__stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.project-view__stat-value {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--color-text);
}

.project-view__stat-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ─── Hero card (HS) ─────────────────────────────────────────────────────────── */
.project-view__hero-card {
  grid-column: 5 / 13;
  margin-top: 48px;
}

/* ─── Hero image ─────────────────────────────────────────────────────────────── */
.project-view__hero-image {
  grid-column: 5 / 13;
  margin-top: 48px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  aspect-ratio: 16 / 9;
}

.project-view__hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ─── Divider ────────────────────────────────────────────────────────────────── */
.project-view__divider {
  grid-column: 1 / 13;
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 80px 0;
}

/* ─── Eje A — sticky section rail ────────────────────────────────────────────── */
.project-view__body-label {
  grid-column: 1 / 4;
  position: sticky;
  top: 48px;
  align-self: start;
}

.project-view__body-label-text {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
}

.project-view__body-label-text::before {
  content: '// ';
  color: var(--color-text-muted);
}

.project-view__nav {
  list-style: none;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-view__nav-item {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  transition: color var(--duration-base) ease;
}

.project-view__nav-item--active {
  color: var(--color-text);
  font-weight: 500;
}

/* ─── Eje B — body entries ───────────────────────────────────────────────────── */
.project-view__body-entries {
  grid-column: 5 / 13;
  display: flex;
  flex-direction: column;
  gap: 56px;
  max-width: 720px;
}

.project-view__entry--has-divider {
  border-top: 1px solid var(--color-border);
  padding-top: 56px;
  margin-top: -56px;
}

.project-view__heading {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.project-view__subblocks {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
}

.project-view__subheading {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.project-view__paragraph {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text);
}

.project-view__paragraph + .project-view__paragraph {
  margin-top: 16px;
}

.project-view__paragraph :deep(em) {
  color: var(--color-text);
  font-style: italic;
}

/* ─── Coming soon fallback ───────────────────────────────────────────────────── */
.project-view__coming {
  grid-column: 5 / 13;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 400;
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
  .project-view__grid {
    display: block;
    padding-top: 112px;
  }

  .project-view__title {
    font-size: 36px;
    margin-top: 8px;
    text-wrap: balance;
  }

  .project-view__tagline {
    font-size: 16px;
  }

  .project-view__stats {
    margin-top: 40px;
    gap: 32px;
  }

  .project-view__hero-card,
  .project-view__hero-image {
    margin-top: 40px;
  }

  .project-view__divider {
    margin: 56px 0;
  }

  .project-view__body-label {
    position: static;
    margin-bottom: 24px;
  }

  .project-view__body-entries {
    gap: 40px;
    max-width: 100%;
  }

  .project-view__entry--has-divider {
    padding-top: 40px;
    margin-top: -40px;
  }

  .project-view__heading {
    font-size: 21px;
  }
}
</style>
