import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Personal.module.css";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/index";
import { IconWrapper } from "../../../../shared/ui/iconWrapper";
import Avatar from "../../../../shared/assets/icons/profile/user.svg";
import Edit from "../../../../shared/assets/icons/actions/gallery-add.svg";
import iconStyles from "../../../../shared/ui/iconWrapper/IconWrapper.module.css";
import {
  selectAuthLoading,
  selectUser,
  updateProfile,
} from "../../../../features/auth/model/authSlice";
import type { AppDispatch } from "../../../../app/providers/store";
import type { TUser } from "../../../../shared/api/types";

type PersonalFormState = {
  email: string;
  name: string;
  birthDate: string;
  gender: TUser["gender"];
  city: string;
  aboutUser: string;
};

export const Personal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const [form, setForm] = useState<PersonalFormState>({
    email: "",
    name: "",
    birthDate: "",
    gender: "Женский",
    city: "",
    aboutUser: "",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      email: user.email,
      name: user.name,
      birthDate: user.birthDate,
      gender: user.gender,
      city: user.city,
      aboutUser: user.aboutUser ?? "",
    });
  }, [user]);

  const hasChanges = useMemo(() => {
    if (!user) {
      return false;
    }

    return (
      form.email !== user.email ||
      form.name !== user.name ||
      form.birthDate !== user.birthDate ||
      form.gender !== user.gender ||
      form.city !== user.city ||
      form.aboutUser !== (user.aboutUser ?? "")
    );
  }, [form, user]);

  const updateField = <K extends keyof PersonalFormState>(
    field: K,
    value: PersonalFormState[K]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    void dispatch(updateProfile(form));
  };

  const handleChangePass = () => {
    window.alert("Функция смены пароля будет следующей итерацией.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile_data}>
        <Input
          label="Почта"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <Button
          label="Изменить пароль"
          textColor="var(--font-color-link)"
          onClick={handleChangePass}
        />
        <Input
          label="Имя"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <div className={styles.profile_data_inner}>
          <Input
            label="Дата рождения"
            value={form.birthDate}
            onChange={(e) => updateField("birthDate", e.target.value)}
          />
          <Input
            label="Пол"
            value={form.gender}
            onChange={(e) =>
              updateField(
                "gender",
                e.target.value === "Мужской" ? "Мужской" : "Женский"
              )
            }
          />
        </div>
        <Input
          label="Город"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
        />
        <Input
          label="О себе"
          value={form.aboutUser}
          onChange={(e) => updateField("aboutUser", e.target.value)}
        />
        <Button
          label="Сохранить"
          secondClass="primary"
          onClick={handleSave}
          disabled={!hasChanges || loading}
          loading={loading}
        />
      </div>
      <div className={styles.profile_img}>
        <IconWrapper
          icon={Avatar}
          width={244}
          height={244}
          className={iconStyles.iconCircle}
        />
        <div className={styles.editImg}>
          <IconWrapper
            icon={Edit}
            width={24}
            height={24}
            className="icon-circle"
          />
        </div>
      </div>
    </div>
  );
};
