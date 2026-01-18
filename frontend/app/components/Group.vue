<script setup lang="ts">
interface GroupProps {
  title: string;
}
const { title } = defineProps<GroupProps>()
</script>

<template>
  <div>
    <p class="text-sm font-medium leading-none">
      {{title}}
    </p>
    <Separator class="my-4" />
    <slot />
  </div>
</template>