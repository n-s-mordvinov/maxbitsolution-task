import { useState, computed } from '#imports'
import type { Booking } from '~/types/bookings'
import type { MovieSession } from '~/types/movies'

interface BookingsGroup {
  unpaid: Booking[];
  future: Booking[];
  past: Booking[];
}

export function useMeBookings() {
  const bookings = useState<Booking[]>('me-bookings', () => [])
  const movieSessions = useState<MovieSession[]>('movieSessionsIds', () => [])

  const { onLogout } = useAuth();

  const { refresh: refreshBookings } = useAsyncData('me-bookings', async () => {
    $fetch<Booking[]>('/api/me/bookings/', {
      onResponseError ({ response }) {
        if (response.status === 401) {
          onLogout()
        }
      }
    }).then((response) => {
      if (response) {
        bookings.value = response
      }
    })
  })

  useAsyncData(
    'movieSessionsIds',
    async () => {
      // TODO: Нужна хеш-таблица
      const results = await Promise.allSettled(
        (bookings.value || []).map((item) => $fetch<MovieSession>(`/api/movieSessions/${item.movieSessionId}`))
      );
      
      const successfulResults = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

      movieSessions.value = successfulResults;
    },
    {
      watch: [bookings]
    }
  );

  const bookingsGroup = computed<BookingsGroup>(() => {
    const result: BookingsGroup = {
      unpaid: [],
      future: [],
      past: [],
    }

    const date = new Date();

    if (bookings.value) {
      bookings.value.forEach((item) => {
        if (!item.isPaid) {
          result.unpaid.push(item);
          return
        }

        if (movieSessions.value) {
          const findMovieSession = movieSessions.value.find((movieSession) => movieSession.id === item.movieSessionId)

          if (!findMovieSession) return;

          if (new Date(findMovieSession.startTime).getTime() < date.getTime()) {
            result.past.push(item);
            return
          }
    
          result.future.push(item);
        }
      })
    }
    return result
  })

  return {
    bookings,
    movieSessions,
    bookingsGroup,
    refreshBookings
  }
}