import { ref } from 'vue'

const isDarkMode = ref(false)

export function useTheme() {

    // Initialize theme from localStorage
    const initTheme = () => {
        // Check if "dark_mode" is "true" string in localStorage (USER REQUEST)
        const savedMode = localStorage.getItem('dark_mode')

        if (savedMode === 'true') {
            isDarkMode.value = true
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            isDarkMode.value = false
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }

    // Toggle theme between light and dark
    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
        const theme = isDarkMode.value ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)

        // Save boolean string "true" or "false" to localStorage key "dark_mode"
        localStorage.setItem('dark_mode', isDarkMode.value.toString())
    }

    return {
        isDarkMode,
        initTheme,
        toggleTheme
    }
}
