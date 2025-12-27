<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50 to-blue-100 p-4"
  >
    <!-- Container -->
    <div
      class="w-full max-w-md bg-white border-4 border-blue-300 rounded-3xl shadow-2xl p-6"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-extrabold text-blue-700">Daftar Akun</h1>
        <p class="text-sm text-blue-600 mt-1">Mulai petualangan belajarmu 🎮</p>
      </div>

      <!-- Form -->
      <form class="space-y-4">
        <!-- Username -->
        <div>
          <label class="block text-blue-700 font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="username kamu"
            v-model="username"
            :class="[
              'w-full rounded-xl border-2 px-4 py-3 focus:outline-none shadow-inner transition-colors',
              errors.username
                ? 'border-red-400 focus:border-red-500 bg-red-50'
                : 'border-blue-300 focus:border-blue-500',
            ]"
          />
          <p v-if="errors.username" class="text-xs text-red-500 mt-1 ml-1">
            {{ errors.username }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-blue-700 font-semibold mb-1"> Email </label>
          <input
            type="email"
            placeholder="email@example.com"
            v-model="email"
            :class="[
              'w-full rounded-xl border-2 px-4 py-3 focus:outline-none shadow-inner transition-colors',
              errors.email
                ? 'border-red-400 focus:border-red-500 bg-red-50'
                : 'border-blue-300 focus:border-blue-500',
            ]"
          />
          <p v-if="errors.email" class="text-xs text-red-500 mt-1 ml-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-blue-700 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            v-model="password"
            :class="[
              'w-full rounded-xl border-2 px-4 py-3 focus:outline-none shadow-inner transition-colors',
              errors.password
                ? 'border-red-400 focus:border-red-500 bg-red-50'
                : 'border-blue-300 focus:border-blue-500',
            ]"
          />
          <p v-if="errors.password" class="text-xs text-red-500 mt-1 ml-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Button -->
        <button
          type="submit"
          @click.prevent="handleRegister"
          :disabled="isLoading"
          class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-md border-2 border-blue-300 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Loading..." : "DAFTAR" }}
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-6 text-sm text-blue-700">
        Sudah punya akun?
        <a href="/login" class="font-bold text-blue-600 hover:underline">
          Login
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import authService from "../services/auth.service";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errors = ref({
  username: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  // Reset errors
  errors.value = { username: "", email: "", password: "" };

  // Validation
  let hasError = false;

  if (!username.value) {
    errors.value.username = "Username belum diisi";
    hasError = true;
  }

  if (!email.value) {
    errors.value.email = "Email belum diisi";
    hasError = true;
  } else if (!email.value.includes("@gmail")) {
    errors.value.email = "Email tidak valid";
    hasError = true;
  }

  if (!password.value) {
    errors.value.password = "Password belum diisi";
    hasError = true;
  }

  if (hasError) return;

  isLoading.value = true;
  try {
    const response = await authService.register({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (response.data.status) {
      const { token, user } = response.data.data;

      localStorage.setItem("access_token", token.access_token);
      localStorage.setItem("refresh_token", token.refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } else {
      const msg = response.data.message || "";
      if (msg.toLowerCase().includes("username")) {
        errors.value.username = "Username tidak tepat";
      } else if (msg.toLowerCase().includes("email")) {
        errors.value.email = "Email tidak tepat";
      } else if (msg.toLowerCase().includes("password")) {
        errors.value.password = "Password tidak tepat";
      } else {
        errors.value.email = "Data tidak tepat";
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    errors.value.email = "Terjadi kesalahan";
  } finally {
    isLoading.value = false;
  }
};
</script>
