<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 pb-24">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- HEADER -->
    <div class="fixed top-0 left-0 right-0 z-30 bg-white shadow-md border-b border-gray-200 px-4 py-3">
      <h2 class="text-lg font-bold text-gray-800">Hasil Jawaban</h2>
    </div>

    <div class="h-16"></div>

    <!-- LIST RESULT -->
    <div class="px-4 space-y-5 lg:p-10">

      <div
        v-for="(q, idx) in res"
        :key="idx"
        class="p-5 rounded-2xl shadow-md border transition lg:mx-[10rem]"
        :class="q.is_correct 
          ? 'bg-blue-50 border-blue-600' 
          : 'bg-red-50 border-red-600'"
      >

        <!-- NOMOR -->
        <p class="text-xs font-semibold lg:text-lg"
           :class="q.is_correct ? 'text-blue-700' : 'text-red-700'">
          Soal {{ q.number }}
        </p>

        <!-- QUESTION -->
        <p class="text-md text-gray-900 leading-snug mt-1 lg:text-[1.4rem]" v-html="q.question">
        </p>

        <!-- STATUS -->
        <p class="text-sm font-bold mt-4"
           :class="q.is_correct ? 'text-blue-700' : 'text-red-700'">
          {{ q.is_correct ? 'Jawaban Benar' : 'Jawaban Salah' }}
        </p>

        <!-- YOUR ANSWER -->
        <div class="mt-4">
          <p class="text-md text-gray-700 font-semibold">Jawaban Kamu:</p>

          <div
            class="mt-1 px-4 py-3 bg-white rounded-xl border text-sm lg:text-[1.2rem]"
            :class="q.is_correct ? 'border-blue-400 text-blue-700' : 'border-red-400 text-red-700'"
          >
            <span class="mr-1">{{ q.answer.your_answer.answer || '-' }}.</span>
            <span v-html="q.answer.your_answer.answer_text"></span>
          </div>
        </div>

        <!-- REAL ANSWER -->
        <div class="mt-4">
          <p class="text-md text-gray-700 font-semibold">Jawaban Sebenarnya:</p>

          <div
            class="bg-white rounded-xl border px-4 py-4 mt-1 "
            :class="q.is_correct ? 'border-blue-400' : 'border-red-400'"
          >
            <div class="text-md text-gray-900 lg:text-[1.2rem]">
              <span class="mr-1">{{ q.answer.real_answer.answer }}.</span>
              <span v-html="q.answer.real_answer.answer_text"></span>
            </div>

            <p class="text-md text-gray-600 mt-2 leading-snug lg:text-[1.2rem]" v-html="q.answer.real_answer.explanation">
            </p>
          </div>
        </div>

      </div>

        <!-- ====================== STICKY BOTTOM BUTTON ======================= -->
    <a href="/dashboard"
    class="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 lg:p-6"
    >
    <button
        class="w-full lg:w-[400px] mx-auto bg-blue-600 text-white py-3 lg:py-4 rounded-2xl text-center text-sm lg:text-lg font-bold active:scale-95 transition"
    >
        KEMBALI
    </button>
    </a>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import questionService from "../services/question.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";

const route = useRoute();
const res = ref([]);
const isLoading = ref(false);

const fetchAnswers = async () => {
  const queryResultId = route.params.query_result_id;
  if (!queryResultId) return;

  isLoading.value = true;
  try {
    const response = await questionService.getAnswers(queryResultId);
    if (response.status && response.data) {
      res.value = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch answers:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAnswers();
});

function goBack() {
  window.history.back()
}
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
