<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">

    <!-- Container -->
    <div class="w-full max-w-md bg-white border-4 border-blue-300 rounded-3xl shadow-2xl p-6">

      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-extrabold text-blue-700">Masuk</h1>
        <p class="text-sm text-blue-600 mt-1">
          Lanjutkan petualanganmu 🚀
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-blue-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            v-model="email"
            class="w-full rounded-xl border-2 border-blue-300 px-4 py-3 focus:outline-none focus:border-blue-500 shadow-inner"
          />
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
            class="w-full rounded-xl border-2 border-blue-300 px-4 py-3 focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          @click.prevent="handleLogin"
          :disabled="isLoading"
          class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-md border-2 border-blue-300 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Loading...' : 'MASUK' }}
        </button>

      </form>

      <!-- Footer -->
      <div class="text-center mt-6 text-sm text-blue-700">
        Belum punya akun?
        <a href="/register" class="font-bold text-blue-600 hover:underline">
          Daftar
        </a>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/auth.service';

const router = useRouter();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Harap isi email dan password');
    return;
  }

  isLoading.value = true;
  try {
    const response = await authService.login({
      email: email.value,
      password: password.value
    });

    if (response.data.status) {
      const { token, user } = response.data.data;
      
      // Store tokens
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
      
      // Store user info if needed
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to home/dashboard
      router.push('/dashboard');
    } else {
      alert(response.data.message || 'Login gagal');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Terjadi kesalahan saat login');
  } finally {
    isLoading.value = false;
  }
};
</script>
