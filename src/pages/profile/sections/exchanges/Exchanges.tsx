import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Exchanges.module.css";
import { Title } from "../../../../shared/ui/Title";
import { Button } from "../../../../shared/ui/button";
import { selectUser } from "../../../../features/auth/model/authSlice";
import { selectRequests, updateRequestStatus } from "../../../../features/requests/model/requestsSlice";
import type { AppDispatch } from "../../../../app/providers/store";

export const Exchanges = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const requests = useSelector(selectRequests);

  const myExchanges = useMemo(
    () =>
      requests.filter(
        (request) =>
          (request.fromUserId === currentUser?.id ||
            request.toUserId === currentUser?.id) &&
          ["accepted", "inProgress", "done"].includes(request.status)
      ),
    [currentUser?.id, requests]
  );

  return (
    <div className={styles.container}>
      <Title as="h3" size="sm" children="Мои обмены" />
      <div className={styles.list}>
        {myExchanges.length === 0 && (
          <Title as="h4" size="xs" children="У вас пока нет обменов." />
        )}
        {myExchanges.map((exchange) => (
          <div key={exchange.id} className={styles.card}>
            <Title as="h4" size="xs">
              Обмен по карточке {exchange.skillId}
            </Title>
            <p className={styles.meta}>
              Текущий статус: {exchange.status}
            </p>
            {exchange.status === "accepted" && (
              <Button
                label="Перевести в процесс"
                secondClass="primary"
                onClick={() =>
                  dispatch(
                    updateRequestStatus({ id: exchange.id, status: "inProgress" })
                  )
                }
              />
            )}
            {exchange.status === "inProgress" && (
              <Button
                label="Завершить"
                secondClass="primary"
                onClick={() =>
                  dispatch(updateRequestStatus({ id: exchange.id, status: "done" }))
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
