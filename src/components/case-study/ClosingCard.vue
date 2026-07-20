<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ClosingCardData } from '../../data/projects'

const props = defineProps<{ card: ClosingCardData }>()
const { t } = useI18n()

const isLink = computed(() => !!props.card.liveUrl)
const rootAttrs = computed(() =>
  isLink.value
    ? { href: props.card.liveUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {},
)
const headline = computed(() =>
  props.card.headlineKey ? t(props.card.headlineKey) : props.card.headline,
)
</script>

<template>
  <component
    :is="isLink ? 'a' : 'div'"
    v-bind="rootAttrs"
    class="closing-card"
    :class="{ 'closing-card--link': isLink }"
  >
    <div class="closing-card__main">
      <span class="closing-card__label">
        <span class="closing-card__dot" aria-hidden="true"></span>
        {{ t(card.statusLabelKey) }}
      </span>
      <span class="closing-card__headline">{{ headline }}</span>
      <span v-if="card.noteKey" class="closing-card__note">{{ t(card.noteKey) }}</span>
    </div>
    <span v-if="isLink" class="closing-card__arrow" aria-hidden="true">↗</span>
  </component>
</template>

<style scoped>
.closing-card {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 720px;
  padding: 24px 28px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-bg);
  text-decoration: none;
  transition: border-color var(--duration-base) ease;
}

.closing-card--link:hover,
.closing-card--link:focus-visible {
  border-color: var(--color-accent);
}

.closing-card__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.closing-card__label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.closing-card__dot {
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-signal);
}

.closing-card__headline {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.closing-card__note {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.closing-card__arrow {
  display: flex;
  align-items: center;
  font-size: 26px;
  line-height: 1;
  color: var(--color-accent);
  flex-shrink: 0;
  transition: transform var(--duration-base) ease;
}

.closing-card--link:hover .closing-card__arrow,
.closing-card--link:focus-visible .closing-card__arrow {
  transform: translate(4px, -4px);
}

@media (max-width: 768px) {
  .closing-card {
    padding: 20px 24px;
  }

  .closing-card__headline {
    font-size: 18px;
    word-break: break-all;
  }
}
</style>
