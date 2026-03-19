import { useNavigate } from "react-router-dom";
import { Title } from "../../shared/ui/Title";
import { Button } from "../../shared/ui/button";

export const Offer = () => {
  const navigate = useNavigate();

  return (
    <section style={{ maxWidth: 560, margin: "64px auto", textAlign: "center" }}>
      <Title as="h2" size="md">
        Предложить обмен
      </Title>
      <p style={{ color: "var(--font-color-secondary)", lineHeight: 1.6 }}>
        Здесь можно подтвердить выбор навыка и отправить заявку автору карточки.
      </p>
      <Button
        label="Отправить заявку"
        secondClass="primary"
        onClick={() => navigate("/offer/success")}
      />
    </section>
  );
};
