<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import { useMovieStore } from '~/stores/movieStore';
import type { Movie } from '~/types/movies';

interface DataTableRowActionsProps {
  row: Row<Movie>
}
const props = defineProps<DataTableRowActionsProps>();

const movieStore = useMovieStore();

</script>

<template>
  <Button
    variant="secondary"
    @click="movieStore.setMovieDetail(props.row.original)"
  >
    Посмотреть сеансы
  </Button>
</template>