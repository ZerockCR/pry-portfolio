<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '../../composables/useTheme'
import { useLocale } from '../../composables/useLocale'

const { theme, toggleTheme } = useTheme()
const { locale, toggleLocale } = useLocale()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const scrolled = ref(false)
const menuOpen = ref(false)

const navLinks = computed(() => [
  { href: '#about', label: t('nav.about') },
  { href: '#projects', label: t('nav.projects') },
  { href: '#experience', label: t('nav.experience') },
  { href: '#contact', label: t('nav.contact') },
])

const nextLocaleLabel = computed(() => (locale.value === 'es' ? 'EN' : 'ES'))

function handleScroll() {
  scrolled.value = window.scrollY > 24
}

function closeMenu() {
  menuOpen.value = false
}

function handleNavClick(event: MouseEvent, href: string) {
  closeMenu()
  if (route.path !== '/') {
    event.preventDefault()
    router.push({ path: '/', hash: href })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="app-header" :class="{ 'is-scrolled': scrolled }">
    <nav class="container app-header__nav" :aria-label="t('nav.ariaLabel')">
      <RouterLink to="/" class="app-header__logo">
        <span class="app-header__prompt" aria-hidden="true">~/</span>andres-lobo
      </RouterLink>

      <ul class="app-header__links app-header__links--desktop">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="app-header__link" @click="handleNavClick($event, link.href)">{{ link.label }}</a>
        </li>
      </ul>

      <div class="app-header__actions">
        <button
          type="button"
          class="app-header__theme-toggle"
          :aria-pressed="theme === 'dark'"
          :aria-label="t('nav.themeToggleAria')"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg v-else width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        </button>

        <button
          type="button"
          class="app-header__lang-toggle"
          :aria-label="t('nav.langToggleAria')"
          @click="toggleLocale"
        >
          {{ nextLocaleLabel }}
        </button>

        <button
          type="button"
          class="app-header__menu-toggle"
          :aria-expanded="menuOpen"
          :aria-label="t('nav.menuToggleAria')"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="!menuOpen" width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </nav>

    <ul v-if="menuOpen" class="app-header__links app-header__links--mobile">
      <li v-for="link in navLinks" :key="link.href">
        <a :href="link.href" class="app-header__link" @click="handleNavClick($event, link.href)">{{ link.label }}</a>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
  border-bottom: 1px solid transparent;
}

.app-header.is-scrolled {
  background-color: color-mix(in srgb, var(--color-bg) 82%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--color-border);
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

/* ─── Logo ───────────────────────────────────────────────────────────────────── */
.app-header__logo {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
}

.app-header__prompt {
  color: var(--color-accent);
}

/* ─── Links ──────────────────────────────────────────────────────────────────── */
.app-header__links {
  list-style: none;
  display: flex;
  gap: 36px;
}

.app-header__links--mobile {
  display: none;
}

.app-header__link {
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-muted);
  transition: color var(--duration-base) ease;
}

.app-header__link:hover,
.app-header__link:focus-visible {
  color: var(--color-text);
}

/* ─── Actions ────────────────────────────────────────────────────────────────── */
.app-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__theme-toggle,
.app-header__lang-toggle,
.app-header__menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: var(--color-text);
  border-radius: 50%;
  transition: background-color var(--duration-base) ease, color var(--duration-base) ease;
}

.app-header__lang-toggle {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
}

.app-header__theme-toggle:hover,
.app-header__lang-toggle:hover,
.app-header__menu-toggle:hover {
  background-color: var(--color-surface);
  color: var(--color-accent);
}

.app-header__link:focus-visible,
.app-header__theme-toggle:focus-visible,
.app-header__lang-toggle:focus-visible,
.app-header__menu-toggle:focus-visible,
.app-header__logo:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.app-header__menu-toggle {
  display: none;
}

/* ─── Mobile ─────────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .app-header__links--desktop {
    display: none;
  }

  .app-header__menu-toggle {
    display: flex;
  }

  .app-header__theme-toggle,
  .app-header__lang-toggle,
  .app-header__menu-toggle {
    width: 44px;
    height: 44px;
  }

  .app-header__links--mobile {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-inline: var(--padding-x);
    padding-block: 8px 20px;
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
  }

  .app-header__links--mobile .app-header__link {
    display: block;
    padding: 12px 0;
    font-size: 15px;
  }
}
</style>
