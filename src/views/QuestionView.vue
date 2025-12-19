<template>
  <div class="min-h-screen bg-gray-100">

    <!-- HEADER -->
    <div class="fixed top-0 left-0 right-0 z-30 bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 class="font-bold text-lg">Latihan Soal</h2>
      <span class="font-semibold text-red-600 text-lg">
        ⏱ {{ formattedTime }}
      </span>
    </div>

    <div class="h-20"></div>

    <!-- MAIN CONTENT -->
    <div class="flex flex-col lg:flex-row gap-4 px-4 lg:px-6">

      <!-- PDF -->
      <div
        ref="pdfContainer"
        class="flex-1 h-[80vh] overflow-y-auto bg-gray-300 rounded-xl"
      >
        <div
          v-for="pageNum in totalPages"
          :key="pageNum"
          :data-page="pageNum"
          ref="pageWrappers"
          class="min-h-[500px] flex justify-center items-center bg-gray-400/10 mb-2"
        >
          <canvas class="w-full block shadow-md" />
        </div>
      </div>

      <!-- DESKTOP ANSWER PANEL -->
      <div class="hidden lg:block w-[360px] bg-white rounded-xl shadow p-4 h-[80vh] overflow-y-auto">
        <p class="font-bold text-lg text-center mb-4">Jawaban</p>

        <div class="space-y-4">
          <div
            v-for="num in 20"
            :key="num"
            class="border rounded-xl p-3"
            :class="currentQuestion === num ? 'border-blue-600' : 'border-gray-200'"
          >
            <div class="flex justify-between mb-2">
              <span class="font-bold">Soal {{ num }}</span>
              <span v-if="answers[num]" class="text-green-600 font-bold">
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
          class="mt-6 w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-md"
        >
          KUMPULKAN
        </button>
      </div>

    </div>

    <!-- MOBILE BUTTON -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30 lg:hidden">
      <button
        @click="openSheet"
        class="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm"
      >
        JAWAB & NAVIGASI
      </button>
    </div>

    <!-- MOBILE BOTTOM SHEET -->
    <transition name="fade">
      <div
        v-if="showSheet"
        class="fixed inset-0 bg-black/40 z-40 flex items-end lg:hidden"
        @click.self="showSheet = false"
      >
        <div class="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">

          <p class="text-center font-bold text-lg mb-4">
            Pilih Soal & Jawaban
          </p>

          <div class="space-y-4">
            <div
              v-for="num in 20"
              :key="num"
              class="border rounded-xl p-3"
            >
              <div class="flex justify-between mb-2">
                <span class="font-bold">Soal {{ num }}</span>
                <span v-if="answers[num]" class="text-green-600 font-bold">
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
            class="mt-6 w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm"
          >
            KUMPULKAN
          </button>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import * as pdfjsLib from "pdfjs-dist";

/* ================= PDF ================= */
const pdfUrl =
  "https://fcvhrvhnlunssvyegxar.supabase.co/storage/v1/object/sign/ethernal/PBM/PBM3.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iODVmYTFjNS1mYTE3LTQ4YjItYjg1Ni04ODMzZjQxN2UyNzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldGhlcm5hbC9QQk0vUEJNMy5wZGYiLCJpYXQiOjE3NjYxMTk1MzAsImV4cCI6MTc5NzY1NTUzMH0.nBHnF9jq6B3X1pBb45JPdrM2bAq_Pp0Vw3MaA1fz540";

const totalPages = ref(0);
let pdfDoc = null;
const renderedPages = new Set();
const pdfContainer = ref(null);

/* ================= SOAL ================= */
const currentQuestion = ref(1);
const showSheet = ref(false);
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

/* ================= RENDER PDF ================= */
const pageWrappers = ref([]);


async function renderPage(pageNum, canvas) {
  if (!pdfDoc || renderedPages.has(pageNum) || !canvas) return;
  renderedPages.add(pageNum);

  try {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({
      scale: window.innerWidth < 768 ? 1.5 : 3.0,
    });

    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
  } catch (err) {
    console.error(`Error rendering page ${pageNum}:`, err);
  }
}

/* ================= ACTION ================= */
function openSheet() {
  showSheet.value = true;
}

function selectAnswer(num, opt) {
  answers[num] = opt;
  currentQuestion.value = num;
}

function submitAnswers() {
  clearInterval(timerInterval);
  console.log("Jawaban:", answers);
  console.log("Waktu:", formattedTime.value);
  showSheet.value = false;
}

/* ================= INIT ================= */
let observer = null;

function setupIntersectionObserver() {
  if (!pdfContainer.value) return; 

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNum = Number(entry.target.dataset.page);
          const canvas = entry.target.querySelector("canvas");
          if (pageNum && canvas) {
            renderPage(pageNum, canvas);
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      root: pdfContainer.value,
      rootMargin: "200px",
      threshold: 0.01, 
    }
  );

  // Observe all page wrappers
  if (pageWrappers.value) {
    pageWrappers.value.forEach((el) => {
      if (el) observer.observe(el);
    });
  }
}

onMounted(async () => {
  timerInterval = setInterval(() => {
    seconds.value++;
  }, 1000);

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  try {
    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    totalPages.value = pdfDoc.numPages;

    // Use nextTick equivalent manually or just wait small macrotask
    await new Promise((resolve) => setTimeout(resolve, 50));
    setupIntersectionObserver();
  } catch (error) {
    console.error("Error loading PDF:", error);
  }
});

onUnmounted(() => {
  clearInterval(timerInterval);
  if (observer) {
    observer.disconnect();
  }
});
</script>
