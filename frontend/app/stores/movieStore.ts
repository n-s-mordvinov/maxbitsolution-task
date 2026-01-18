import type { Movie, MovieSession } from "~/types/movies";

export const useMovieStore = defineStore('movieStore', () => {
  const movieDetail = ref<Movie | null>(null);
  const movies = useState<Movie[]>('movies', () => []);

  function setMovies(value: Movie[]) {
    movies.value = value;
  }

  function setMovieDetail(value: Movie | null) {
    movieDetail.value = value;
  }

  return {
    movies,
    movieDetail,
    setMovies,
    setMovieDetail
  }
})