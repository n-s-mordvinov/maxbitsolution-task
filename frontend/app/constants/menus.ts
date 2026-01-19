import type { NavLink, NavMenu } from '~/types/nav'

export type RoutesKey = 'movies' | 'cinemas' | 'my-tickets' | 'login' | 'logout' | 'signup'

export const routes: Record<RoutesKey, NavLink> = {
  movies: {
    title: 'Фильмы',
    icon: 'i-lucide-film',
    link: '/',
  },
  cinemas: {
    title: 'Кинотеатры',
    icon: 'i-lucide-tv-minimal',
    link: '/cinemas',
  },
  'my-tickets': {
    title: 'Мои билеты',
    icon: 'i-lucide-ticket',
    link: '/my-tickets',
  },
  login: {
    title: 'Вход',
    icon: 'i-lucide-log-in',
    link: '/login',
  },
  logout: {
    title: 'Выход',
    icon: 'i-lucide-log-out',
    link: '/logout',
  },
  signup: {
    title: 'Регистрация',
    icon: 'i-lucide-user-plus',
    link: '/signup',
  }
}

export const navMenu: NavMenu = [
  routes.movies,
  routes.cinemas,
]