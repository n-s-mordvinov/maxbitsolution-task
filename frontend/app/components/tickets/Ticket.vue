<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { toast } from 'vue-sonner';
import { useMovieStore } from '~/stores/movieStore';
import { useSettingsStore } from '~/stores/settingsStore';
import type { Booking } from '~/types/bookings';

interface TicketProps {
  ticket: Booking;
  onRefresh?: () => {}
}

const props = defineProps<TicketProps>();

const settingsStore = useSettingsStore();
const secondsLeft = ref();


const { movieSession } = useMovieSession(props.ticket.movieSessionId)
const { cinemas } = useCinemas();
const currentCinemaTitle = computed(() => {
  return cinemas.value.find((item) => item.id === movieSession.value?.cinemaId)?.name || '-';
})

const { movies } = useMovies()
const currentMovieTitle = computed(() => {
  return movies.value.find((item) => item.id === movieSession.value?.movieId)?.title || '-';
})

let timerId: number | null = null;

const formattedDateTime = computed(() => {
  if (movieSession.value?.startTime) {
    return new Intl.DateTimeFormat('ru-RU', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(movieSession.value.startTime))
    .replace(',', '')
    .replace(/(\d{2})\.(\d{2}) (\d{2}):(\d{2})/, '$1.$2 $3:$4');
  }
  return '-'
});

const isPaid = computed(() => props.ticket.isPaid);

const formattedTime = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60);
  const seconds = secondsLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const calcRemaining = () => {
  const now = Date.now()
  const start = new Date(props.ticket.bookedAt).getTime()
  const elapsed = Math.floor((now - start) / 1000)
  return settingsStore.settings.bookingPaymentTimeSeconds - elapsed
}

onMounted(() => {
  if (props.ticket.isPaid === false) {
    secondsLeft.value = calcRemaining()
  
    if (secondsLeft.value <= 0) return
  
    timerId = setInterval(() => {
      secondsLeft.value = calcRemaining()
      if (secondsLeft.value <= 0 && timerId) {
        props.onRefresh?.()
        clearInterval(timerId)
      }
    }, 1000)
  }
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})

const onPayment = async () => {
  if (props.ticket) {
    $fetch<{ token: string }>(`/api/bookings/${props.ticket.id}/payments`, {
      method: 'POST',
      onResponseError: ({ response }) => {
        switch(response.status) {
          case 404:
            toast.error('Бронирование не найдено')
            break;
          case 409:
            toast.error('Бронирование уже оплачено')
            break;
          default:
            toast.error('Внутренняя ошибка сервера')
            break;
        }
      }
    }).then(() => {
      props.onRefresh?.()
    })
  }
}

</script>

<template>
  <div class="grid grid-cols-4 gap-4 mt-4">
    <div>
      <p>{{ currentMovieTitle || '-' }}</p>
      <p>{{ currentCinemaTitle || '-' }}</p>
      <p>{{ formattedDateTime }}</p>
    </div>
    <div>
      <p v-for="(seat, index) in props.ticket.seats" :key="index">{{ `Ряд ${seat.rowNumber}, место ${seat.seatNumber}` }}</p>
    </div>
    <div v-if="!isPaid">
      <Button variant="outline" @click="onPayment()">Оплатить</Button>
    </div>
    <div v-if="!isPaid">
      Осталось {{ formattedTime }}
    </div>
  </div>
</template>