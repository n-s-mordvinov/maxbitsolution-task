import { useAuth } from "~/composables/useAuth"
import { routes } from "~/constants/menus";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()

  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return navigateTo(routes.login.link)
  }

  if (auth.isAuthenticated.value && (to.path === routes.login.link || to.path === routes.signup.link)) {
    return navigateTo(routes.movies.link)
  }
})
