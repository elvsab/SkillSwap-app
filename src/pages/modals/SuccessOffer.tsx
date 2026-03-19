import { useNavigate } from "react-router-dom";
import { Title } from "../../shared/ui/Title";
import { Button } from "../../shared/ui/button";

export const SuccessOffer = () => {
  const navigate = useNavigate();

  return (
    <section style={{ maxWidth: 560, margin: "64px auto", textAlign: "center" }}>
      <Title as="h2" size="md">
        Регистрация завершена
      </Title>
      <p style={{ color: "var(--font-color-secondary)", lineHeight: 1.6 }}>
        Профиль создан. Теперь можно заполнить личные данные и опубликовать первый навык.
      </p>
      <Button label="Перейти в профиль" secondClass="primary" onClick={() => navigate("/profile")} />
    </section>
  );
};
