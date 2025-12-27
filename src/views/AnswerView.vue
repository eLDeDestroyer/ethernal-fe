<template>
  <div class="min-h-screen bg-gray-100">
    <LoadingOverlay :isLoading="isLoading" />

    <!-- HEADER -->
    <div
      class="fixed top-0 left-0 right-0 z-30 bg-white shadow px-4 lg:px-6 py-4 flex justify-between items-center lg:pl-24 lg:pr-10"
    >
      <h2 class="font-bold text-lg truncate mr-2">Latihan Soal</h2>

      <div class="flex items-center gap-2 shrink-0">
        <button
          v-for="(pdf, i) in pdfList"
          :key="i"
          @click="activePdfIndex = i"
          class="px-3 py-1 rounded-lg text-sm font-bold border"
          :class="
            activePdfIndex === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white'
          "
        >
          {{ pdf.name }}
        </button>
      </div>
    </div>

    <div class="h-20"></div>

    <!-- MAIN CONTENT -->
    <div
      class="flex flex-col lg:flex-row gap-4 px-4 lg:px-6 h-[calc(100vh-6rem)] lg:h-[85vh]"
    >
      <!-- PDF VIEWER CONTAINER -->
      <div
        class="flex-1 relative bg-gray-300 rounded-xl overflow-hidden h-full"
      >
        <!-- Render Multiple PDF Viewers (Preloaded) -->
        <div
          v-for="(pdf, index) in pdfList"
          :key="index"
          v-show="activePdfIndex === index"
          class="absolute inset-0 overflow-y-auto"
        >
          <div
            v-for="pageNum in pdfStates[index]?.numPages || 0"
            :key="pageNum"
            :data-page="pageNum"
            :data-pdf-index="index"
            class="min-h-[500px] flex justify-center items-center bg-gray-400/10 mb-2 page-wrapper"
          >
            <canvas class="w-full block shadow-md" />
          </div>
        </div>
      </div>

      <!-- DESKTOP ANSWER PANEL -->
      <div
        class="hidden lg:block w-[360px] bg-white rounded-xl shadow p-4 h-full overflow-y-auto"
      >
        <p class="font-bold text-lg text-center mb-2">Jawaban</p>

        <div
          class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-center"
        >
          <p
            class="text-sm text-gray-600 font-semibold uppercase tracking-wider"
          >
            Total Skor
          </p>
          <p class="text-3xl font-extrabold text-blue-700">
            {{ result.score }}
            <span class="text-lg text-gray-500 font-bold"
              >/ {{ result.question }}</span
            >
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="num in result.questions.length"
            :key="num"
            :class="[
              'border rounded-xl p-3',
              result.questions[num - 1]?.is_correct
                ? 'border-green-500 border-[3px]'
                : 'border-red-700 border-[3px]',
            ]"
          >
            <div class="flex justify-between mb-2">
              <span class="font-bold">Soal {{ num }}</span>
              <span
                v-if="result.questions[num - 1].your_answer"
                :class="
                  result.questions[num - 1].is_correct
                    ? 'text-green-600 font-bold'
                    : 'text-red-600 font-bold'
                "
              >
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
          <button
            class="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-md hover:bg-blue-700 transition shadow-lg"
          >
            KEMBALI KE DASHBOARD
          </button>
        </a>
      </div>
    </div>

    <!-- MOBILE BUTTON -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30 lg:hidden"
    >
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
        <div
          class="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto"
        >
          <p class="text-center font-bold text-lg mb-2">Pilih Soal & Jawaban</p>

          <div
            class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-center"
          >
            <p
              class="text-sm text-gray-600 font-semibold uppercase tracking-wider"
            >
              Total Skor
            </p>
            <p class="text-3xl font-extrabold text-blue-700">
              {{ result.score }}
              <span class="text-lg text-gray-500 font-bold"
                >/ {{ result.question }}</span
              >
            </p>
          </div>

          <div class="space-y-4">
            <div
              v-for="num in result.questions.length"
              :key="num"
              :class="[
                'border rounded-xl p-3',
                result.questions[num - 1]?.is_correct
                  ? 'border-green-500 border-[3px]'
                  : 'border-red-700 border-[3px]',
              ]"
            >
              <div class="flex justify-between mb-2">
                <span class="font-bold">Soal {{ num }}</span>
                <span
                  v-if="result.questions[num - 1].your_answer"
                  :class="
                    result.questions[num - 1].is_correct
                      ? 'text-green-600 font-bold'
                      : 'text-red-600 font-bold'
                  "
                >
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
            <button
              class="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-lg"
            >
              KEMBALI KE DASHBOARD
            </button>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, markRaw } from "vue";
