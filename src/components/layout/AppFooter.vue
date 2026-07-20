<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="app-footer">
    <div class="container app-footer__inner">
      <p class="app-footer__copy">
        <span class="app-footer__prompt" aria-hidden="true">//</span>
        Andrés Lobo · {{ year }}
      </p>

      <button type="button" class="app-footer__top" @click="scrollToTop">
        {{ t('footer.backToTop') }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.app-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-block: var(--space-7);
  border-top: 1px solid var(--color-border);
}

.app-footer__copy {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text-muted);
  display: flex;
  gap: 8px;
}

.app-footer__prompt {
  color: var(--color-accent);
}

.app-footer__top {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-muted);
  transition: color var(--duration-base) ease;
}

.app-footer__top:hover,
.app-footer__top:focus-visible {
  color: var(--color-accent);
  outline: none;
}

@media (max-width: 768px) {
  .app-footer__inner {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .app-footer__top {
    padding-block: 16px;
    margin-block: -16px;
    padding-inline: 12px;
    margin-inline: -12px;
  }
}
</style>
