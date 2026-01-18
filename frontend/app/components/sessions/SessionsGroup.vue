<script setup lang="ts">
import type { MovieSessions } from '~/types/movies';

interface SessionsGroup {
  title: string;
  items: {
    title: string;
    sessions: MovieSessions[];
  }[]
}
interface SessionsGroupProps {
  sessionsGroup: SessionsGroup
}
const { sessionsGroup } = defineProps<SessionsGroupProps>()
</script>

<template>
  <Group :title="sessionsGroup.title">
    <div
      v-for="(item, index) in sessionsGroup.items"
      :key="index"
      class="mt-4"
    >
      <div class="flex space-x-4 text-sm gap-4">
        <div class="w-1/2 flex-1 py-2">
          <p lass="text-sm">
            {{item.title}}
          </p>
        </div>
        <div class="w-1/2 flex-1">
          <div class="flex flex-wrap gap-4">
            <Button
              v-for="session in item.sessions"
              :key="session.id"
              variant="secondary"
              @click="navigateTo(`/sessions/${session.id}`)"
            >{{new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}}</Button>
          </div>
        </div>
      </div>
    </div>
  </Group>
</template>