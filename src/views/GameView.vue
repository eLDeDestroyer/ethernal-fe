<template>
  <div
    class="min-h-screen flex items-center lg:items-start justify-center bg-linear-to-b from-blue-50 to-blue-100 p-4 lg:pt-20 lg:px-12"
  >
    <div
      class="p-4 w-full relative lg:border-2 lg:border-blue-300 lg:rounded-lg lg:w-[70rem]"
    >
      <AlertPopup
        :show="alertState.show"
        :type="alertState.type"
        :title="alertState.title"
        :message="alertState.message"
        @close="handleAlertClose"
      />
      <!-- Dropdowns -->
      <select
          v-model="selectedModelAI"
          class="bg-white mb-3 border-2 border-blue-300 rounded-lg p-2 text-blue-700 font-semibold shadow-inner w-full mr-2 block lg:hidden"
        >
          <option value="meta-llama/llama-4-maverick-17b-128e-instruct">(AI Model) meta-llama/llama-4-maverick-17b-128e-instruct</option>
          <option value="meta-llama/llama-4-scout-17b-16e-instruct">(AI Model) meta-llama/llama-4-scout-17b-16e-instruct</option>
          <option value="openai/gpt-oss-120b">(AI Model) openai/gpt-oss-120b</option>
          <option value="openai/gpt-oss-20b">(AI Model) openai/gpt-oss-20b</option>
          <option value="openai/gpt-oss-safeguard-20b">(AI Model) openai/gpt-oss-safeguard-20b</option>
          <option value="groq/compound">(AI Model) groq/compound</option>
      </select>

      <div class="flex justify-between mb-4">
        <select
          v-model="selectedDifficulty"
          class="bg-white border-2 border-blue-300 rounded-lg p-2 text-blue-700 font-semibold shadow-inner w-1/2 mr-2"
        >
          <option value="easy">Mudah</option>
          <option value="medium">Sedang</option>
          <option value="hard">Sulit</option>
          <option value="very hard">Sangat sulit</option>
        </select>

        <select
          v-model="selectedModelAI"
          class="bg-white border-2 border-blue-300 rounded-lg p-2 text-blue-700 font-semibold shadow-inner w-1/2 mr-2 hidden lg:block"
        >
          <option value="meta-llama/llama-4-maverick-17b-128e-instruct">(AI Model) meta-llama/llama-4-maverick-17b-128e-instruct</option>
          <option value="meta-llama/llama-4-scout-17b-16e-instruct">(AI Model) meta-llama/llama-4-scout-17b-16e-instruct</option>
          <option value="openai/gpt-oss-120b">(AI Model) openai/gpt-oss-120b</option>
          <option value="openai/gpt-oss-20b">(AI Model) openai/gpt-oss-20b</option>
          <option value="openai/gpt-oss-safeguard-20b">(AI Model) openai/gpt-oss-safeguard-20b</option>
          <option value="groq/compound">(AI Model) groq/compound</option>
        </select>

        <select
          v-model="selectedTopic"
          class="bg-white border-2 border-blue-300 rounded-lg p-2 text-blue-700 font-semibold shadow-inner w-1/2 ml-2"
        >
          <option value="bilangan">Bilangan</option>
          <option value="pengetahuan kuantitatif">Pengetahuan Kuantitatif</option>
          <option value="penalaran matematika">Penalaran Matematika</option>
          <option value="trigonometri">Trigonometri</option>
          <option value="geometri">Geometri</option>
          <option value="fungsi kuadrat">Fungsi kuadrat</option>
          <option value="peluang dan kaidah pencacahan">Peluang dan Kaidah Pencacahan</option>
          <option value="statistika">Statistika</option>
          <option value="baris dan deret">Baris dan deret</option>
          <option value="sistem persamaan garis lurus dan linear">Sistem Persamaan Garis Lurus dan Linear</option>
          <option value="aritmatika sosial">Aritmatika Sosial</option>
          <option value="matriks">Matriks</option>
          <option value="transformasi geometri">Transformasi Geometri</option>
          <option value="frasa">Frasa</option>
          <option value="imbuhan">Imbuhan</option>
          <option value="kata baku">Kata Baku</option>
          <option value="vocab english">Vocab English</option>
        </select>
      </div>

      <!-- Screen -->
      <div
        class="bg-white rounded-lg border-4 border-blue-400 h-52 lg:h-100 flex flex-col mb-4 shadow-inner text-center p-2 overflow-auto"
      >
        <!-- Sebelum mulai -->
        <div v-if="!started && !isFinished" class="flex flex-col items-center w-full my-auto">
          <div v-if="isLoading">
            <p class="text-blue-600 font-semibold">Memuat soal...</p>
          </div>
          <p v-else class="text-blue-700 text-lg font-semibold">
            Ayo mulai bermain!
          </p>
        </div>

        <!-- Sedang bermain -->
        <div v-else-if="started && !isFinished" class="w-full my-auto">
          <p
            v-html="renderMath(currentQuestion.question)"
            class="text-blue-700 text-lg font-semibold mb-2"
          ></p>
        </div>

        <!-- Game selesai: tampil satu soal per layar -->
        <div v-else-if="isFinished" class="w-full my-auto">
          <p class="font-bold">
            <span v-html="renderMath(currentQuestion.question)"></span>
          </p>
          <p>
            Status:
            <span
              :class="
                currentQuestion.userAnswer === currentQuestion.correctAnswer
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              {{
                currentQuestion.userAnswer === currentQuestion.correctAnswer
                  ? "Benar"
                  : "Salah"
              }}
            </span>
          </p>
          <p>
            Jawaban Kamu:
            <span v-html="renderMath(currentQuestion.userAnswer)"></span>
          </p>
          <p>
            Jawaban Benar:
            <span
              class="text-blue-700"
              v-html="renderMath(currentQuestion.correctAnswer)"
            ></span>
          </p>
        </div>
      </div>

      <!-- Tombol Tengah Mulai + Kiri/Kanan Icon -->
      <div class="flex justify-center items-center mb-4 space-x-6">
        <!-- Kiri -->
        <button
          @click="prevQuestion"
          :disabled="!isFinished || currentIndex === 0"
          class="bg-blue-500 p-3 rounded-full shadow-md disabled:bg-gray-300 disabled:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Mulai / Tengah -->
        <button
          @click="startGame"
          :disabled="(started && !isFinished) || isLoading"
          class="bg-blue-500 text-white font-bold py-2 px-6 rounded-xl border-2 border-blue-300 shadow-md disabled:bg-gray-300 disabled:text-gray-600 transition"
        >
          Mulai
        </button>

        <!-- Kanan -->
        <button
          @click="nextQuestion"
          :disabled="!isFinished || currentIndex === questions.length - 1"
          class="bg-blue-500 p-3 rounded-full shadow-md disabled:bg-gray-300 disabled:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Tombol Jawaban (A/B/C) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <button
          v-for="(ans, idx) in displayedAnswers"
          :key="idx"
          @click="selectAnswer(ans)"
          :disabled="!started || isFinished"
          class="font-bold py-3 rounded-lg shadow-md border-2 transition transform active:scale-95 bg-blue-400 hover:bg-blue-500 text-white border-blue-300 disabled:bg-gray-300 disabled:text-gray-600"
        >
          <span v-html="renderMath(ans.answer)"></span>
        </button>
      </div>

      <!-- Score hanya saat selesai -->
      <div v-if="isFinished" class="text-center font-semibold text-blue-700">
        {{ score }} / {{ questions.length }}
      </div>

      <BottomBar />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BottomBar from "../components/BottomBar.vue";
