<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import ExperienceSection from '../components/sections/ExperienceSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import EducationSection from '../components/sections/EducationSection.vue'
import CertificationsSection from '../components/sections/CertificationsSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { useI18n } from 'vue-i18n'
import { usePageMeta } from '../composables/usePageMeta'

const { t } = useI18n()

usePageMeta(() => ({
  title: t('meta.siteTitle'),
  description: t('meta.siteDescription'),
  path: '/',
}))
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <SkillsSection />
    <EducationSection />
    <CertificationsSection />
    <ContactSection />
  </main>
</template>
