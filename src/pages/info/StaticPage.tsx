import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Title } from "../../shared/ui/Title";
import styles from "./StaticPage.module.css";

type StaticPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

const CONTENT_BY_PATH: Record<string, StaticPageContent> = {
  "/about": {
    eyebrow: "О платформе",
    title: "SkillSwap помогает людям обмениваться навыками",
    description:
      "Платформа соединяет тех, кто хочет делиться опытом, и тех, кто хочет быстро учиться у практиков.",
    items: [
      "Публикация навыков и интересов в одном профиле.",
      "Поиск людей по городу, полу и конкретным навыкам.",
      "Избранное и сценарии для будущих обменов.",
    ],
  },
  "/contacts": {
    eyebrow: "Контакты",
    title: "Связаться с командой SkillSwap",
    description:
      "Если хотите предложить идею, сообщить о проблеме или обсудить сотрудничество, используйте один из каналов связи.",
    items: [
      "Email: hello@skillswap.local",
      "Telegram: @skillswap_support",
      "Время ответа: обычно в течение одного рабочего дня.",
    ],
  },
  "/blog": {
    eyebrow: "Блог",
    title: "Материалы команды и сообщества",
    description:
      "Здесь можно публиковать истории обменов, советы по обучению и подборки полезных навыков.",
    items: [
      "Кейсы успешных обменов между пользователями.",
      "Советы по оформлению профиля и первого предложения.",
      "Подборки востребованных навыков по категориям.",
    ],
  },
  "/privacy": {
    eyebrow: "Документы",
    title: "Политика конфиденциальности",
    description:
      "Страница описывает, какие данные хранит приложение, зачем они используются и как пользователь может ими управлять.",
    items: [
      "Профильные данные нужны для подбора подходящих обменов.",
      "Локальные пользовательские настройки сохраняются в браузере.",
      "Пользователь может изменить или удалить свои данные в профиле.",
    ],
  },
  "/terms": {
    eyebrow: "Документы",
    title: "Пользовательское соглашение",
    description:
      "Здесь можно описать базовые правила поведения на платформе, ответственность сторон и условия использования сервиса.",
    items: [
      "Уважительное общение и корректное описание навыков.",
      "Запрет на публикацию недостоверной информации.",
      "Ответственность пользователя за предлагаемые обмены.",
    ],
  },
};

export const StaticPage = () => {
  const { pathname } = useLocation();

  const content = useMemo(
    () =>
      CONTENT_BY_PATH[pathname] ?? {
        eyebrow: "Информация",
        title: "Раздел в разработке",
        description:
          "Страница уже подключена к маршрутизации и готова к наполнению реальным контентом.",
        items: ["Можно добавить текст, ссылки, FAQ и контакты команды."],
      },
    [pathname]
  );

  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>{content.eyebrow}</p>
      <Title as="h1" size="lg" className={styles.title}>
        {content.title}
      </Title>
      <p className={styles.description}>{content.description}</p>
      <ul className={styles.list}>
        {content.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
