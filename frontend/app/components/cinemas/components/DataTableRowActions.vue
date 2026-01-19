<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import { useCinemaStore } from '~/stores/cinemaStore';
import type { Cinemas } from '~/types/cinemas';

interface DataTableRowActionsProps {
  row: Row<Cinemas>
}
const props = defineProps<DataTableRowActionsProps>();

const cinemaStore = useCinemaStore();
</script>

<template>
  <Button
    variant="outline"
    @click="cinemaStore.setCinemaDetail(props.row.original)"
  >
    Посмотреть сеансы
  </Button>
</template>