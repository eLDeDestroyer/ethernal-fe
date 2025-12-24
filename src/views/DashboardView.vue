<template>
<div class="min-h-screen relative overflow-hidden p-4 bg-gradient-to-b from-blue-50 to-blue-100 lg:pl-[20rem]">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- BACKGROUND PATTERN HALUS -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-20 -left-20 w-72 h-72 bg-white/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 -right-28 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
    </div>

    <div class="relative">

    <!-- CARD LUAR PUTIH -->
    <div class="bg-white rounded-3xl p-3 shadow-xl mb-6 border border-gray-200 lg:hidden">
        
        <!-- CARD BIRU -->
        <div class="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-6 shadow-lg overflow-hidden">

          <!-- HIASAN -->
          <div class="absolute inset-0 opacity-25 pointer-events-none">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-2 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          </div>

          <!-- ISI CARD -->
          <div class="relative flex justify-between items-center">
            
            <!-- KIRI -->
            <div class="space-y-1">
              <p class="text-sm opacity-90">Latihan Hari Ini</p>
              <h2 class="text-4xl font-extrabold tracking-wide">{{ stats.today }}</h2>

              <p class="text-xs mt-2 opacity-80 italic">
                Tetap lanjut, kamu bisa! ✨
              </p>
            </div>

            <!-- KANAN -->
            <div class="flex flex-col items-end">
              <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <span class="text-2xl">📈</span>
              </div>

              <p class="text-sm mt-3 opacity-90">Minggu Ini</p>
              <h2 class="text-3xl font-bold">{{ stats.week }}</h2>
            </div>
          </div>
        </div>
    </div>

    <!-- GRID ICON BARU -->
    <div class="grid grid-cols-4 lg:gap-4 mb-2 lg:mb-8 lg:grid-cols-3">
        <a
            v-for="item in categories"
            :key="item.uuid"
            :href="`/topic/${item.uuid}`"
            class="flex flex-col items-center p-3 lg:bg-white lg:rounded-2xl lg:shadow-md lg:border lg:border-blue-800 lg:transition-colors
                lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:p-4 lg:border-blue-400 lg:h-20 hover:lg:border-blue-500
                lg:h-[10rem]"
        >
            <!-- Kiri: icon -->
            <div class="w-14 h-14 lg:w-30 lg:h-30 flex items-center justify-center bg-white lg:bg-white rounded-xl lg:flex-shrink-0">
            <img 
                :src="item.img" 
                alt="icon" 
                class="w-10 h-10 lg:w-28 lg:h-28 object-contain"
            />
            </div>

            <!-- Kanan: text -->
            <div class="mt-2 text-center lg:mt-0 lg:text-left flex-1 ">
            <p class="text-sm hidden font-semibold text-gray-700 lg:text-[1.5rem] absolute mt-[-2.5rem] lg:block">{{ item.short_category_name }}</p>
            <p class="text-sm hidden font-semibold text-gray-700 lg:text-base lg:block">{{ item.category_name }}</p>
            <p class="text-xs    font-semibold lg:text-gray-400 block lg:hidden">{{ item.short_category_name }}</p>
            </div>
        </a>
    </div>

      <!-- CARD HORIZONTAL VERSI BARU -->
      <h2 class="text-lg font-bold text-gray-800 mb-3 lg:text-[1.5rem]">Riwayat Latihan</h2>

<div class="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
  <a :href="`/answer/${item.uuid}`"
    v-for="(item, idx) in history"
    :key="idx"
    class="w-[300px] lg:w-[400px] bg-white rounded-2xl p-4 lg:p-6 shadow-md border border-gray-200 flex-shrink-0"
  >
    <p class="text-xs lg:text-sm text-blue-600 font-bold">
      {{ item.category_name }}
    </p>
    <h3 class="text-[1.05rem] lg:text-[1.25rem] font-bold text-gray-900 mt-1 leading-snug">
      {{ item.title }}
    </h3>

    <div class="mt-2 text-xs lg:text-sm text-gray-600 space-y-0.5">
      <p><b>Nilai:</b> {{ item.total_score }} / {{ item.total_question }}</p>
      <p><b>Rata Rata Pengerjaan:</b> {{ item.average_answer_time }}s</p>
      <p><b>Total Waktu:</b> {{ item.time }}s</p>
    </div>

    <div class="mt-3">
      <div class="h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-blue-500"
          :style="{ width: (item.total_score / item.total_question * 100) + '%' }"
        ></div>
      </div>
      <p class="text-[10px] lg:text-xs text-gray-500 mt-1">Proses</p>
    </div>
  </a>
  
  <div v-if="history.length === 0" class="text-gray-500 text-sm">
    Belum ada riwayat latihan.
  </div>
</div>

      
    </div>
    

    <!-- BOTTOM BAR BARU -->
    <BottomBar />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BottomBar from '../components/BottomBar.vue';
import dashboardService from '../services/dashboard.service';
import LoadingOverlay from '../components/LoadingOverlay.vue';

const stats = ref({
  today: 0,
  week: 0
});

const categories = ref([]);
const history = ref([]);
const isLoading = ref(false);

const categoryImages = {
  "PU": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  "PBM": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYZOS6s9mhR43Nm28psii4c_4weUDrstABg&s",
  "PPU": "https://cdn-icons-png.flaticon.com/512/3135/3135712.png",
  "PK": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rRQh2bAWJTPiMaXLD--7Y8bYO25tW3VunQ&s",
  "LBI": "https://cdn-icons-png.flaticon.com/512/3050/3050477.png",
  "LBE": "https://thumbs.dreamstime.com/b/banderas-de-uk-ee-uu-alrededor-del-icono-idioma-ingl%C3%A9s-y-combinadas-en-lenguaje-diagonal-circular-aislado-fondo-blanco-347776054.jpg",
  "PM": "https://static.vecteezy.com/system/resources/thumbnails/048/846/481/small/3d-render-kid-toy-mathematical-number-blocks-for-creative-play-transparent-background-png.png"
};

const fetchDashboardData = async () => {
  isLoading.value = true;
  try {
    const response = await dashboardService.getDashboardData();
    if (response.status) {
      const data = response.data;
      console.log(data);
      // Update stats
      if (data.dashboard && data.dashboard.length > 0) {
        stats.value = {
          today: data.dashboard[0].total_work_today || 0,
          week: data.dashboard[0].total_work_this_week || 0
        };
      }
      
      // Update categories with images
      if (data.categories && data.categories.length > 0) {
        categories.value = data.categories.map(cat => ({
          ...cat,
          img: categoryImages[cat.short_category_name] || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // default icon
        }));
      }

      // Update history
      if (data.history) {
        history.value = data.history;
      }
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>
