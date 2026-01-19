<script setup lang="ts">
import Ticket from '~/components/tickets/Ticket.vue';
import { useSettingsStore } from '~/stores/settingsStore';
import type { Settings } from '~/types/settings';

definePageMeta({
  middleware: 'auth',
  requiresAuth: true,
  ssr: false
})

const { onLogout } = useAuth()

const settingsStore = useSettingsStore();
const { bookings, bookingsGroup, refreshBookings } = useMeBookings()

const { data: settings } = useAsyncData(
  'settings',
  async () => {
    const res = await $fetch<Settings>('/api/settings/');
    settingsStore.setSettings(res);
    return res
  }
)
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8">
    <h1 class="text-2xl font-bold tracking-tight">
      Мои билеты
    </h1>
    <template v-if="bookings && settings">
      <Group title="Не оплаченные" v-if="bookingsGroup.unpaid.length">
        <Ticket v-for="(booking, bookingIndex) in bookingsGroup.unpaid" :key="bookingIndex" :ticket="booking" :onRefresh="refreshBookings" />
      </Group>
      <Group title="Будущие" v-if="bookingsGroup.future.length">
        <Ticket v-for="(booking, bookingIndex) in bookingsGroup.future" :key="bookingIndex" :ticket="booking" />
      </Group>
      <Group title="Прошедшие" v-if="bookingsGroup.past.length">
        <Ticket v-for="(booking, bookingIndex) in bookingsGroup.past" :key="bookingIndex" :ticket="booking" />
      </Group>
    </template>
  </div>
</template>
