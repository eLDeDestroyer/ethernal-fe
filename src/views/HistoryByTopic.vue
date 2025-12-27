<template>
  <div class="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-4">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- BACK BUTTON -->
    <button
      @click="handleBack"
      class="fixed top-3 left-3 z-20 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-2xl active:scale-95 transition-all text-gray-700"
    >
      ←
    </button>

    <!-- HEADER -->
    <div class="flex items-center mb-4 lg:mb-10 mt-14">
      <div
        class="w-10 h-10 lg:w-16 lg:h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold lg:text-[1.8rem]"
      >
        {{ res.data.category_short_name }}
      </div>
      <h2 class="ml-3 text-xl font-bold text-gray-800 lg:text-[1.8rem]">
        {{ res.data.category_name }}
      </h2>
    </div>

    <!-- LIST TOPICS -->
    <div
      class="space-y-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-4"
    >
      <div
        v-for="(item, idx) in res.data.topics"
        :key="idx"
        @click="goToDetail(item)"
        class="bg-white p-4 lg:p-6 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition cursor-pointer"
      >
        <!-- JUDUL -->
        <h3 class="text-base lg:text-lg font-bold text-gray-900 leading-snug">
          {{ item.title || "Tanpa Judul" }}
        </h3>

        <!-- DETAILS -->
        <div class="mt-3 text-xs lg:text-sm text-gray-600">
          <p class="mb-1">
            Total Pengerjaan:
            <span class="font-semibold">{{ item.amount_of_work || 0 }}</span>
          </p>
          <p class="text-gray-500 text-[10px] lg:text-xs">
            Terakhir: {{ formatDate(item.last_work) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import topicService from "../services/topic.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const res = ref({
  status: false,
  message: "",
  data: {
    category_name: "Loading...",
    category_short_name: "...",
    topics: [],
  },
});

const fetchTopics = async () => {
  const categoryId = route.params.uuid;
  if (!categoryId) return;

  isLoading.value = true;
  try {
    const response = await topicService.getHistoryTopics(categoryId);
    if (response) {
      res.value = response;
    }
  } catch (error) {
    console.error("Failed to fetch topics:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTopics();
});

/* BACK */
function handleBack() {
  window.history.back();
}

/* Format Date */
function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  // Example: 16/12/2025 08:46
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function goToDetail(item) {
  if (!item.topic_uuid) return;
  router.push({
    name: "history-question",
    params: { topic_id: item.topic_uuid },
  });
}
</script>
