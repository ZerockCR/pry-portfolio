<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TramitePipeline from '../diagrams/TramitePipeline.vue'
import FirmaMancomunada from '../diagrams/FirmaMancomunada.vue'
import type { CaseStudyFigure } from '../../data/projects'

const props = defineProps<{ figure: CaseStudyFigure }>()
const { t } = useI18n()

const failed = ref(false)
const caption = () => t(props.figure.captionKey)
const alt = () => (props.figure.altKey ? t(props.figure.altKey) : caption())
</script>

<template>
  <div class="case-figure">
    <TramitePipeline v-if="figure.kind === 'diagram-pipeline'" />
    <FirmaMancomunada v-else-if="figure.kind === 'diagram-firma'" />
    <figure v-else-if="figure.kind === 'image' && !failed" class="case-figure__image-figure">
      <img
        :src="figure.src"
        :alt="alt()"
        class="case-figure__img"
        @error="failed = true"
      />
      <figcaption class="case-figure__caption">{{ caption() }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.case-figure {
  margin: 40px 0;
  max-width: 100%;
}

.case-figure__img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.case-figure__caption {
  margin-top: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .case-figure {
    margin: 32px 0;
  }
}
</style>
