import * as yup from "yup";

const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email обязателен")
    .matches(regExpEmail, "Введите корректный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 знаков"),
});