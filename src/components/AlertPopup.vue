<script setup>
import {
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";

defineProps({
  show: Boolean,
  title: {
    type: String,
    default: "Informasi",
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "info",
  },
  confirmText: {
    type: String,
    default: "Oke",
  },
});

defineEmits(["close"]);
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        class="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all"
      >
        <!-- Header / Icon Section -->
        <div class="p-6 text-center">
          <div
            v-if="type === 'error'"
            class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <XCircleIcon class="w-10 h-10 text-red-500" />
          </div>
          <div
            v-else-if="type === 'success'"
            class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircleIcon class="w-10 h-10 text-green-500" />
          </div>
          <div
            v-else
            class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <InformationCircleIcon class="w-10 h-10 text-blue-500" />
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ title }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            {{ message }}
          </p>
        </div>

        <!-- Action Section -->
        <div class="p-4 bg-gray-50 flex flex-col gap-2">
          <button
            @click="$emit('close')"
            :class="[
              'w-full py-3 rounded-2xl font-bold transition-all active:scale-95 cursor-pointer',
              type === 'error'
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                : type === 'success'
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30',
            ]"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
