import type { MovieSession } from "~/types/movies";

export function useMovieSession(id: MovieSession['id']) {
  const { data, pending, error, refresh } = useAsyncData(
    `movieSession-${id}`,
    async () => {
      const res = await $fetch<MovieSession>(`/api/movieSessions/${id}`);
      return res
    },
  )

  return {
    movieSession: data,
    pending,
    error,
    refresh
  }
}
