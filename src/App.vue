<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import AppBar from './components/AppBar.vue'
import SectionNav from './components/SectionNav.vue'
import HeroSection from './components/HeroSection.vue'
import ScreenshotsSection from './components/ScreenshotsSection.vue'
import PlatformsGrid from './components/PlatformsGrid.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import SecuritySection from './components/SecuritySection.vue'
import InstallGuide from './components/InstallGuide.vue'
import ChannelsInfo from './components/ChannelsInfo.vue'
import WarningSection from './components/WarningSection.vue'
import AboutSection from './components/AboutSection.vue'
import FooterSection from './components/FooterSection.vue'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="app-shell">
    <AppBar />
    <main>
      <HeroSection />
      <ScreenshotsSection />
      <PlatformsGrid />
      <FeaturesSection />
      <SecuritySection />
      <InstallGuide />
      <ChannelsInfo />
      <WarningSection />
      <AboutSection />
    </main>
    <FooterSection />
    <SectionNav />
  </div>
</template>

<style scoped>
.app-shell {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>