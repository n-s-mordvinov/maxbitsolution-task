export interface Booking {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: string;
  seats: {
    rowNumber: number;
    seatNumber: number;
  }[];
  isPaid: boolean;
}