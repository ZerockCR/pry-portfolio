<script setup lang="ts">
import './styles/base.css'
import './styles/typography.css'
import './styles/utilities.css'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'

useTheme()
useLocale()
</script>

<template>
  <div class="grain-overlay" aria-hidden="true"></div>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style>
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  pointer-events: none;
  opacity: var(--grain-opacity);
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
