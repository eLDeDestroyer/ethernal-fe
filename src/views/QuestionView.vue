<template>
  <div class="min-h-screen bg-gray-100">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- HEADER -->
    <div
      class="fixed top-0 left-0 right-0 z-30 bg-white shadow px-6 py-4 flex justify-between items-center"
    >
      <h2 class="font-bold text-lg">Latihan Soal</h2>
      <span class="font-semibold text-red-600 text-lg">
        ⏱ {{ formattedTime }}
      </span>
    </div>

    <div class="h-20"></div>

    <!-- MAIN CONTENT -->
    <div
      class="flex flex-col lg:flex-row gap-4 px-4 lg:px-6 h-[calc(100vh-6rem)] lg:h-[85vh]"
    >
      <!-- PDF -->
      <div
        ref="pdfContainer"
        class="flex-1 relative bg-gray-300 rounded-xl overflow-hidden h-full"
      >
        <!-- ZOOM CONTROL (DESKTOP) -->
        <div
          class="hidden lg:flex absolute top-2 right-2 z-20 gap-2 bg-white/90 rounded-lg p-1 shadow"
        >
          <button @click="zoomOut" class="px-3 py-1 font-bold">−</button>
          <span class="px-2 font-semibold">{{ scaleDesktop.toFixed(1) }}x</span>
          <button @click="zoomIn" class="px-3 py-1 font-bold">+</button>
        </div>

        <!-- SCROLL AREA -->
        <div class="absolute inset-0 overflow-y-auto pt-12">
          <div
            v-for="pageNum in totalPages"
            :key="pageNum"
            :data-page="pageNum"
            class="min-h-[500px] flex justify-center items-start bg-gray-400/10 mb-2 page-wrapper"
          >
            <!-- MOBILE -->
            <canvas class="block shadow-md lg:hidden" data-type="mobile" />
            <!-- DESKTOP -->
            <canvas class="hidden lg:block shadow-md" data-type="desktop" />
          </div>
        </div>
      </div>

      <!-- DESKTOP ANSWER PANEL -->
      <div
        class="hidden lg:block w-[360px] bg-white rounded-xl shadow p-4 h-full overflow-y-auto"
      >
        <p class="font-bold text-lg text-center mb-4">Jawaban</p>

        <div class="space-y-4">
          <div
            v-for="num in totalQuestions"
            :key="num"
            class="border rounded-xl p-3"
            :class="currentQuestion === num
              ? 'border-blue-600'
              : 'border-gray-200'"
          >
            <div class="flex justify-between mb-2">
              <span class="font-bold">Soal {{ num }}</span>
              <span
                v-if="answers[num]"
                class="text-green-600 font-bold"
              >
                {{ answers[num] }}
              </span>
            </div>

            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="opt in options"
                :key="opt"
                @click="selectAnswer(num, opt)"
                class="py-2 rounded-lg font-bold border"
                :class="answers[num] === opt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white'"
              >
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <button
          @click="submitAnswers"
          class="mt-6 w-full py-4 rounded-xl bg-blue-600 text-white font-bold"
        >
          KUMPULKAN
        </button>
      </div>
    </div>

    <!-- MOBILE BUTTON -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30 lg:hidden"
    >
      <button
        @click="openSheet"
        class="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold"
      >
        JAWAB & NAVIGASI
      </button>
    </div>

    <!-- MOBILE ANSWER SHEET -->
    <div
      v-if="isSheetOpen"
      class="fixed inset-0 z-50 bg-black/40 lg:hidden"
      @click.self="closeSheet"
    >
      <div
        class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <p class="font-bold text-lg">Jawaban</p>
          <button @click="closeSheet" class="text-xl">✕</button>
        </div>

        <div class="space-y-4">
          <div
            v-for="num in totalQuestions"
            :key="num"
            class="border rounded-xl p-3"
          >
            <div class="flex justify-between mb-2">
              <span class="font-bold">Soal {{ num }}</span>
              <span
                v-if="answers[num]"
                class="text-green-600 font-bold"
              >
                {{ answers[num] }}
              </span>
            </div>

            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="opt in options"
                :key="opt"
                @click="selectAnswer(num, opt)"
                class="py-2 rounded-lg font-bold border"
                :class="answers[num] === opt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white'"
              >
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <button
          @click="submitAnswers"
          class="mt-6 w-full py-4 rounded-xl bg-blue-600 text-white font-bold"
        >
          KUMPULKAN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick, markRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as pdfjsLib from "pdfjs-dist";
import questionService from "../services/question.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";

const route = useRoute();
const router = useRouter();

/* ================= STATE ================= */
const isLoading = ref(true);
const totalQuestions = ref(0);
const totalPages = ref(0);
let pdfDoc = null;
const renderedPages = new Set();
const pdfContainer = ref(null);