import AlertPopup from "../components/AlertPopup.vue";
import { generateQuestionPrompt } from "../utils/aiPrompts";
import katex from "katex";
import "katex/dist/katex.min.css";

const questions = ref([]);
const started = ref(false);
const currentIndex = ref(0);
const isFinished = ref(false);
const score = ref(0);
const isLoading = ref(false);

const selectedDifficulty = ref("easy");
const selectedModelAI = ref("meta-llama/llama-4-maverick-17b-128e-instruct");
const selectedTopic = ref("pengetahuan kuantitatif");

const alertState = ref({
  show: false,
  title: "",
  message: "",
  type: "info",
});

const showAlert = (title, message, type = "info") => {
  alertState.value = { show: true, title, message, type };
};

const handleAlertClose = () => {
  alertState.value.show = false;
  if (alertState.value.type === "error") {
    window.location.reload();
  }
};

const fetchQuestions = async () => {
  isLoading.value = true;
  try {
    const prompt = generateQuestionPrompt(
      selectedTopic.value,
      selectedDifficulty.value,
      10
    );

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          model: selectedModelAI.value,
          temperature: 0.5,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    // Bersihkan jika ada markdown block
    let cleanContent = content;
    if (cleanContent.includes("```json")) {
      cleanContent = cleanContent.replace(/```json/g, "").replace(/```/g, "");
    } else if (cleanContent.includes("```")) {
      cleanContent = cleanContent.replace(/```/g, "");
    }
    cleanContent = cleanContent.trim();

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(cleanContent);
    } catch (jsonError) {
      console.warn(
        "First JSON parse failed, attempting to sanitize LaTeX backslashes..."
      );
      // Coba perbaiki backslash yang tidak valid untuk JSON
      // Strategi: Ganti backslash tunggal yang diikuti karakter bukan special char JSON (\", \\, \/, \b, \f, \n, \r, \t) menjadi double backslash.
      // Regex ini mencari \ yang TIDAK diikuti oleh salah satu karakter escape JSON yang valid.
      const sanitizedContent = cleanContent.replace(
        /\\(?!["\\/bfnrt])/g,
        "\\\\"
      );

      try {
        parsedQuestions = JSON.parse(sanitizedContent);
        console.log("Sanitized JSON parsed successfully.");
      } catch (secondError) {
        console.error("JSON Parse Error (Original):", cleanContent);
        console.error("JSON Parse Error (Sanitized):", sanitizedContent);
        throw secondError;
      }
    }

    questions.value = parsedQuestions.map((q) => ({
      ...q,
      userAnswer: null,
      correctAnswer: q.answers.find((a) => a.is_correct)?.answer,
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    showAlert("Oops!", "Gagal memuat soal.", "error");
  } finally {
    isLoading.value = false;
  }
};

const startGame = async () => {
  if (isLoading.value) return;

  await fetchQuestions();

  if (questions.value.length > 0) {
    started.value = true;
    currentIndex.value = 0;
    isFinished.value = false;
    score.value = 0;
  }
};

const currentQuestion = computed(() => questions.value[currentIndex.value]);

const displayedAnswers = computed(() => {
  if (started.value && currentQuestion.value) {
    return currentQuestion.value.answers;
  }
  return [
    { answer: "Pilihan A", is_correct: false },
    { answer: "Pilihan B", is_correct: false },
    { answer: "Pilihan C", is_correct: false },
  ];
});

const selectAnswer = (ans) => {
  currentQuestion.value.userAnswer = ans.answer;
  if (ans.is_correct) score.value++;

  // otomatis ke soal berikutnya
  if (currentIndex.value + 1 < questions.value.length) {
    currentIndex.value++;
  } else {
    isFinished.value = true;
    started.value = false;
    currentIndex.value = 0; // mulai dari soal pertama untuk navigasi
  }
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) currentIndex.value++;
};

const prevQuestion = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const renderMath = (text) => {
  if (!text) return "";
  
  // 1. Render block math first: $$...$$ or \[...\]
  let rendered = text.replace(/(\$\$|\\\[)([\s\S]*?)(\$\$|\\\])/g, (match, left, math, right) => {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (e) {
      return match;
    }
  });

  // 2. Render inline math: \(...\)
  rendered = rendered.replace(/\\\(([\s\S]*?)\\\)/g, (match, math) => {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode: false,
      });
      } catch (e) {
      return match;
    }
  });

  // 3. Render inline math with single $: $...$
  // Look for $...$ but avoid matches that look like currency (e.g. $5) if possible, 
  // though generally in this context $ is used for math.
  rendered = rendered.replace(/\$([^$]+?)\$/g, (match, math) => {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode: false,
      });
    } catch (e) {
      return match;
    }
  });

  // 4. Handle naked LaTeX environments like \begin{cases}...\end{cases}
  // We wrap them in display mode for rendering
  rendered = rendered.replace(/(\\begin\{([a-zA-Z]+)\}[\s\S]*?\\end\{\2\})/g, (match, math) => {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (e) {
      return match;
    }
  });

  return rendered;
};
</script>
