import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: localStorage.getItem('darkMode') === 'true',
  }),

  actions: {
    init() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    toggle() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', String(this.darkMode))
      this.init()
    },
  },
})
