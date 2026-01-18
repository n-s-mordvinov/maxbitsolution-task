export interface Cinemas {
  id: number;
  name: string;
  address: string;
}

export interface CinemasSessions {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}