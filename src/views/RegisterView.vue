<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">

    <!-- Container -->
    <div class="w-full max-w-md bg-blue-100 border-4 border-blue-300 rounded-3xl shadow-2xl p-6">

      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-extrabold text-blue-700">Daftar Akun</h1>
        <p class="text-sm text-blue-600 mt-1">
          Mulai petualangan belajarmu 🎮
        </p>
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
            class="w-full rounded-xl border-2 border-blue-300 px-4 py-3 focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>

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
          @click.prevent="handleRegister"
          :disabled="isLoading"
          class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-md border-2 border-blue-300 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Loading...' : 'DAFTAR' }}
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/auth.service';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    alert('Harap isi semua kolom');
    return;
  }

  isLoading.value = true;
  try {
    const response = await authService.register({
      username: username.value,
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
      alert(response.data.message || 'Registrasi gagal');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Terjadi kesalahan saat registrasi');
  } finally {
    isLoading.value = false;
  }
};
</script>
