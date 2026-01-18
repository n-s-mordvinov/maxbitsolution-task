<script setup lang="ts">
import SessionsGroup from '~/components/sessions/SessionsGroup.vue';
import { useMovieStore } from '~/stores/movieStore';
import type { Movie, MovieSessions } from '~/types/movies';

const movie: Movie = {
  "id": 3,
  "title": "Тёмный рыцарь",
  "year": 2008,
  "rating": 9,
  "posterImage": "/static/images/posters/dark_knight.jpg",
  "lengthMinutes": 152,
  "description": "Когда Джокер сеет хаос и разрушение в Готэме, Бэтмен сталкивается с величайшими испытаниями своих способностей и морали."
};

interface CinemaSessionsGroup {
  title: string;
  sessions: MovieSessions[];
}

type MovieSessionsGroup = Record<string, {
  title: string;
  items: CinemaSessionsGroup[];
}>


const movieStore = useMovieStore();
const { cinemas } = useCinemas();

const moviesSessions = ref<MovieSessions[]>([]);

async function loadMovieSessions(id: number) {
  const res = await $fetch<MovieSessions[]>(`/api/movies/${id}/sessions`);
  moviesSessions.value = res;
}

watch(
  () => movieStore.movieDetail?.id,
  (id) => {
    if (id) {
      loadMovieSessions(id);
    } else {
      moviesSessions.value = [];
    }
  },
  { immediate: true }
);

const movieSessionsGroup = computed(() => {  
  const results: MovieSessionsGroup = moviesSessions.value.reduce((acc: MovieSessionsGroup, current) => {
    const date = new Date(current.startTime);
    const dateKey = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });

    if (!dateKey) return acc;
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        title: dateKey,
        items: []
      };
    }

    const currentCinema = cinemas.value.find((item) => item.id === current.cinemaId);
    const findIndex = acc[dateKey].items.findIndex((item) => item.title === currentCinema?.name);

    if (findIndex < 0) {
      acc[dateKey].items.push({
        title: currentCinema?.name || "",
        sessions: [current]
      });
    } else {
      acc[dateKey].items[findIndex]?.sessions.push(current)
    }

    return acc;
  }, {});

  return Object.values(results)
    .sort((a, b) => a.title.localeCompare(b.title));
});

onUnmounted(() => {
  movieStore.setMovieDetail(null)
})
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8" v-if="movieStore.movieDetail">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">
        {{movieStore.movieDetail.title}}
      </h1>
      <Separator class="my-4" />
      <div class="flex gap-4 mt-4">
        <div class="flex-none w-[180px] h-[266px]">
          <img :src="movieStore.movieDetail.posterImage" :alt="movieStore.movieDetail.title" />
        </div>
        <div>
          <p class="text-muted-foreground">
            {{movieStore.movieDetail.description}}
          </p>
        </div>
      </div>
    </div>
    <SessionsGroup v-for="(group, groupIndex) in movieSessionsGroup" :key="groupIndex" :sessions-group="group" />
  </div>
</template>