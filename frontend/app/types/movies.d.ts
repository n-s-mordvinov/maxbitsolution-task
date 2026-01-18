export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}

export type MovieSessions = Omit<MovieSession, 'seats' | 'bookedSeats'>;

export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: {
    rows: number;
    seatsPerRow: number;
  },
  bookedSeats: {
    rowNumber: number;
    seatNumber: number;
  }[]
}