<template>
  <!-- BACKDROP BLUR (DESKTOP) -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isSidebarOpen"
      class="hidden lg:block fixed inset-0 bg-black/20 backdrop-blur-md z-40"
      @click="isSidebarOpen = false"
    ></div>
  </Transition>

  <!-- SIDEBAR DESKTOP -->
  <div
    class="fixed left-0 top-0 h-screen bg-white shadow-2xl py-6 px-4 z-50 transition-transform duration-300 ease-in-out w-72 hidden lg:flex lg:flex-col"
    :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+48px)]'"
  >
    <!-- CLOSE BUTTON DESKTOP -->
    <button
      @click="isSidebarOpen = false"
      class="absolute top-6 -right-12 bg-white p-2 rounded-r-xl shadow-md border-y border-r border-gray-100 hover:text-blue-600 transition cursor-pointer"
    >
      <XMarkIcon class="w-6 h-6" />
    </button>

    <!-- LOGO / HEADER -->
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800">Menu</h2>
    </div>

    <!-- MENU ITEMS -->
    <div class="flex flex-col space-y-4">
      <a
        href="/dashboard"
        class="flex items-center p-3 rounded-2xl hover:bg-blue-50 transition"
      >
        <HomeIcon class="w-6 h-6 text-blue-600 mr-4" />
        <span class="font-semibold text-gray-700">Home</span>
      </a>

      <a
        href="/game"
        class="flex items-center p-3 rounded-2xl hover:bg-blue-50 transition"
      >
        <BookOpenIcon class="w-6 h-6 text-blue-600 mr-4" />
        <span class="font-semibold text-gray-700">Gimthernal</span>
      </a>

      <a
        href="/profile"
        class="flex items-center p-3 rounded-2xl hover:bg-blue-50 transition"
      >
        <UserCircleIcon class="w-6 h-6 text-blue-600 mr-4" />
        <span class="font-semibold text-gray-700">Akun</span>
      </a>
    </div>
  </div>

  <!-- FLOATING TOGGLE BUTTON (DESKTOP) -->
  <button
    v-if="!isSidebarOpen"
    @click="isSidebarOpen = true"
    class="hidden lg:flex fixed top-2 left-12 z-40 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 hover:bg-blue-50 transition group cursor-pointer"
  >
    <Bars3Icon
      class="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform"
    />
  </button>

  <!-- KONTEN UTAMA (OFFSET DESKTOP REMOVED) -->
  <div class="w-full">
    <slot />
  </div>

  <!-- BOTTOM BAR MOBILE -->
  <div
    class="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-1.5 px-10 z-50 lg:hidden"
  >
    <div class="flex justify-between items-center px-[1rem]">
      <!-- LEFT -->
      <a
        href="/dashboard"
        class="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
      >
        <HomeIcon class="w-5 h-5" />
        <span class="text-[10px] mt-[1px]">Home</span>
      </a>

      <!-- CENTER (Fokus / Special) -->
      <a
        href="/game"
        class="flex flex-col items-center text-blue-600 transition"
      >
        <div
          class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md -mt-7 border-4 border-white"
        >
          <BookOpenIcon class="w-6 h-6" />
        </div>
        <span class="text-[10px] mt-1 font-semibold">Gimthernal</span>
      </a>

      <!-- RIGHT -->
      <a
        href="/profile"
        class="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
      >
        <UserCircleIcon class="w-5 h-5" />
        <span class="text-[10px] mt-[1px]">Akun</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  HomeIcon,
  BookOpenIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

const isSidebarOpen = ref(false);
</script>
