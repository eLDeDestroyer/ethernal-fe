<template>
  <div class="min-h-screen bg-gray-100">

    <!-- HEADER -->
    <div class="fixed top-0 left-0 right-0 z-30 bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 class="font-bold text-lg">Latihan Soal</h2>

      <div class="flex items-center gap-2">
        <button
          v-for="(pdf, i) in pdfList"
          :key="i"
          @click="switchPdf(i)"
          class="px-3 py-1 rounded-lg text-sm font-bold border"
          :class="activePdfIndex === i
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white'"
        >
          {{ pdf.name }}
        </button>
      </div>
    </div>

    <div class="h-20"></div>

    <!-- MAIN CONTENT -->
    <div class="flex flex-col lg:flex-row gap-4 px-4 lg:px-6">

      <!-- PDF VIEWER -->
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
        <p class="font-bold text-lg text-center mb-2">Jawaban</p>
        
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-center">
          <p class="text-sm text-gray-600 font-semibold uppercase tracking-wider">Total Skor</p>
          <p class="text-3xl font-extrabold text-blue-700">
            {{ result.score }} <span class="text-lg text-gray-500 font-bold">/ {{ result.question }}</span>
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="num in result.questions.length"
            :key="num"
            :class="[
              'border rounded-xl p-3',
              result.questions[num - 1]?.is_correct ? 'border-green-500 border-[3px]' : 'border-red-700 border-[3px]'
            ]"
          >
            <div class="flex justify-between mb-2">
              <span class="font-bold">Soal {{ num }}</span>
              <span v-if="result.questions[num - 1].your_answer" class="text-green-600 font-bold">
                {{ result.questions[num - 1].your_answer }}
              </span>
            </div>

            <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="opt in options"
                  :key="opt"
                  disabled
                  class="py-2 px-4 rounded-lg font-bold border mr-2 mb-2 transition-colors"
                  :class="getOptionClass(num - 1, opt)"
                >
                  {{ opt }}
                </button>

            </div>
          </div>
        </div>

        <a href="/dashboard" class="block mt-6">
          <button class="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-md hover:bg-blue-700 transition shadow-lg">
            KEMBALI KE DASHBOARD
          </button>
        </a>
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

          <p class="text-center font-bold text-lg mb-2">
            Pilih Soal & Jawaban
          </p>

          <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-center">
            <p class="text-sm text-gray-600 font-semibold uppercase tracking-wider">Total Skor</p>
            <p class="text-3xl font-extrabold text-blue-700">
              {{ result.score }} <span class="text-lg text-gray-500 font-bold">/ {{ result.question }}</span>
            </p>
          </div>

          <div class="space-y-4">
            <div
              v-for="num in result.questions.length"
              :key="num"
              :class="[
                'border rounded-xl p-3',
                result.questions[num - 1]?.is_correct ? 'border-green-500 border-[3px]' : 'border-red-700 border-[3px]'
              ]"
            >
              <div class="flex justify-between mb-2">
                <span class="font-bold">Soal {{ num }}</span>
                <span v-if="result.questions[num - 1].your_answer" class="text-green-600 font-bold">
                  {{ result.questions[num - 1].your_answer }}
                </span>
              </div>

              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="opt in options"
                  :key="opt"
                  disabled
                  class="py-2 px-4 rounded-lg font-bold border mr-2 mb-2 transition-colors"
                  :class="getOptionClass(num - 1, opt)"
                >
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>

          <a href="/dashboard" class="block mt-6 mb-safe">
            <button class="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-lg">
              KEMBALI KE DASHBOARD
            </button>
          </a>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import * as pdfjsLib from "pdfjs-dist";

