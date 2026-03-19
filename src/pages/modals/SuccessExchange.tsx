import { useNavigate } from "react-router-dom";
import { Title } from "../../shared/ui/Title";
import { Button } from "../../shared/ui/button";

export const SuccessExchange = () => {
  const navigate = useNavigate();

  return (
    <section style={{ maxWidth: 560, margin: "64px auto", textAlign: "center" }}>
      <Title as="h2" size="md">
        Вы предложили обмен
      </Title>
      <p style={{ color: "var(--font-color-secondary)", lineHeight: 1.6 }}>
        Теперь дождитесь ответа автора. После принятия заявка появится во вкладке «Мои обмены».
      </p>
      <Button label="Готово" secondClass="primary" onClick={() => navigate("/profile/requests")} />
    </section>
  );
};