import { useRoute } from "vue-router";
import * as pdfjsLib from "pdfjs-dist";
import questionService from "../services/question.service";
import LoadingOverlay from "../components/LoadingOverlay.vue";

const route = useRoute();

/* ================= PDF LIST ================= */
const pdfList = ref([]);
const activePdfIndex = ref(0);

// Array of states for each PDF
const pdfStates = ref([]);
// { doc: PDFDocumentProxy, numPages: number, renderedPages: Set<number> }

let observer = null;

/* ================= SOAL ================= */
const currentQuestion = ref(1);
const showSheet = ref(false);
const options = ["A", "B", "C", "D", "E"];
const answers = reactive({});

/* ================= RESULT ================= */
const result = ref({
  score: 0,
  question: 0,
  questions: [],
});
const isLoading = ref(true);
const errorMsg = ref("");

/* ================= FETCH DATA ================= */
async function fetchAnswerData() {
  const queryResultId = route.params.query_result_id;
  if (!queryResultId) {
    errorMsg.value = "Missing query_result_id";
    isLoading.value = false;
    return;
  }

  try {
    const json = await questionService.getAnswers(queryResultId);

    if (json.status) {
      // 1. Set Result
      result.value = {
        score: json.data.score,
        question: json.data.question,
        questions: json.data.questions || [],
      };

      // 2. Set PDF List
      const pdfs = [];
      if (json.data.pdf?.pdf_question_path) {
        pdfs.push({
          name: "Soal",
          url: json.data.pdf.pdf_question_path,
        });
      }
      if (json.data.pdf?.pdf_answer_path) {
        pdfs.push({
          name: "Pembahasan",
          url: json.data.pdf.pdf_answer_path,
        });
      }
      pdfList.value = pdfs;

      // Initialize states
      pdfStates.value = pdfs.map(() => ({
        doc: null,
        numPages: 0,
        renderedPages: new Set(),
      }));

      // 3. Load ALL PDFs concurrently
      if (pdfs.length > 0) {
        await Promise.all(pdfs.map((_, i) => loadPdf(i)));
      }
    } else {
      errorMsg.value = json.message || "Failed to retrieve answer details";
    }
  } catch (err) {
    console.error(err);
    errorMsg.value = "Network error";
  } finally {
    isLoading.value = false;

    // Setup observer after DOM update
    nextTick(() => {
      setupIntersectionObserver();
    });
  }
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
async function renderPage(pdfIndex, pageNum, canvas) {
  const state = pdfStates.value[pdfIndex];
  if (!state || !state.doc || state.renderedPages.has(pageNum) || !canvas)
    return;

  // Mark as rendering/rendered to prevent duplicate calls
  state.renderedPages.add(pageNum);

  try {
    const page = await state.doc.getPage(pageNum);
    const viewport = page.getViewport({
      scale: window.innerWidth < 768 ? 1.5 : 3,
    });

    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
  } catch (e) {
    console.error(`Error rendering PDF ${pdfIndex} page ${pageNum}`, e);
    state.renderedPages.delete(pageNum); // Retry on failure if needed
  }
}

function setupIntersectionObserver() {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNum = Number(entry.target.dataset.page);
          const pdfIndex = Number(entry.target.dataset.pdfIndex);

          // Validate parsing
          if (isNaN(pageNum) || isNaN(pdfIndex)) return;

          const canvas = entry.target.querySelector("canvas");
          renderPage(pdfIndex, pageNum, canvas);

          // Optionally unobserve if we only need to render once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Observe viewport interaction; we can't effectively scope to one container easily if multiple exist hidden
      root: null,
      rootMargin: "200px",
      threshold: 0.01,
    }
  );

  // Observe all page wrappers across all PDF containers
  const pages = document.querySelectorAll(".page-wrapper");
  pages.forEach((el) => observer.observe(el));
}

/* ================= LOAD PDF ================= */
async function loadPdf(index) {
  const item = pdfList.value[index];
  if (!item) return;

  try {
    const doc = await pdfjsLib.getDocument(item.url).promise;

    // Update state
    // markRaw PREVENTS Vue from making this object reactive
    pdfStates.value[index].doc = markRaw(doc);
    pdfStates.value[index].numPages = doc.numPages;
  } catch (e) {
    console.error(`Error loading PDF index ${index}:`, e);
  }
}

function openSheet() {
  showSheet.value = true;
}

/* ================= INIT ================= */
onMounted(async () => {
  // Set worker globally once
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
  }

  await fetchAnswerData();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>
