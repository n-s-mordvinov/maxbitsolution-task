<script setup lang="ts">
import { navMenu, routes } from '~/constants/menus'

</script>

<template>
  <Sidebar>
    <SidebarHeader>
    </SidebarHeader>
    <SidebarContent>
      <LayoutSidebarNavLink v-for="(item, index) in navMenu" :key="index" :item="item">
      </LayoutSidebarNavLink>
      <LayoutSidebarNavLink :item="routes.login">
      </LayoutSidebarNavLink>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>

<style scoped>

</style>