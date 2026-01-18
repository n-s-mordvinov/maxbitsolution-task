import { useCinemaStore } from "~/stores/cinemaStore"
import type { Cinemas } from "~/types/cinemas";

export function useCinemas() {
  const store = useCinemaStore();

  const { pending, error, refresh } = useAsyncData(
    'cinemas',
    async () => {
      if (store.cinemas?.length) return store.cinemas;
      const response = await $fetch<Cinemas[]>('/api/cinemas');
      store.setCinemas(response)
      return response
    },
  )

  return {
    cinemas: computed(() => store.cinemas),
    pending,
    error,
    refresh
  }
}
