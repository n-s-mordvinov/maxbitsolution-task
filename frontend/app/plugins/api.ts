import { useAuth } from "~/composables/useAuth"

export default defineNuxtPlugin(() => {
  const { token } = useAuth()
  
  globalThis.$fetch = $fetch.create({
    onRequest ({ options }) {
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    }
  })
})