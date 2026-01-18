import type { Cinemas } from "~/types/cinemas";

export const useCinemaStore = defineStore('cinemaStore', () => {
  const cinemas = useState<Cinemas[]>('cinemas', () => []);
  const cinemaDetail = useState<Cinemas | null>(() => null);

  const setCinemas = (value: Cinemas[]) => {
    cinemas.value = value;
  }

  const setCinemaDetail = (value: Cinemas | null) => {
    cinemaDetail.value = value;
  }

  const getCinemas = async () => {
    const response = await useFetch<Cinemas[]>('/api/cinemas')
    cinemas.value = response.data.value || [];
  };

  return {
    cinemas,
    cinemaDetail,
    setCinemas,
    setCinemaDetail,
    getCinemas,
  }
})