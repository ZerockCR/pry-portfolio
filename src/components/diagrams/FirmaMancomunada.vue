<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../../composables/useReveal'

const { t } = useI18n()
const revealEls = ref<HTMLElement[]>([])
useReveal(revealEls)
</script>

<template>
  <figure
    class="firma animate-up"
    :ref="(el) => { if (el) revealEls.push(el as HTMLElement) }"
  >
    <svg viewBox="0 0 680 440" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>{{ t('diagrams.firma.caption') }}</title>
      <desc>{{ t('diagrams.firma.desc') }}</desc>
      <defs>
        <marker id="arrF" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6"
          markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <rect x="270" y="24" width="140" height="50" rx="4" class="box"/>
      <text x="340" y="49" class="t">{{ t('diagrams.firma.documento.title') }}</text>

      <line x1="332" y1="74" x2="200" y2="128" class="arr" marker-end="url(#arrF)"/>
      <line x1="340" y1="74" x2="360" y2="128" class="arr" marker-end="url(#arrF)"/>
      <line x1="348" y1="74" x2="520" y2="128" class="arr" marker-end="url(#arrF)"/>

      <rect x="120" y="132" width="120" height="56" rx="4" class="box"/>
      <text x="180" y="154" class="t">{{ t('diagrams.firma.firmante1.title') }}</text>
      <text x="180" y="172" class="s">{{ t('diagrams.firma.firmante1.subtitle') }}</text>

      <rect x="300" y="132" width="120" height="56" rx="4" class="box"/>
      <text x="360" y="154" class="t">{{ t('diagrams.firma.firmante2.title') }}</text>
      <text x="360" y="172" class="s">{{ t('diagrams.firma.firmante2.subtitle') }}</text>

      <rect x="480" y="132" width="120" height="56" rx="4" class="box"/>
      <text x="540" y="154" class="t">{{ t('diagrams.firma.firmante3.title') }}</text>
      <text x="540" y="172" class="s">{{ t('diagrams.firma.firmante3.subtitle') }}</text>

      <line x1="188" y1="188" x2="316" y2="264" class="arr" marker-end="url(#arrF)"/>
      <line x1="360" y1="188" x2="360" y2="264" class="arr" marker-end="url(#arrF)"/>
      <line x1="532" y1="188" x2="404" y2="264" class="arr" marker-end="url(#arrF)"/>

      <rect x="250" y="268" width="180" height="56" rx="4" class="box accent"/>
      <text x="340" y="290" class="t accent-t">{{ t('diagrams.firma.validacion.title') }}</text>
      <text x="340" y="308" class="s">{{ t('diagrams.firma.validacion.subtitle') }}</text>

      <line x1="340" y1="324" x2="340" y2="356" class="arr" marker-end="url(#arrF)"/>

      <rect x="250" y="360" width="180" height="56" rx="4" class="box"/>
      <text x="340" y="382" class="t">{{ t('diagrams.firma.documentoFirmado.title') }}</text>
      <text x="340" y="400" class="s">{{ t('diagrams.firma.documentoFirmado.subtitle') }}</text>
    </svg>
    <figcaption class="firma__caption">{{ t('diagrams.firma.caption') }}</figcaption>
  </figure>
</template>

<style scoped>
.firma {
  width: 100%;
}

.firma svg {
  width: 100%;
  height: auto;
  display: block;
}

.firma__caption {
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

/* ─── Entrance animation ─────────────────────────────────────────────────────── */
.animate-up {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity var(--duration-enter) var(--ease-out-expo),
    transform var(--duration-enter) var(--ease-out-expo);
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
</style>
