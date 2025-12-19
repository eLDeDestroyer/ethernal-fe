<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 pb-32 overflow-y-auto">
    <LoadingOverlay :isLoading="isFetching || isLoading" />

    <!-- ===== HEADER FIXED ===== -->
    <div
      class="fixed top-0 left-0 right-0 z-30 bg-white shadow-md border-b border-gray-200 px-4 py-3 flex items-center justify-between"
    >
      <h2 class="text-lg lg:text-[1.7rem] font-bold text-gray-800">
        Latihan Soal
      </h2>

      <div class="text-sm lg:text-[1.5rem] font-semibold text-blue-600">
        {{ formattedTime }}
      </div>
    </div>

    <!-- SPACE HEADER -->
    <div class="h-20"></div>

    <!-- ===== LIST SOAL ===== -->
    <div class="px-4 space-y-6 lg:p-10">
      <div
        v-for="(q, idx) in res"
        :key="idx"
        class="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 lg:mx-[10rem]"
      >
        <!-- NOMOR -->
        <p class="text-xs font-semibold text-blue-600 mb-1 lg:text-lg">
          Soal {{ q.number }}
        </p>

        <!-- SOAL -->
        <h3 class="text-md  text-gray-900 leading-snug lg:text-[1.3rem] mb-[2rem]" v-html="q.question">
        </h3>

        <!-- JAWABAN -->
        <div class="mt-3 space-y-3">
          <div
            v-for="(ans, aidx) in q.answer"
            :key="aidx"
            @click="selectAnswer(q.number, aidx)"
            class="p-4 rounded-xl border transition cursor-pointer flex items-start gap-3"
            :class="selected[q.number] === aidx 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-gray-800 border-gray-200 active:scale-[0.98]'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-xl font-bold">
              {{ ans.answer }}
            </div>

            <div class="leading-snug lg:text-[1.2rem]">
              <p class="text-sm lg:text-[1.2rem]" v-html="ans.answer_text">
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ====================== STICKY BOTTOM BUTTON ======================= -->
<div
  class="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 lg:p-6"
>
  <button
    @click="submit"
    :disabled="isLoading"
    class="w-full lg:w-[400px] mx-auto bg-blue-600 text-white py-3 lg:py-4 rounded-2xl text-center text-sm lg:text-lg font-bold active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {{ isLoading ? 'MENGUMPULKAN...' : 'KUMPULKAN' }}
  </button>
</div>


  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import questionService from "../services/question.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";

const route = useRoute();
const res = ref([]);
// isLoading is already declared for submit, reuse it or ensure scope is correct.
// Actually isLoading was defined inside script setup later. Let's merge declarations.
// Wait, I see `const isLoading = ref(false);` in the previous SUBMIT BUTTON section (lines 131+).
// I should move it up or use a separate loading state for fetch if I want to distinguishing.
// But user requested loading for "fetch". Let's use `isFetching` or similar if `isLoading` is reserved for submit.
// Or just reuse `isLoading`.
// Let's check where `isLoading` is defined. It is defined near submit.
// Ideally I should move `isLoading` to top level.

// I will re-declare it at the top and remove the later declaration if possible, OR just declare it at the top and let the later one be a duplicate (which is bad).
// Better to check file content again.
// I will just add `const isFetching = ref(false)` for data fetching to be safe and clear.
const isFetching = ref(false);

const fetchQuestions = async () => {
  const topicId = route.params.topic_id;
  if (!topicId) return;

  isFetching.value = true;
  try {
    const response = await questionService.getQuestions(topicId);
    if (response.status && response.data) {
       res.value = response.data.map(q => ({
         ...q,
       }));
    }
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  } finally {
    isFetching.value = false;
  }
};

/* ====================================================
   STATE JAWABAN
==================================================== */
const selected = reactive({})

function selectAnswer(questionNumber, answerIndex) {
  selected[questionNumber] = answerIndex
}

/* ====================================================
   WAKTU TIMER
==================================================== */
const timePassed = ref(0)

onMounted(() => {
  fetchQuestions();
  setInterval(() => {
    timePassed.value++
  }, 1000)
})

const formattedTime = computed(() => {
  const m = Math.floor(timePassed.value / 60).toString().padStart(2, "0")
  const s = (timePassed.value % 60).toString().padStart(2, "0")
  return `${m}:${s}`
})

/* ====================================================
   SUBMIT BUTTON
==================================================== */
const isLoading = ref(false);
const router = useRouter();

const submit = async () => {
  if (isLoading.value) return;
  
  const questionId = route.params.question_id;
  if (!questionId) {
      alert("Missing question session ID");
      return;
  }

  // Format answers
  const formattedAnswers = [];
  res.value.forEach(q => {
      const selectedIdx = selected[q.number];
      if (selectedIdx !== undefined && q.answer[selectedIdx]) {
          formattedAnswers.push({
              number: q.number,
              answer: q.answer[selectedIdx].answer
          });
      }
  });

  isLoading.value = true;
  try {
      const payload = {
          uuid: questionId,
          answer: formattedAnswers
      };
      
      const response = await questionService.submitAnswers(payload);
      if (response.status) {
          // Redirect to result page
           router.push({ 
             name: 'answer', 
             params: { 
               query_result_id: response.data.question_result_id 
             } 
           });
      } else {
           alert(response.message || "Gagal mengumpulkan jawaban");
      }
  } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengumpulkan jawaban");
  } finally {
      isLoading.value = false;
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
