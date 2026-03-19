import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Title } from "../../shared/ui/Title";
import { SkillTag } from "../../shared/ui/SkillTag";
import { Button } from "../../shared/ui/button";
import { CardList } from "../../shared/ui/CardList/CardList";
import { Modal } from "../../shared/ui/Modal";
import { selectUser } from "../../features/auth/model/authSlice";
import { addRequest, selectRequests } from "../../features/requests/model/requestsSlice";
import { addNotification } from "../../features/notifications/model/notificationsSlice";
import type { AppDispatch } from "../../app/providers/store";
import { getCatalogUsers } from "../../shared/lib/skillswap-storage";
import styles from "./SkillPage.module.css";

const skillColors = ["#E3F2FD", "#FCE7F3", "#DCFCE7", "#FEF3C7"];

export const SkillPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector(selectUser);
  const requests = useSelector(selectRequests);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const user = useMemo(
    () => getCatalogUsers().find((item) => item.id === id),
    [id]
  );

  const currentRequest = useMemo(() => {
    if (!currentUser || !user) {
      return null;
    }

    return requests.find(
      (request) =>
        request.skillId === user.id &&
        request.fromUserId === currentUser.id &&
        request.toUserId === (user.ownerId ?? user.id)
    );
  }, [currentUser, requests, user]);

  const relatedOffers = useMemo(() => {
    if (!user) {
      return [];
    }

    const relatedSkillIds = new Set([
      ...user.skillsCanTeach.map((skill) => skill.id),
      ...user.skillsWantsToLearn.map((skill) => skill.id),
    ]);

    return getCatalogUsers()
      .filter((item) => item.id !== user.id)
      .filter((item) =>
        item.skillsCanTeach.some((skill) => relatedSkillIds.has(skill.id)) ||
        item.skillsWantsToLearn.some((skill) => relatedSkillIds.has(skill.id))
      )
      .slice(0, 4);
  }, [user]);

  if (!user) {
    return (
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 20px" }}>
        <Title as="h1" size="lg">
          Пользователь не найден
        </Title>
      </div>
    );
  }

  const handleOpenRelated = (userId: string) => {
    navigate(`/skill/${userId}`);
  };

  const handleCreateRequest = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (currentRequest) {
      return;
    }

    const now = new Date().toISOString();
    const requestId = `request-${Date.now()}`;
    dispatch(
      addRequest({
        id: requestId,
        skillId: user.id,
        fromUserId: currentUser.id,
        toUserId: user.ownerId ?? user.id,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      })
    );
    dispatch(
      addNotification({
        id: `notification-${Date.now()}`,
        title: "Новая заявка на обмен",
        description: `${currentUser.name} предлагает обмен по навыку «${user.title ?? user.skillsCanTeach[0]?.title ?? "Навык"}».`,
        createdAt: now,
        read: false,
        actionLabel: "Перейти",
        actionPath: "/profile/requests",
      })
    );
    setIsSuccessOpen(true);
  };

  const buttonLabelByStatus =
    currentRequest?.status === "pending"
      ? "Заявка отправлена"
      : currentRequest?.status === "accepted"
      ? "Заявка принята"
      : currentRequest?.status === "inProgress"
      ? "Обмен в процессе"
      : currentRequest?.status === "done"
      ? "Сессия завершена"
      : currentRequest?.status === "rejected"
      ? "Заявка отклонена"
      : "Предложить обмен";

  const gallery = user.gallery?.length
    ? user.gallery
    : [user.image ?? user.avatar, user.avatar].filter(Boolean);

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <aside className={styles.card}>
          <div className={styles.profileHeader}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <div>
              <Title as="h2" size="md">
                {user.name}
              </Title>
              <p className={styles.meta}>
                {user.city}, {user.gender}
              </p>
            </div>
          </div>

          <p className={styles.description}>
            {user.description ??
              "Пользователь готов к обмену навыками и открыт к новым образовательным сессиям."}
          </p>

          <span className={styles.label}>Может научить</span>
          <div className={styles.tagList}>
            {user.skillsCanTeach.map((skill, index) => (
              <SkillTag
                key={skill.id}
                label={skill.title}
                backgroundColor={skill.color ?? skillColors[index % skillColors.length]}
              />
            ))}
          </div>

          <span className={styles.label}>Хочет научиться</span>
          <div className={styles.tagList}>
            {user.skillsWantsToLearn.map((skill, index) => (
              <SkillTag
                key={skill.id}
                label={skill.title}
                backgroundColor={skill.color ?? skillColors[(index + 1) % skillColors.length]}
              />
            ))}
          </div>
        </aside>

        <div className={styles.card}>
          <div className={styles.content}>
            <div>
              <Title as="h1" size="lg">
                {user.title ?? user.skillsCanTeach[0]?.title ?? user.name}
              </Title>
              <p className={styles.category}>
                {user.category ?? "Категория пока не указана"}
              </p>
              <p className={styles.description}>
                {user.description ??
                  "Подробное описание навыка пока не заполнено, но пользователь уже открыт к обмену и может рассказать детали при первом контакте."}
              </p>
              <Button
                label={buttonLabelByStatus}
                secondClass={currentRequest ? "secondary" : "primary"}
                onClick={handleCreateRequest}
                disabled={Boolean(currentRequest && currentRequest.status !== "rejected")}
              />
            </div>

            <div className={styles.gallery}>
              <img
                src={gallery[0] ?? user.avatar}
                alt={user.title ?? user.name}
                className={styles.mainImage}
              />
              <div className={styles.thumbs}>
                {gallery.slice(0, 3).map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${user.name}-${index + 1}`}
                    className={styles.thumb}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.related}>
        <Title as="h2" size="md">
          Похожие предложения
        </Title>
        {relatedOffers.length > 0 ? (
          <CardList cards={relatedOffers} onButtonClick={handleOpenRelated} />
        ) : (
          <p className={styles.empty}>Похожие предложения пока не найдены.</p>
        )}
      </section>

      <Modal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <Title as="h3" size="sm">
            Вы предложили обмен
          </Title>
          <p style={{ color: "var(--font-color-secondary)", lineHeight: 1.6 }}>
            Теперь дождитесь подтверждения. Уведомление появится в профиле и в
            списке уведомлений.
          </p>
          <Button
            label="Готово"
            secondClass="primary"
            onClick={() => setIsSuccessOpen(false)}
          />
        </div>
      </Modal>
    </section>
  );
};
