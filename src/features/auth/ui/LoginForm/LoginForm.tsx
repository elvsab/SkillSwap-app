import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormUI } from "../LoginForm";
import { Button } from "@/shared/ui/button";
import styles from "./LoginForm.module.scss";
import type { LoginFormProps, ILoginFormInputs } from "./LoginForm.types";
import { loginSchema } from "./loginSchema";

export const LoginForm = ({ onSubmit, onSwitchToRegister }: LoginFormProps) => {
  const {
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: ILoginFormInputs) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const email = watch("email");
  const password = watch("password");

  return (
    <LoginFormUI
      email={email}
      onEmailChange={(value) =>
        setValue("email", value, { shouldValidate: true })
      }
      emailErrorMessage={errors.email?.message}
      password={password}
      onPasswordChange={(value) =>
        setValue("password", value, { shouldValidate: true })
      }
      passwordErrorMessage={errors.password?.message}
      disabled={isSubmitting}
      loading={isSubmitting}
      isFormValid={isValid}
      onSubmit={handleSubmit(handleFormSubmit)}
      footerContent={
        <Button
          label="Зарегистрироваться"
          className={styles.switch_button}
          onClick={onSwitchToRegister}
        />
      }
    />
  );
};
