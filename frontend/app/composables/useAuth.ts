import { toast } from 'vue-sonner';
import { routes } from '~/constants/menus'
import type { Auth } from '~/types/auth'

export const useAuth = () => {
  const token = useCookie<string>('auth_token')

  const onLogin = async (data: Auth) => {
    const response = await $fetch<{ token: string }>('/api/login', {
      method: 'POST',
      body: data,
      onResponseError: ({ response }) => {
        switch(response.status) {
          case 400:
            toast.error('Требуется имя пользователя и пароль')
            break;
          case 401:
            toast.error('Неверное имя пользователя или пароль')
            break;
          default:
            toast.error('Ошибка авторизации')
            break;
        }
      }
    })

    token.value = response.token;
    navigateTo(routes.movies.link)
  }

  const resetToken = () => {
    token.value = ''
  }

  const onLogout = async () => {
    navigateTo(routes.login.link)
    token.value = ''
  }

  return {
    token,
    onLogin,
    onLogout,
    resetToken,
    isAuthenticated: computed(() => !!token.value),
  }
}