/* ================= MOBILE SHEET ================= */
const isSheetOpen = ref(false);
const openSheet = () => (isSheetOpen.value = true);
const closeSheet = () => (isSheetOpen.value = false);

/* ================= ZOOM ================= */
const scaleDesktop = ref(2.2);
const MIN_SCALE = 1.0;
const MAX_SCALE = 3.5;

/* ================= SOAL ================= */
const currentQuestion = ref(1);
const options = ["A", "B", "C", "D", "E"];
const answers = reactive({});

/* ================= TIMER ================= */
const seconds = ref(0);
let timerInterval = null;

const formattedTime = computed(() => {
  const h = Math.floor(seconds.value / 3600);
  const m = Math.floor((seconds.value % 3600) / 60);
  const s = seconds.value % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
});

/* ================= FETCH ================= */
async function fetchQuestions() {
  const topicId = route.params.topic_id;
  if (!topicId) return;

  const res = await questionService.getQuestions(topicId);
  if (res.status && res.data?.length) {
    totalQuestions.value = res.data[0].total_question || 0;
    if (res.data[0].pdf_question_path) {
      await loadPdf(res.data[0].pdf_question_path);
    }
  }
  isLoading.value = false;
}

async function loadPdf(url) {
  const task = pdfjsLib.getDocument({ url });
  pdfDoc = markRaw(await task.promise);
  totalPages.value = pdfDoc.numPages;
  await nextTick();
  setupObserver();
}

/* ================= RENDER ================= */
async function renderPage(pageNum, wrapper) {
  if (!pdfDoc || renderedPages.has(pageNum)) return;
  renderedPages.add(pageNum);

  const page = await pdfDoc.getPage(pageNum);
  const dpr = window.devicePixelRatio || 1;

  const mobileCanvas = wrapper.querySelector('canvas[data-type="mobile"]');
  if (mobileCanvas) {
    const ctx = mobileCanvas.getContext("2d");
    const width = pdfContainer.value.clientWidth;
    const base = page.getViewport({ scale: 1 });
    const scale = width / base.width;
    const viewport = page.getViewport({ scale: scale * dpr });

    mobileCanvas.width = viewport.width;
    mobileCanvas.height = viewport.height;
    mobileCanvas.style.width = `${width}px`;
    mobileCanvas.style.height = `${viewport.height / dpr}px`;

    await page.render({ canvasContext: ctx, viewport }).promise;
  }

  const desktopCanvas = wrapper.querySelector('canvas[data-type="desktop"]');
  if (desktopCanvas) {
    const ctx = desktopCanvas.getContext("2d");
    const viewport = page.getViewport({
      scale: scaleDesktop.value * dpr,
    });

    desktopCanvas.width = viewport.width;
    desktopCanvas.height = viewport.height;
    desktopCanvas.style.width = `${viewport.width / dpr}px`;
    desktopCanvas.style.height = `${viewport.height / dpr}px`;

    await page.render({ canvasContext: ctx, viewport }).promise;
  }
}

/* ================= OBSERVER ================= */
let observer = null;

function setupObserver() {
  observer?.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNum = Number(entry.target.dataset.page);
          renderPage(pageNum, entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { root: pdfContainer.value, rootMargin: "200px" }
  );

  document
    .querySelectorAll(".page-wrapper")
    .forEach((el) => observer.observe(el));
}

/* ================= ZOOM ================= */
function rerenderPdf() {
  renderedPages.clear();
  observer?.disconnect();
  setupObserver();
}

const zoomIn = () => {
  scaleDesktop.value = Math.min(scaleDesktop.value + 0.2, MAX_SCALE);
  rerenderPdf();
};
const zoomOut = () => {
  scaleDesktop.value = Math.max(scaleDesktop.value - 0.2, MIN_SCALE);
  rerenderPdf();
};

/* ================= ACTION ================= */
function selectAnswer(num, opt) {
  answers[num] = opt;
  currentQuestion.value = num;
}

async function submitAnswers() {
  isLoading.value = true;
  clearInterval(timerInterval);

  try {
    const payload = {
      uuid: route.params.question_id,
      answer: Object.keys(answers).map((k) => ({
        number: Number(k),
        answer: answers[k],
      })),
    };

    const res = await questionService.submitAnswers(payload);
    if (res?.status) {
      router.push(`/answer/${payload.uuid}`);
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    timerInterval = setInterval(() => seconds.value++, 1000);
  } finally {
    isLoading.value = false;
  }
}

/* ================= INIT ================= */
onMounted(async () => {
  timerInterval = setInterval(() => seconds.value++, 1000);

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  await fetchQuestions();
});

onUnmounted(() => {
  clearInterval(timerInterval);
  observer?.disconnect();
});
</script>
