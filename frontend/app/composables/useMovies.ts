import { useMovieStore } from "~/stores/movieStore"
import type { Movie } from "~/types/movies";

export function useMovies() {
  const store = useMovieStore();

  const { pending, error, refresh } = useAsyncData(
    'movies',
    async () => {
      if (store.movies?.length) return store.movies;
      const res = await $fetch<Movie[]>('/api/movies');
      store.setMovies(res)
      return res
    },
  )

  return {
    movies: computed(() => store.movies),
    pending,
    error,
    refresh
  }
}
