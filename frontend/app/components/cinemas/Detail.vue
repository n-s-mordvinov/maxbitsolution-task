<script setup lang="ts">
import SessionsGroup from '~/components/sessions/SessionsGroup.vue';
import { useCinemaStore } from '~/stores/cinemaStore';
import type { CinemasSessions } from '~/types/cinemas';
import type { MovieSessions } from '~/types/movies';

interface MovieSessionsGroup {
  title: string;
  sessions: MovieSessions[];
}

interface DateSessionsGroupList {
  title: string;
  items: MovieSessionsGroup[];
}

type DateSessionsGroup = Record<string, DateSessionsGroupList>;

const { movies } = useMovies();
const cinemaStore = useCinemaStore();
const cinemaSessions = ref<CinemasSessions[]>([]);

async function loadCinemaSessions(id: number) {
  const res = await $fetch<CinemasSessions[]>(`/api/cinemas/${id}/sessions`);
  cinemaSessions.value = res;
}

watch(
  () => cinemaStore.cinemaDetail?.id,
  (id) => {
    if (id) {
      loadCinemaSessions(id);
    } else {
      cinemaSessions.value = [];
    }
  },
  { immediate: true }
);

const movieSessionsGroup = computed<DateSessionsGroupList[]>(() => {  
  const results: DateSessionsGroup = cinemaSessions.value.reduce((acc: DateSessionsGroup, current) => {
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

    const currentMovie = movies.value.find((item) => item.id === current.movieId);
    const findIndex = acc[dateKey].items.findIndex((item) => item.title === currentMovie?.title);

    if (findIndex < 0) {
      acc[dateKey].items.push({
        title: currentMovie?.title || '',
        sessions: [current]
      });
    } else {
      acc[dateKey].items[findIndex]?.sessions.push(current)
    }

    return acc;
  }, {});

  return Object.values(results)

});

onUnmounted(() => {
  cinemaStore.setCinemaDetail(null)
})
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8" v-if="cinemaStore.cinemaDetail" >
    <div>
      <h1 class="text-2xl font-bold tracking-tight">
        {{cinemaStore.cinemaDetail.name}}
      </h1>
      <Separator class="my-4" />
    </div>
    <SessionsGroup v-for="(group, groupIndex) in movieSessionsGroup" :key="groupIndex" :sessions-group="group" />
  </div>
</template>