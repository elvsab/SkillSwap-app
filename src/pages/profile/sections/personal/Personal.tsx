import styles from "./Personal.module.css";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/index";
import { IconWrapper } from "../../../../shared/ui/iconWrapper";
import Avatar from "../../../../shared/assets/icons/profile/user.svg";
import Edit from "../../../../shared/assets/icons/actions/gallery-add.svg";
import iconStyles from "../../../../shared/ui/iconWrapper/IconWrapper.module.css";

export const Personal = () => {
  const handleSave = () => {
    // здесь позже можно открыть модалку или просто сохранить
    console.log("Сохранить изменения");
  };

  const handleChangePass = () => {
    // здесь позже можно открыть модалку
    console.log("Изменить пароль");
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile_data}>
        <Input
          label="Почта"
          type="email"
          name="email"
          value="Mariia@gmail.com"
        />
        <Button
          label="Изменить пароль"
          textColor="var(--font-color-link)"
          onClick={handleChangePass}
        />
        <Input label="Имя" value="Мария" />
        <div className={styles.profile_data_inner}>
          <Input label="Дата рождения" value="28.09.1999" />
          <Input label="Пол" value="Женский" />
        </div>
        <Input label="Город" value="Алматы" />
        <Input
          label="О себе"
          value="Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем‑то интересным!"
        />
        <Button
          label="Сохранить"
          secondClass="primary"
          onClick={handleSave}
          disabled={true}
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
