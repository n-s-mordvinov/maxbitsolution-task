import * as yup from 'yup'

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(8, 'Имя пользователя должно содержать минимум 8 символов')
    .required('Имя пользователя обязательно'),

  password: yup
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .required('Пароль обязателен'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно')
})

export type RegisterFormData = yup.InferType<typeof registerSchema>