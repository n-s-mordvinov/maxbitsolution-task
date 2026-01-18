<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { routes } from "~/constants/menus"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const login = ref('')
const password = ref('')
const error = ref<string>('')

const { onLogin } = useAuth()

const handleLogin = async () => {
  const result = await onLogin({
    username: login.value,
    password: password.value
  })
  
  if (result.success) {
    navigateTo('/')
  } else {
    error.value = result.error || ""
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Вход</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel for="login">
                Логин
              </FieldLabel>
              <Input
                id="login"
                type="login"
                placeholder="Введите логин"
                v-model="login"
                required
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  Пароль
                </FieldLabel>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                v-model="password"
                required
              />
            </Field>
            <Field>
              <Button type="submit" @click.prevent="handleLogin()">
                Войти
              </Button>
              <FieldDescription class="text-center">
                Если у вас нет аккаунта 
                <NuxtLink :to="routes.signup.link">
                  зарегистрируйтесь
                </NuxtLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