/* ================= PDF LIST ================= */
const pdfList = [
  {
    name: "Paket 1",
    url: "https://fcvhrvhnlunssvyegxar.supabase.co/storage/v1/object/sign/ethernal/PBM/PBM3.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iODVmYTFjNS1mYTE3LTQ4YjItYjg1Ni04ODMzZjQxN2UyNzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldGhlcm5hbC9QQk0vUEJNMy5wZGYiLCJpYXQiOjE3NjYxMTk1MzAsImV4cCI6MTc5NzY1NTUzMH0.nBHnF9jq6B3X1pBb45JPdrM2bAq_Pp0Vw3MaA1fz540",
  },
  {
    name: "Paket 2",
    url: "https://fcvhrvhnlunssvyegxar.supabase.co/storage/v1/object/sign/ethernal/PBM/PBM3.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iODVmYTFjNS1mYTE3LTQ4YjItYjg1Ni04ODMzZjQxN2UyNzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldGhlcm5hbC9QQk0vUEJNMy5wZGYiLCJpYXQiOjE3NjYxMTk1MzAsImV4cCI6MTc5NzY1NTUzMH0.nBHnF9jq6B3X1pBb45JPdrM2bAq_Pp0Vw3MaA1fz540",
  },
];

const activePdfIndex = ref(0);
const totalPages = ref(0);
let pdfDoc = null;

const renderedPages = new Set();
const pdfContainer = ref(null);
const pageWrappers = ref([]);
let observer = null;

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

/* ================= RESULT ================= */
const result = ref({
  score: 9,
  question: 10,
  questions: [
    { your_answer: "B", real_answer: "A", is_correct: false },
    { your_answer: "A", real_answer: "A", is_correct: true },
    { your_answer: "C", real_answer: "C", is_correct: true },
    { your_answer: "D", real_answer: "B", is_correct: false },
    { your_answer: "E", real_answer: "E", is_correct: true },
    { your_answer: "A", real_answer: "A", is_correct: true },
    { your_answer: "B", real_answer: "C", is_correct: false },
    { your_answer: "C", real_answer: "C", is_correct: true },
    { your_answer: "D", real_answer: "D", is_correct: true },
    { your_answer: "A", real_answer: "A", is_correct: true },
  ],
});

function submitAnswers() {
  console.log("Submit answers:", answers);
}

function getOptionClass(index, opt) {
  const q = result.value.questions[index];
  if (!q) return "bg-white";

  // Jika jawaban BENAR
  if (q.is_correct) {
    // Tombol jawaban user (yang juga real answer) -> HIJAU
    if (opt === q.your_answer) {
      return "bg-green-500 text-white border-green-500";
    }
  } 
  // Jika jawaban SALAH
  else {
    // Tombol jawaban user (salah) -> MERAH
    if (opt === q.your_answer) {
      return "bg-red-500 text-white border-red-500";
    }
    // Tombol jawaban asli -> HIJAU
    if (opt === q.real_answer) {
      return "bg-green-500 text-white border-green-500";
    }
  }

  // Sisanya putih
  return "bg-white";
}


/* ================= PDF RENDER ================= */
async function renderPage(pageNum, canvas) {
  if (!pdfDoc || renderedPages.has(pageNum) || !canvas) return;
  renderedPages.add(pageNum);

  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({
    scale: window.innerWidth < 768 ? 1.5 : 3,
  });

  const ctx = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;
}

function setupIntersectionObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNum = Number(entry.target.dataset.page);
          const canvas = entry.target.querySelector("canvas");
          renderPage(pageNum, canvas);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: pdfContainer.value,
      rootMargin: "200px",
      threshold: 0.01,
    }
  );

  pageWrappers.value.forEach((el) => observer.observe(el));
}

/* ================= LOAD PDF ================= */
async function loadPdf() {
  renderedPages.clear();
  totalPages.value = 0;

  if (observer) observer.disconnect();

  pdfDoc = await pdfjsLib
    .getDocument(pdfList[activePdfIndex.value].url)
    .promise;

  totalPages.value = pdfDoc.numPages;

  await new Promise((r) => setTimeout(r, 50));
  setupIntersectionObserver();
}

/* ================= ACTION ================= */
function switchPdf(index) {
  if (index === activePdfIndex.value) return;
  activePdfIndex.value = index;
  loadPdf();
}

function selectAnswer(num, opt) {
  answers[num] = opt;
  currentQuestion.value = num;
}

function openSheet() {
  showSheet.value = true;
}

/* ================= INIT ================= */
onMounted(async () => {
  timerInterval = setInterval(() => seconds.value++, 1000);

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  await loadPdf();
});

onUnmounted(() => {
  clearInterval(timerInterval);
  if (observer) observer.disconnect();
});
</script>