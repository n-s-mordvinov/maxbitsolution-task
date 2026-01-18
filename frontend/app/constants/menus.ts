import type { NavLink, NavMenu } from '~/types/nav'

export type RoutesKey = 'movies' | 'cinemas' | 'my-tickets' | 'login' | 'signup'

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
  signup: {
    title: 'Регистрация',
    icon: 'i-lucide-mail',
    link: '/signup',
  }
}

export const navMenu: NavMenu = [
  routes.movies,
  routes.cinemas,
  routes['my-tickets'],
]