<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white relative pb-20 overflow-hidden">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- Dekorasi background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-24 right-0 w-56 h-56 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
    </div>

    <!-- ================= HEADER ================= -->
    <header class="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div class="max-w-md mx-auto flex items-center justify-between px-4 py-3">

        <!-- Profile email -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
            {{ emailFirstLetter }}
          </div>
          <div class="leading-tight">
            <p class="text-[10px] text-gray-400">Email</p>
            <p class="text-sm font-semibold text-gray-700 truncate max-w-[140px]">{{ userEmail }}</p>
          </div>
        </div>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full hover:bg-gray-100 transition-colors"
          :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span v-if="isDarkMode" class="text-xl">☀️</span>
          <span v-else class="text-xl">🌙</span>
        </button>
      </div>
    </header>
    <!-- ================= END HEADER ================= -->


    <!-- CONTENT -->
    <div class="pt-20 px-4 max-w-md lg:max-w-5xl lg:mr-[12rem] mx-auto lg:pt-[10rem]">

      <!-- Statistik -->
      <h3 class="text-base font-semibold text-gray-800 mb-3">Statistik Mingguan</h3>

      <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-end justify-between h-36">
          <div
            v-for="(item, i) in res.stats"
            :key="i"
            class="flex-1 mx-1 flex flex-col items-center justify-end"
          >
            <!-- Angka -->
            <span class="text-[10px] text-gray-600 mb-1 font-semibold">
              {{ item.count }}
            </span>

            <!-- Bar -->
            <div
              class="w-full rounded-lg transition-all duration-300 
                    bg-gradient-to-b from-blue-500 to-blue-600"
              :style="{ height: Math.max(item.count * 15, 6) + 'px' }"
            ></div>
          </div>
        </div>

        <!-- Label hari -->
        <div class="flex justify-between text-[10px] text-gray-500 mt-2">
          <span
            v-for="(item, i) in res.stats"
            :key="'day'+i"
            class="flex-1 text-center"
          >
            {{ item.date }}
          </span>
        </div>
      </div>


      <!-- Kategori -->
      <h3 class="text-base font-semibold text-gray-800 mt-6 mb-3">Kategori Belajar</h3>

      <div class="space-y-2 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        <div
          v-for="cat in res.categories"
          :key="cat.uuid"
          @click="router.push(`/history/${cat.uuid}`)"
          class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.97] transition cursor-pointer"
        >
          <div>
            <p class="text-sm font-bold text-blue-600">
              {{ cat.short_category_name }}
            </p>
            <p class="text-xs text-gray-800 mt-1">
              {{ cat.category_name }}
            </p>
          </div>

          <div class="text-blue-500 text-xl font-bold">›</div>
        </div>
      </div>

      <button
        @click="handleLogout"
        class="w-full bg-red-200 text-red-600 font-bold py-3 rounded-xl border border-red-100 mb-4 active:scale-95 transition"
      >
        Keluar
      </button>

    </div>

    <!-- Bottom Navigation -->
    <BottomBar />
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue"
import BottomBar from "../components/BottomBar.vue"
import profileService from "../services/profile.service"
import LoadingOverlay from "../components/LoadingOverlay.vue"
import { useTheme } from "../composables/useTheme"

const { isDarkMode, toggleTheme } = useTheme()
const isLoading = ref(false)

const res = ref({
  username: "Loading...",
  categories: [],
  stats: []
})

const userEmail = ref("...")
const emailFirstLetter = computed(() => userEmail.value.charAt(0).toUpperCase())

const fetchUserStats = async () => {
  isLoading.value = true
  try {
    const response = await profileService.getUserStats()
    if (response.status) {
       const data = response.data
       userEmail.value = data.username
       
       // Process stats to format date as "MM-DD"
       const formattedStats = (data.stats || []).map(stat => ({
           ...stat,
           date: formatDate(stat.date)
       }))
       
       res.value = {
           username: data.username,
           categories: data.categories || [],
           stats: formattedStats
       }
    }
  } catch (error) {
    console.error("Failed to fetch user stats:", error)
  } finally {
    isLoading.value = false
  }
}

import { useRouter } from "vue-router"

const router = useRouter()

const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user') // Also remove user info if stored
    router.push('/login')
}

function formatDate(dateString) {
    // dateString format YYYY-MM-DD
    if (!dateString) return ""
    const parts = dateString.split('-')
    if (parts.length === 3) {
        return `${parts[1]}-${parts[2]}`
    }
    return dateString
}

/* ============ TIMER COUNT-UP ============ */
const time = ref(0)
let interval = null

onMounted(() => {
  fetchUserStats()
  interval = setInterval(() => {
    time.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const formattedTime = computed(() => {
  const m = Math.floor(time.value / 60).toString().padStart(2, "0")
  const s = (time.value % 60).toString().padStart(2, "0")
  return `${m}:${s}`
})
</script>
