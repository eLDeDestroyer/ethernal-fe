<script>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-4 lg:pt-24 lg:px-12"
  >
    <LoadingOverlay :isLoading="isLoading" />
    <AlertPopup
      :show="alertState.show"
      :type="alertState.type"
      :title="alertState.title"
      :message="alertState.message"
      @close="alertState.show = false"
    />

    <!-- BACK BUTTON -->
    <button
      @click="handleBack"
      class="absolute top-12 z-20 w-14 h-14 flex items-center justify-center bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-xl active:scale-90 hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all group cursor-pointer"
    >
      <ArrowLeftIcon
        class="w-6 h-6 text-blue-700 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-all"
      />
    </button>

    <!-- HEADER -->
    <div class="flex items-center mb-4 lg:mb-10 mt-14">
      <div
        class="w-10 h-10 lg:w-16 lg:h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold lg:text-[1.8rem]"
      >
        {{ res.data.short_category_name }}
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
        @click="openPopup(item)"
        class="bg-white p-4 lg:p-6 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition cursor-pointer"
      >
        <!-- JUDUL -->
        <h3 class="text-base lg:text-lg font-bold text-gray-900 leading-snug">
          {{ item.title || "Tanpa Judul" }}
        </h3>

        <!-- STATUS -->
        <p
          v-if="!item.total_score && !item.average_answer_time"
          class="text-xs lg:text-sm text-red-500 mt-1 font-medium"
        >
          Belum dikerjakan
        </p>

        <p v-else class="text-xs lg:text-sm text-gray-500 mt-1">
          Total Soal: {{ item.total_question || 0 }} • Benar:
          {{ item.total_score || 0 }}
        </p>

        <!-- PROGRESS -->
        <div class="mt-3">
          <div class="h-2 lg:h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              class="h-full bg-blue-500 transition-all"
              :style="{ width: calcProgress(item) }"
            ></div>
          </div>

          <p class="text-[10px] lg:text-xs text-gray-500 mt-1">
            Rata waktu: {{ item.average_answer_time ?? "-" }}s / soal
          </p>
        </div>
      </div>
    </div>

    <!-- ================= POPUP CONFIRM ================= -->
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-10">
          Yakin ingin mengerjakan?
        </h3>

        <button
          class="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-semibold active:scale-95 transition cursor-pointer"
          @click="startTopic"
        >
          Kerjakan
        </button>

        <button
          class="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold active:scale-95 transition cursor-pointer"
          @click="closePopup"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import topicService from "../services/topic.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";
import AlertPopup from "../components/AlertPopup.vue";

const route = useRoute();
const isLoading = ref(false);

const res = ref({
  status: false,
  message: "",
  data: {
    category_name: "Loading...",
    short_category_name: "...",
    topics: [],
  },
});

const showPopup = ref(false);
const activeTopic = ref(null);

const alertState = ref({
  show: false,
  title: "",
  message: "",
  type: "info",
});

const showAlert = (title, message, type = "info") => {
  alertState.value = { show: true, title, message, type };
};

const fetchTopics = async () => {
  const categoryId = route.params.uuid;
  if (!categoryId) return;

  isLoading.value = true;
  try {
    const response = await topicService.getTopics(categoryId);
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

/* Hitung progress */
function calcProgress(item) {
  if (!item.total_score || !item.total_question) return "0%";
  return (item.total_score / item.total_question) * 100 + "%";
}

/* POPUP LOGIC */
function openPopup(topic) {
  activeTopic.value = topic;
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
  activeTopic.value = null;
}

const router = useRouter();

function startTopic() {
  showPopup.value = false;

  if (!activeTopic.value) return;

  topicService
    .startQuestion(activeTopic.value.uuid)
    .then((response) => {
      if (response.status) {
        // Redirect to question page using topic_id and question_id
        router.push({
          name: "question",
          params: {
            topic_id: activeTopic.value.uuid,
            question_id: response.data.uuid,
          },
        });
      } else {
        showAlert(
          "Oops!",
          response.message || "Gagal memulai latihan",
          "error"
        );
      }
    })
    .catch((error) => {
      console.error(error);
      showAlert("Error", "Terjadi kesalahan saat memulai latihan", "error");
    });
}
</script>
