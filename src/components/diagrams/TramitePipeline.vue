<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls, { threshold: 0.2 })
</script>

<template>
  <figure class="pipeline">
    <svg viewBox="0 0 500 476" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>{{ t('diagrams.pipeline.caption') }}</title>
      <desc>{{ t('diagrams.pipeline.desc') }}</desc>
      <defs>
        <marker id="arrP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6"
          markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <g
        class="step"
        :ref="(el) => { if (el) revealEls.push(el as unknown as HTMLElement) }"
        style="--delay: 0ms"
      >
        <rect x="100" y="24" width="300" height="56" rx="4" class="box"/>
        <text x="250" y="46" class="t">{{ t('diagrams.pipeline.solicitud.title') }}</text>
        <text x="250" y="64" class="s">{{ t('diagrams.pipeline.solicitud.subtitle') }}</text>
      </g>
      <line x1="250" y1="80" x2="250" y2="112" class="arr" marker-end="url(#arrP)"/>

      <g
        class="step"
        :ref="(el) => { if (el) revealEls.push(el as unknown as HTMLElement) }"
        style="--delay: 80ms"
      >
        <rect x="100" y="112" width="300" height="56" rx="4" class="box"/>
        <text x="250" y="134" class="t">{{ t('diagrams.pipeline.validaciones.title') }}</text>
        <text x="250" y="152" class="s">{{ t('diagrams.pipeline.validaciones.subtitle') }}</text>
      </g>
      <line x1="250" y1="168" x2="250" y2="200" class="arr" marker-end="url(#arrP)"/>

      <g
        class="step"
        :ref="(el) => { if (el) revealEls.push(el as unknown as HTMLElement) }"
        style="--delay: 160ms"
      >
        <rect x="100" y="200" width="300" height="56" rx="4" class="box accent"/>
        <text x="250" y="222" class="t accent-t">{{ t('diagrams.pipeline.firmas.title') }}</text>
        <text x="250" y="240" class="s">{{ t('diagrams.pipeline.firmas.subtitle') }}</text>
      </g>
      <line x1="250" y1="256" x2="250" y2="288" class="arr" marker-end="url(#arrP)"/>

      <g
        class="step"
        :ref="(el) => { if (el) revealEls.push(el as unknown as HTMLElement) }"
        style="--delay: 240ms"
      >
        <rect x="100" y="288" width="300" height="56" rx="4" class="box"/>
        <text x="250" y="310" class="t">{{ t('diagrams.pipeline.notificacion.title') }}</text>
        <text x="250" y="328" class="s">{{ t('diagrams.pipeline.notificacion.subtitle') }}</text>
      </g>
      <line x1="250" y1="344" x2="250" y2="376" class="arr" marker-end="url(#arrP)"/>

      <g
        class="step"
        :ref="(el) => { if (el) revealEls.push(el as unknown as HTMLElement) }"
        style="--delay: 320ms"
      >
        <rect x="100" y="376" width="300" height="56" rx="4" class="box"/>
        <text x="250" y="398" class="t">{{ t('diagrams.pipeline.resuelto.title') }}</text>
        <text x="250" y="416" class="s">{{ t('diagrams.pipeline.resuelto.subtitle') }}</text>
      </g>
    </svg>
    <figcaption class="pipeline__caption">{{ t('diagrams.pipeline.caption') }}</figcaption>
  </figure>
</template>

<style scoped>
.pipeline {
  width: 100%;
}

.pipeline svg {
  width: 100%;
  height: auto;
  display: block;
}

.pipeline__caption {
  margin-top: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
}

.box {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 0.5;
}

.box.accent {
  stroke: var(--color-accent);
  stroke-width: 1;
}

.t {
  font: 500 14px var(--font-ui);
  fill: var(--color-text);
  text-anchor: middle;
  dominant-baseline: central;
}

.s {
  font: 400 12px var(--font-ui);
  fill: var(--color-text);
  opacity: 0.6;
  text-anchor: middle;
  dominant-baseline: central;
}

.accent-t {
  fill: var(--color-accent);
}

.arr {
  stroke: var(--color-text);
  stroke-width: 1;
  fill: none;
  opacity: 0.5;
}

/* ─── Staggered entrance per stage ───────────────────────────────────────────── */
.step {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--duration-enter) var(--ease-out-expo),
    transform var(--duration-enter) var(--ease-out-expo);
  transition-delay: var(--delay, 0ms);
}

.step.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .step {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
