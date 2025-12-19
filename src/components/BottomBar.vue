<template>
  <!-- SIDEBAR DESKTOP -->
  <div class="hidden lg:flex lg:flex-col lg:w-72 lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:bg-white lg:shadow-lg lg:py-6 lg:px-4 z-50">
    
    <!-- LOGO / HEADER -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-800">Menu</h2>
    </div>

    <!-- MENU ITEMS -->
    <div class="flex flex-col space-y-4">
      <a href="/dashboard" class="flex items-center p-3 rounded-2xl hover:bg-blue-50 transition">
        <HomeIcon class="w-6 h-6 text-blue-600 mr-4" />
        <span class="font-semibold text-gray-700">Home</span>
      </a>

      <a href="/game" class="flex items-center p-3 rounded-2xl hover:bg-blue-50 transition">
        <Squares2X2Icon class="w-6 h-6 text-blue-600 mr-4" />
        <span class="font-semibold text-gray-700">Gimthernal</span>
      </a>

      <a href="/profile" class="flex items-center p-3 rounded-2xl hover:bg-blue-50 transition">
        <UserCircleIcon class="w-6 h-6 text-blue-600 mr-4" />
        <span class="font-semibold text-gray-700">Akun</span>
      </a>
    </div>

  </div>

  <!-- KONTEN UTAMA (OFFSET DESKTOP) -->
  <div class="lg:ml-72">
    <slot />
  </div>

  <!-- BOTTOM BAR MOBILE -->
  <div
    class="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-1.5 px-10 z-50 lg:hidden"
  >
    <div class="flex justify-between items-center px-[1rem]">
      <!-- LEFT -->
      <a href="/dashboard" class="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
        <HomeIcon class="w-5 h-5" />
        <span class="text-[10px] mt-[1px]">Home</span>
      </a>

      <!-- CENTER (Fokus / Special) -->
      <a href="/game"
        class="flex flex-col items-center text-blue-600 transition"
      >
        <div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md -mt-7 border-4 border-white">
          <Squares2X2Icon class="w-6 h-6" />
        </div>
        <span class="text-[10px] mt-1 font-semibold">Gimthernal</span>
      </a>

      <!-- RIGHT -->
      <a href="/profile" class="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
        <UserCircleIcon class="w-5 h-5" />
        <span class="text-[10px] mt-[1px]">Akun</span>
      </a>

    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  Squares2X2Icon,
  UserCircleIcon
} from "@heroicons/vue/24/solid"
</script>
