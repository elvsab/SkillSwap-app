export interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSubmit: (data: ILoginFormInputs) => void | Promise<void>;
}

export interface ILoginFormInputs {
  email: string;
  password: string;
}
