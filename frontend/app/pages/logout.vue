<script setup>
import { routes } from '~/constants/menus';

const router = useRouter()
const { resetToken } = useAuth()

resetToken()
router.replace(routes.movies.link)
</script>

<template></template>