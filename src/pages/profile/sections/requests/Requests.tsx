import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Requests.module.css";
import { Title } from "../../../../shared/ui/Title";
import { Button } from "../../../../shared/ui/button";
import { selectUser } from "../../../../features/auth/model/authSlice";
import {
  selectRequests,
  updateRequestStatus,
} from "../../../../features/requests/model/requestsSlice";
import { addNotification } from "../../../../features/notifications/model/notificationsSlice";
import type { AppDispatch } from "../../../../app/providers/store";

export const Requests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const requests = useSelector(selectRequests);
  const [tab, setTab] = useState<"inbox" | "outbox">("inbox");

  const filteredRequests = useMemo(
    () =>
      requests.filter((request) =>
        tab === "inbox"
          ? request.toUserId === currentUser?.id
          : request.fromUserId === currentUser?.id
      ),
    [currentUser?.id, requests, tab]
  );

  const sendStatusNotification = (status: string) => {
    dispatch(
      addNotification({
        id: `notification-${Date.now()}`,
        title: "Статус заявки обновлен",
        description: `Заявка переведена в статус «${status}».`,
        createdAt: new Date().toISOString(),
        read: false,
        actionPath: "/profile/requests",
      })
    );
  };

  return (
    <div className={styles.container}>
      <Title as="h3" size="sm" children="Заявки" />
      <div className={styles.tabs}>
        <Button
          label="Входящие"
          secondClass={tab === "inbox" ? "primary" : "secondary"}
          onClick={() => setTab("inbox")}
        />
        <Button
          label="Исходящие"
          secondClass={tab === "outbox" ? "primary" : "secondary"}
          onClick={() => setTab("outbox")}
        />
      </div>
      <div className={styles.list}>
        {filteredRequests.length === 0 && (
          <Title as="h4" size="xs" children="У вас пока нет заявок." />
        )}
        {filteredRequests.map((request) => (
          <div key={request.id} className={styles.card}>
            <Title as="h4" size="xs">
              Обмен по карточке {request.skillId}
            </Title>
            <p className={styles.meta}>
              Статус: {request.status} · Обновлено{" "}
              {new Date(request.updatedAt).toLocaleDateString("ru-RU")}
            </p>
            {tab === "inbox" && request.status === "pending" && (
              <div className={styles.actions}>
                <Button
                  label="Принять"
                  secondClass="primary"
                  onClick={() => {
                    dispatch(
                      updateRequestStatus({ id: request.id, status: "accepted" })
                    );
                    sendStatusNotification("accepted");
                  }}
                />
                <Button
                  label="Отклонить"
                  secondClass="secondary"
                  onClick={() => {
                    dispatch(
                      updateRequestStatus({ id: request.id, status: "rejected" })
                    );
                    sendStatusNotification("rejected");
                  }}
                />
              </div>
            )}
            {request.status === "accepted" && (
              <div className={styles.actions}>
                <Button
                  label="Начать сессию"
                  secondClass="primary"
                  onClick={() => {
                    dispatch(
                      updateRequestStatus({ id: request.id, status: "inProgress" })
                    );
                    sendStatusNotification("inProgress");
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
