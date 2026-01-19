<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'Фильмы'
const description = 'Список фильмов'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogUrl: 'https://dashboard.dianprata.com',
  // ogImage: 'https://nuxt-shadcn-dashboard.vercel.app/social-card.png',
  twitterTitle: title,
  twitterDescription: description,
})

</script>

<template>
  <Body class="overscroll-none antialiased bg-background text-foreground">
    <ConfigProvider>
      <div id="app" vaul-drawer-wrapper class="relative">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
      <Toaster />
    </ConfigProvider>
  </Body>
</template>