import { ref, watchEffect } from "vue";

const isDarkMode = ref(localStorage.getItem("dark_mode") === "true");

export function useTheme() {
  const applyTheme = () => {
    const theme = isDarkMode.value ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dark_mode", isDarkMode.value.toString());
  };

  const initTheme = () => {
    applyTheme();
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
  };

  return {
    isDarkMode,
    initTheme,
    toggleTheme,
  };
}
