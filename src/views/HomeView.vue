<script setup>
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <div class="text-center">
    <div class="flex justify-center gap-8 mb-8">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#42b883aa]" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
    <div class="mt-8">
      <router-link to="/dashboard" class="text-indigo-600 hover:text-indigo-800 font-semibold underline">
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.logo {
  will-change: filter;
}
</style>
