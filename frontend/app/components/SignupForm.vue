<script setup lang="ts">
import { useForm } from 'vee-validate';
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
import { registerSchema } from '~/schemas/registerSchema';

const token = useCookie<string>('auth_token')

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: registerSchema,
  initialValues: {
    username: '',
    password: '',
    confirmPassword: ''
  }
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch<{ token: string }>('/api/register', {
      method: 'POST',
      body: {
        username: values.username,
        password: values.password
      }
    })
    
    token.value = response.token
    navigateTo(routes.movies.link)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Ошибка регистрации' }
  }
})

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Регистрация</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FieldGroup>
          <Field>
            <FieldLabel for="login">
              Логин
            </FieldLabel>
            <Input
              id="login"
              type="login"
              placeholder="Введите логин"
              v-model="username"
              required
              :class="{ 'border-red-500': errors.username }"
            />
            <ErrorMessage v-if="errors.username" name="username" as="div" class="text-sm text-red-500" />
          </Field>
          <Field>
            <FieldLabel for="password">
              Пароль
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              v-model="password"
              required
              :class="{ 'border-red-500': errors.password }"
            />
            <ErrorMessage
              v-if="errors.password"
              name="password"
              as="div"
              class="text-sm text-red-500"
            />
          </Field>
          <Field>
            <FieldLabel for="confirm-password">
              Повторите пароль
            </FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              v-model="confirmPassword"
              required
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <ErrorMessage
              v-if="errors.confirmPassword"
              name="confirmPassword"
              as="div"
              class="text-sm text-red-500"
            />
          </Field>
          <FieldGroup>
            <Field>
              <Button type="submit" :disabled="isSubmitting">
                Зарегистрироваться
              </Button>
              <FieldDescription class="px-6 text-center">
                Если вы уже зарегистрированы <NuxtLink :to="routes.login.link">войдите</NuxtLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
