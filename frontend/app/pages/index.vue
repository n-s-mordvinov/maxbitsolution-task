<script setup lang="ts">
import DataTable from '@/components/movies/components/DataTable.vue'
import { useMovieStore } from '~/stores/movieStore';

const movieStore = useMovieStore();
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-4">
    <MoviesDetail v-if="movieStore.movieDetail" />
    <DataTable v-else/>
  </div>
</template>