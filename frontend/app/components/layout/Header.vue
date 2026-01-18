<script setup lang="ts">
import { routes, type RoutesKey } from '~/constants/menus'

interface BreadcrumbLink {
  title: string;
  href: string;
}

const route = useRoute()

function setLinks() {
  if (route.fullPath === '/') {
    return [{ title: 'Фильмы', href: '/' }]
  }

  const segments = route.fullPath.split('/').filter(item => item !== '')

  const breadcrumbs = segments.map((item, index) => {
    return {
      title: routes[item as RoutesKey]?.title || '',
      href: `/${segments.slice(0, index + 1).join('/')}`,
    }
  })
  return [...breadcrumbs]
}

const links = ref<BreadcrumbLink[]>(setLinks())

watch(() => route.fullPath, (val) => {
  if (val) {
    links.value = setLinks()
  }
})
</script>

<template>
  <header class="sticky top-0 md:peer-data-[variant=inset]:top-2 z-10 h-(--header-height) flex items-center gap-4 border-b bg-background px-4 md:px-6 md:rounded-tl-xl md:rounded-tr-xl">
    <div class="w-full flex items-center gap-4 h-4">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <BaseBreadcrumbCustom :links="links" />
    </div>
    <div class="ml-auto">
      <slot />
    </div>
  </header>
</template>

<style scoped>

</style>