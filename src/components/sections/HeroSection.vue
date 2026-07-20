<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'

const { t } = useI18n()

const scrolled = ref(false)
const revealEls = ref<HTMLElement[]>([])

// Hero elements are already in the viewport on load, so IntersectionObserver
// fires immediately — same effect as the previous requestAnimationFrame approach.
useReveal(revealEls, { threshold: 0 })

function handleScroll() {
  scrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section class="hero">
    <div class="hero__inner">

      <!-- Terminal-style pre-label -->
      <p
        class="hero__prelabel animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 0ms"
      >
        <span class="hero__prompt" aria-hidden="true">$</span>
        {{ t('hero.whoami') }} <span class="hero__prompt-out">→ {{ t('hero.role') }}</span><span class="hero__cursor" aria-hidden="true"></span>
      </p>

      <div class="hero__heading-row">
        <div class="hero__heading-group">
          <h1
            class="hero__name animate-up"
            :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
            style="--delay: 80ms"
          >
            Andrés Lobo
          </h1>
          <p
            class="hero__headline animate-up"
            :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
            style="--delay: 160ms"
          >
            {{ t('hero.headlineLine1') }}<br />{{ t('hero.headlineLine2') }}
          </p>
        </div>

        <aside
          class="hero__meta hero__meta--desktop animate-up"
          :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
          style="--delay: 200ms"
        >
          <dl class="hero__meta-list">
            <div class="hero__meta-group">
              <dt class="hero__meta-label">{{ t('hero.meta.technologies') }}</dt>
              <dd class="hero__meta-value">C# · .NET · Python · Flask</dd>
              <dd class="hero__meta-value">Vue · TypeScript · SQL Server</dd>
            </div>
            <div class="hero__meta-group">
              <dt class="hero__meta-label">{{ t('hero.meta.location') }}</dt>
              <dd class="hero__meta-value">San José, CR</dd>
            </div>
            <div class="hero__meta-group">
              <dt class="hero__meta-label">{{ t('hero.meta.status') }}</dt>
              <dd class="hero__meta-value hero__meta-value--status">
                <span class="hero__status-dot" aria-hidden="true"></span>
                {{ t('hero.meta.statusValue') }}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <p
        class="hero__subline animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 280ms"
      >
        {{ t('hero.sublineLine1') }}<br />
        {{ t('hero.sublineLine2') }}
      </p>

      <!-- META mobile -->
      <div
        class="hero__meta hero__meta--mobile animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 200ms"
      >
        <dl class="hero__meta-list">
          <div class="hero__meta-group">
            <dt class="hero__meta-label">{{ t('hero.meta.technologies') }}</dt>
            <dd class="hero__meta-value">C# · .NET · Python · Flask</dd>
            <dd class="hero__meta-value">Vue · TypeScript · SQL</dd>
          </div>
          <div class="hero__meta-group">
            <dt class="hero__meta-label">{{ t('hero.meta.location') }}</dt>
            <dd class="hero__meta-value">San José, CR</dd>
          </div>
          <div class="hero__meta-group">
            <dt class="hero__meta-label">{{ t('hero.meta.status') }}</dt>
            <dd class="hero__meta-value hero__meta-value--status">
              <span class="hero__status-dot" aria-hidden="true"></span>
              {{ t('hero.meta.statusValue') }}
            </dd>
          </div>
        </dl>
      </div>

      <div
        class="hero__cta animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 380ms"
      >
        <a href="#projects" class="hero__btn-primary">{{ t('hero.ctaProjects') }}</a>
        <a href="#contact" class="hero__link-secondary">{{ t('hero.ctaContact') }}</a>
      </div>

    </div>

    <div class="hero__scroll-indicator" :class="{ 'is-hidden': scrolled }">
      <span class="hero__scroll-label">{{ t('hero.scroll') }}</span>
      <span class="hero__scroll-line" aria-hidden="true"></span>
    </div>
  </section>
</template>

<style scoped>
/* ─── Section ────────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ─── Container ──────────────────────────────────────────────────────────────── */
.hero__inner {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
  width: 100%;
}

/* ─── Pre-label — terminal prompt ────────────────────────────────────────────── */
.hero__prelabel {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__prompt {
  color: var(--color-accent);
}

.hero__prompt-out {
  color: var(--color-text);
}

.hero__cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: var(--color-signal);
  animation: hero-blink 1.1s step-end infinite;
}

@keyframes hero-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__cursor {
    animation: none;
  }
}

/* ─── Heading row ────────────────────────────────────────────────────────────── */
.hero__heading-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: start;
}

.hero__heading-group {
  grid-column: 1 / 8;
}

/* ─── Name + headline — one visual unit, weight carries the hierarchy ────────── */
.hero__name {
  font-family: var(--font-display);
  font-size: 88px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-text);
  display: block;
}

.hero__headline {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
  display: block;
  margin-top: 12px;
}

/* ─── Subline ────────────────────────────────────────────────────────────────── */
.hero__subline {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text-muted);
  max-width: calc((7 / 12) * (var(--max-width) - var(--padding-x) * 2));
  line-height: 1.7;
  margin-top: 32px;
}

/* ─── CTA ────────────────────────────────────────────────────────────────────── */
.hero__cta {
  display: flex;
  align-items: baseline;
  margin-top: 40px;
}

.hero__btn-primary {
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 500;
  background-color: var(--color-text);
  color: var(--color-bg);
  padding: 14px 28px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: background-color var(--duration-base) ease;
}

.hero__btn-primary:hover {
  background-color: var(--color-accent);
}

.hero__link-secondary {
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 24px;
  text-decoration: none;
  position: relative;
  transition: color var(--duration-base) ease;
}

.hero__link-secondary::after {
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

.hero__link-secondary:hover::after {
  transform: scaleX(1);
}

/* ─── Meta block ─────────────────────────────────────────────────────────────── */
.hero__meta--desktop {
  grid-column: 9 / 13;
  display: block;
}

.hero__meta--mobile {
  display: none;
}

.hero__meta-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
}

.hero__meta-group {
  display: flex;
  flex-direction: column;
}

.hero__meta-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 6px;
}

.hero__meta-value {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-muted);
  line-height: 1.8;
}

.hero__meta-value--status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero__status-dot {
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-signal);
}

/* ─── Scroll indicator ───────────────────────────────────────────────────────── */
.hero__scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 1;
  transition: opacity 400ms ease;
  pointer-events: none;
}

.hero__scroll-indicator.is-hidden {
  opacity: 0;
}

.hero__scroll-label {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.hero__scroll-line {
  width: 1px;
  height: 32px;
  background-color: var(--color-text-muted);
  opacity: 0.4;
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
  .hero {
    justify-content: flex-start;
    padding-top: 96px;
    padding-bottom: 80px;
  }

  .hero__prelabel {
    font-size: 12px;
  }

  .hero__heading-row {
    display: block;
  }

  .hero__name {
    font-size: 44px;
  }

  .hero__headline {
    font-size: 30px;
    margin-top: 8px;
  }

  .hero__subline {
    max-width: 100%;
  }

  .hero__meta--desktop {
    display: none;
  }

  .hero__meta--mobile {
    display: block;
    margin-top: 32px;
  }

  .hero__cta {
    margin-top: 32px;
  }

  .hero__scroll-indicator {
    display: none;
  }
}
</style>
