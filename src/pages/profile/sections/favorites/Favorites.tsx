import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Favorites.module.css";
import { Title } from "../../../../shared/ui/Title";
import {
  fetchUserFavorites,
  removeFromFavorites,
  selectFavoriteSkills,
  selectFavoriteUsers,
} from "../../../../features/favorites/model/favoritesSlice";
import type { AppDispatch } from "../../../../app/providers/store";
import { Button } from "../../../../shared/ui/button";

export const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteUsers = useSelector(selectFavoriteUsers);
  const favoriteSkills = useSelector(selectFavoriteSkills);

  useEffect(() => {
    void dispatch(fetchUserFavorites());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Title as="h3" size="sm" children="Избранные" />
      <div className={styles.list}>
        {favoriteUsers.length === 0 && favoriteSkills.length === 0 && (
          <div className={styles.emptyState}>
            <Title as="h4" size="xs" children="У вас пока нет избранных." />
            <p>Вернитесь в каталог и добавьте понравившиеся карточки.</p>
          </div>
        )}
        {favoriteUsers.map((item) => (
          <div key={`user-${item.id}`} className={styles.card}>
            <p>{item.title ?? `Пользователь ${item.id}`}</p>
            <Button
              label="Убрать"
              onClick={() => void dispatch(removeFromFavorites({ id: item.id, type: "user" }))}
            />
          </div>
        ))}
        {favoriteSkills.map((item) => (
          <div key={`skill-${item.id}`} className={styles.card}>
            <p>{item.title ?? `Навык ${item.id}`}</p>
            <Button
              label="Убрать"
              onClick={() => void dispatch(removeFromFavorites({ id: item.id, type: "skill" }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
