<script setup lang="ts">
import { navMenu, routes } from '~/constants/menus'

const { isAuthenticated } = useAuth()
</script>

<template>
  <Sidebar>
    <SidebarHeader>
    </SidebarHeader>
    <SidebarContent>
      <LayoutSidebarNavLink v-for="(item, index) in navMenu" :key="index" :item="item" />
      <LayoutSidebarNavLink v-if="isAuthenticated" :item="routes['my-tickets']"/>
      <LayoutSidebarNavLink v-if="isAuthenticated" :item="routes.logout"/>
      <LayoutSidebarNavLink v-else :item="routes.login"/>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>

<style scoped>

</style>