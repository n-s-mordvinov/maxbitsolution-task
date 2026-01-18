import { routes } from '~/constants/menus'
import type { Auth } from '~/types/auth'

export const useAuth = () => {
  const token = useCookie<string>('auth_token')

  const onLogin = async (data: Auth) => {
    try {
      const response = await $fetch<{ token: string }>('/api/login', {
        method: 'POST',
        body: data
      })
      
      token.value = response.token
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Ошибка авторизации' }
    }
  }

  const onLogout = async () => {
    token.value = ''
    navigateTo(routes.login.link)
  }

  return {
    token,
    onLogin,
    onLogout,
    isAuthenticated: computed(() => token.value),
  }
}