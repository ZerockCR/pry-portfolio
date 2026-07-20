<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0.1 })

const email = 'andreslobo.dev@gmail.com'

const secondaryLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/50670070585' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zerockcr' },
  { label: 'GitHub', href: 'https://github.com/ZerockCR' },
] as const
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__inner">

      <p class="contact__label">
        <span class="contact__label-mark">//</span> {{ t('contact.label') }}
      </p>

      <p class="contact__title">{{ t('contact.title') }}</p>

      <a
        :href="`mailto:${email}`"
        class="contact__email animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 0ms"
      >
        {{ email }}
        <span class="contact__email-arrow" aria-hidden="true">→</span>
      </a>

      <hr class="contact__divider" />

      <div
        class="contact__secondary animate-up"
        :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
        style="--delay: 120ms"
      >
        <a
          v-for="link in secondaryLinks"
          :key="link.href"
          :href="link.href"
          class="contact__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label }}
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ─── Section — intentional black close, do not lighten ─────────────────────── */
.contact {
  background-color: var(--color-text);
  padding-top: 120px;
  padding-bottom: 120px;
}

.contact__inner {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}

/* ─── Label — "//" carries the accent, word stays muted ──────────────────────── */
.contact__label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: color-mix(in srgb, var(--color-bg) 55%, transparent);
}

.contact__label-mark {
  color: var(--color-accent);
}

/* ─── Title — demoted to a secondary line ────────────────────────────────────── */
.contact__title {
  font-family: var(--font-ui);
  font-size: 20px;
  font-weight: 400;
  color: color-mix(in srgb, var(--color-bg) 55%, transparent);
  margin-top: 16px;
}

/* ─── Email — the dominant element ───────────────────────────────────────────── */
.contact__email {
  display: inline-flex;
  align-items: baseline;
  gap: 16px;
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-bg);
  text-decoration: none;
  position: relative;
  margin-top: 40px;
}

.contact__email::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) ease;
}

.contact__email:hover::after,
.contact__email:focus-visible::after {
  transform: scaleX(1);
}

.contact__email-arrow {
  color: var(--color-accent);
  font-size: 32px;
  line-height: 1;
  transition: transform var(--duration-base) ease;
}

.contact__email:hover .contact__email-arrow,
.contact__email:focus-visible .contact__email-arrow {
  transform: translateX(6px);
}

/* ─── Divider ────────────────────────────────────────────────────────────────── */
.contact__divider {
  border: none;
  border-top: 0.5px solid color-mix(in srgb, var(--color-bg) 15%, transparent);
  width: 520px;
  max-width: 100%;
  margin: 40px 0 0;
}

/* ─── Secondary links ────────────────────────────────────────────────────────── */
.contact__secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 32px;
}

.contact__link {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 400;
  color: color-mix(in srgb, var(--color-bg) 60%, transparent);
  text-decoration: none;
  position: relative;
  transition: color var(--duration-base) ease;
}

.contact__link::after {
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

.contact__link:hover,
.contact__link:focus-visible {
  color: var(--color-bg);
}

.contact__link:hover::after,
.contact__link:focus-visible::after {
  transform: scaleX(1);
}

/* ─── Entrance animation — slower for the closing feel ──────────────────────── */
.animate-up {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 800ms var(--ease-out-expo),
    transform 800ms var(--ease-out-expo);
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
  .contact {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .contact__email {
    font-size: 20px;
    margin-top: 32px;
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .contact__email-arrow {
    font-size: 18px;
  }

  .contact__secondary {
    flex-direction: column;
    gap: 12px;
    margin-top: 28px;
  }

  .contact__link {
    display: flex;
    align-items: center;
    min-height: 44px;
  }
}
</style>
