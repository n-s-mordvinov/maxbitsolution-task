<script setup lang="ts">
import DataTable from '~/components/cinemas/components/DataTable.vue';
import { useCinemaStore } from '~/stores/cinemaStore';
const cinemaStore = useCinemaStore();
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8">
    <CinemasDetail v-if="cinemaStore.cinemaDetail" />
    <DataTable v-else />
  </div>
</template>