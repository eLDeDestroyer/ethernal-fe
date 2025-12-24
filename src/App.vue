import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

const { initTheme } = useTheme()

// Initialize immediately to prevent flash of wrong theme
initTheme()

<template>
  <RouterView />
</template>
