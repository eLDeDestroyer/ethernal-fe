<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- BACK BUTTON -->
    <button
      @click="handleBack"
      class="fixed top-3 left-3 z-20 w-10 h-10 flex items-center justify-center
             bg-white border border-gray-200 shadow-md rounded-2xl active:scale-95
             transition-all text-gray-700"
    >
      ←
    </button>

    <!-- HEADER -->
    <div class="flex items-center mb-4 lg:mb-10 mt-14">
      <div class="w-10 h-10 lg:w-14 lg:h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold lg:text-[1.8rem]">
        📝
      </div>
      <h2 class="ml-3 text-xl font-bold text-gray-800 lg:text-[1.8rem]">
        {{ res.data.topic_title }}
      </h2>
    </div>

    <!-- LIST HISTORY -->
    <div class="space-y-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
    <div
        v-for="(item, idx) in res.data.history"
        :key="idx"
        @click="goToDetail(item)"
        class="bg-white p-4 lg:p-6 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition hover:shadow-md cursor-pointer"
    >
        <!-- DATE AS TITLE -->
        <h3 class="text-base lg:text-lg font-bold text-gray-900 leading-snug mb-2">
        {{ formatDate(item.created_at) }}
        </h3>

        <!-- DETAILS -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-sm text-gray-600">
            <span>Skor:</span>
            <span class="font-bold text-blue-600">{{ item.total_score }}</span>
          </div>
          
          <div class="flex justify-between items-center text-sm text-gray-600">
             <span>Rata-rata Waktu:</span>
             <span class="font-medium">{{ item.average_answer_time }}s</span>
          </div>
        </div>
        
    </div>
    </div>

    <div v-if="!isLoading && res.data.history.length === 0" class="text-center text-gray-500 mt-10">
      Belum ada riwayat pengerjaan.
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import topicService from "../services/topic.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";

const route = useRoute();
const router = useRouter(); // Initialize router
const isLoading = ref(false);

const res = ref({
  status: false,
  message: "",
  data: {
    topic_uuid: "",
    topic_title: "Loading...",
    history: []
  }
});

const fetchHistory = async () => {
  const topicId = route.params.topic_id || route.params.uuid;
  
  if (!topicId) return;

  isLoading.value = true;
  try {
    const response = await topicService.getHistoryUserAnswers(topicId);
    if (response) {
       res.value = response;
    }
  } catch (error) {
    console.error("Failed to fetch history:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchHistory();
});

/* BACK */
function handleBack() {
  window.history.back()
}

/* Format Date */
function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

function goToDetail(item) {
  // Use item.uuid for the specific history attempt ID
  if (!item.uuid) return;
  router.push({ 
    name: 'answer', 
    params: { query_result_id: item.uuid } 
  });
}
</script>
