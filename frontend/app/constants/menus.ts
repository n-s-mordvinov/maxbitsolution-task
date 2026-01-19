import type { NavLink, NavMenu } from '~/types/nav'

export type RoutesKey = 'movies' | 'cinemas' | 'my-tickets' | 'login' | 'logout' | 'signup'

export const routes: Record<RoutesKey, NavLink> = {
  movies: {
    title: 'Фильмы',
    icon: 'i-lucide-home',
    link: '/',
  },
  cinemas: {
    title: 'Кинотеатры',
    icon: 'i-lucide-mail',
    link: '/cinemas',
  },
  'my-tickets': {
    title: 'Мои билеты',
    icon: 'i-lucide-mail',
    link: '/my-tickets',
  },
  login: {
    title: 'Вход',
    icon: 'i-lucide-mail',
    link: '/login',
  },
  logout: {
    title: 'Выход',
    icon: 'i-lucide-mail',
    link: '/logout',
  },
  signup: {
    title: 'Регистрация',
    icon: 'i-lucide-mail',
    link: '/signup',
  }
}

export const navMenu: NavMenu = [
  routes.movies,
  routes.cinemas,
]