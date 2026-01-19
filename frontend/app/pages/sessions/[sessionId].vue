<script setup lang="ts">
import { toast } from 'vue-sonner';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/menus';

const route = useRoute();
const auth = useAuth();

const { movieSession } = useMovieSession(Number(route.params.sessionId))

const { cinemas } = useCinemas();
const currentCinemaTitle = computed(() => {
  return cinemas.value.find((item) => item.id === movieSession.value?.cinemaId)?.name || '-';
})

const { movies } = useMovies()
const currentMovieTitle = computed(() => {
  return movies.value.find((item) => item.id === movieSession.value?.movieId)?.title || '-';
})

const selectedSeats = reactive<Record<string, {rowNumber: number; seatNumber: number;}>>({})

const formatDateTime = computed(() => {
  if (movieSession.value?.startTime) {
    const date = new Date(movieSession.value.startTime);
    
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
    
    const formattedTime = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    return `${formattedDate}, ${formattedTime}`;
  }
  return '';
})

const onSelect = (rowNumber: number, seatNumber: number) => {
  const key = `${rowNumber}_${seatNumber}`;
  if (!selectedSeats[key]) {
    selectedSeats[key] = {
      rowNumber,
      seatNumber
    }
  } else {
    delete selectedSeats[key]
  }
}

const onBooking = () => {
  if (!auth.isAuthenticated.value) {
    navigateTo(routes.login.link)
    return;
  }
  if (movieSession.value) {
    $fetch<{ bookingId: string }>(`/api/movieSessions/${movieSession.value.id}/bookings`, {
      method: 'POST',
      body: {
        seats: Object.values(selectedSeats)
      },
      onResponseError: ({ response }) => {
        switch(response.status) {
          case 400:
            toast.error('Неверное тело запроса')
            break;
          case 401:
            toast.error('Неавторизованный доступ')
            break;
          case 403:
            toast.error('Доступ запрещен')
            break;
          case 404:
            toast.error('Киносеанс не найден')
            break;
          case 409:
            toast.error('Места уже забронированы')
            break;
          default:
            toast.error('Ошибка бронирования')
            break;
        }
      }
    }).then(() => {
      navigateTo(routes['my-tickets'].link)
    })
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8">
    <template v-if="movieSession">
      <h1 class="text-2xl font-bold tracking-tight">
        Выбрать места
      </h1>
      <div>
        <p class="text-xs">
          Фильм: {{currentMovieTitle}}
        </p>
        <p class="text-xs">
          Кинотеатр: {{currentCinemaTitle}}
        </p>
        <p class="text-xs">
          Время: {{formatDateTime}}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent !border-b-0">
            <TableHead />
            <TableHead v-for="column in movieSession.seats.seatsPerRow" class="text-center">
              {{column}}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="movieSession.seats.rows">
            <TableRow v-for="row in movieSession.seats.rows" class="hover:bg-transparent border-b-0">
              <TableCell>
                Ряд {{ row }}
              </TableCell>
              <TableCell v-for="column in movieSession.seats.seatsPerRow" class="text-center">
                <Button
                  variant="outline"
                  @click="onSelect(row, column)"
                  :class="{
                    'bg-blue-500': selectedSeats[`${row}_${column}`],
                    'hover:bg-blue-500': selectedSeats[`${row}_${column}`],
                    'bg-red-500': movieSession.bookedSeats.find((item) => item.rowNumber === row && item.seatNumber === column)
                  }"
                  :disabled="!auth.isAuthenticated.value || movieSession.bookedSeats.find((item) => item.rowNumber === row && item.seatNumber === column)"
                ></Button>
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell
              :colspan="movieSession.seats.rows"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="flex justify-center ">
        <Button
          variant="outline"
          @click="onBooking()"
        >Забронировать </Button>
      </div>
    </template>
  </div>
</template>