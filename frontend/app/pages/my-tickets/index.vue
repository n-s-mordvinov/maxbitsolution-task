<script setup lang="ts">
import Ticket from '~/components/tickets/Ticket.vue';
import { routes } from '~/constants/menus';
import { useSettingsStore } from '~/stores/settingsStore';
import type { Booking } from '~/types/bookings';
import type { Settings } from '~/types/settings';

definePageMeta({
  middleware: 'auth',
  requiresAuth: true
})

const { onLogout } = useAuth()

const settingsStore = useSettingsStore();
const { data: bookings } = await useFetch<Booking[]>('/api/me/bookings/', {
  onResponseError ({ response }) {
    if (response.status === 401) {
      onLogout()
    }
  },
})

const { data: settings } = useAsyncData(
  'settings',
  async () => {
    const res = await $fetch<Settings>('/api/settings/');
    settingsStore.setSettings(res);
    return res
  }
)

interface BookingsGroup {
  unpaid: Booking[];
  future: Booking[];
  past: Booking[];
}

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

      if (new Date(item.bookedAt).getTime() < date.getTime()) {
        result.past.push(item);
        return
      }

      result.future.push(item);
    })
  }
  return result
})
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8">
    <h1 class="text-2xl font-bold tracking-tight">
      Мои билеты
    </h1>
    <template v-if="bookings && settings">
      <Group title="Не оплаченные">
        <Ticket v-for="(booking, bookingIndex) in bookingsGroup.unpaid" :key="bookingIndex" :ticket="booking" />
      </Group>
      <Group title="Будущие">
        <Ticket v-for="(booking, bookingIndex) in bookingsGroup.future" :key="bookingIndex" :ticket="booking" />
      </Group>
      <Group title="Прошедшие">
        <Ticket v-for="(booking, bookingIndex) in bookingsGroup.past" :key="bookingIndex" :ticket="booking" />
      </Group>
    </template>
  </div>
</template>
