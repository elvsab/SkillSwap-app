import { useEffect, useLayoutEffect, useState, type FC } from "react";
import styles from "./SkillCard.module.css";
import { SkillTag } from "../SkillTag";
import { Button } from "../button";
import type { UserCardProps } from "./types";
import ClockIcon from "../../assets/icons/actions/clock.svg";
import type { User } from "./types";

function getLikedSkills(): string[] {
  const liked = localStorage.getItem("LikedSkills");
  return liked ? JSON.parse(liked) : [];
}

function toggleLikedSkills(userId: string) {
  const liked = getLikedSkills();
  let updated: string[];
  if (liked.includes(userId)) {
    updated = liked.filter((id) => id !== userId);
  } else {
    updated = [...liked, userId];
  }
  localStorage.setItem("LikedSkills", JSON.stringify(updated));
}

const getAgeWithDeclension = (dateOfBirth: string): string => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${age} лет`;
  }

  switch (lastDigit) {
    case 1:
      return `${age} год`;
    case 2:
    case 3:
    case 4:
      return `${age} года`;
    default:
      return `${age} лет`;
  }
};

export const SkillCard: FC<UserCardProps> = ({
  user,
  onLikeClick,
  onButtonClick,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isHasSwap, setIsHasSwap] = useState<boolean>(false);

  useEffect(() => {
    const likedSkills = getLikedSkills();
    setIsLiked(likedSkills?.includes(user.id));
  }, [user]);

  useLayoutEffect(() => {
    const reqString = localStorage.getItem("Request");
    if (!reqString) {
      return;
    }

    type SwapRequest = {
      userForSwap: User;
      skillForSwap: unknown;
    };

    const req: SwapRequest[] = JSON.parse(reqString);
    const hasSwap = req.some((item) => item.userForSwap.id === user.id);
    setIsHasSwap(hasSwap);
  }, [user.id]);

  const handleDetailsClick = () => {
    if (onButtonClick) {
      onButtonClick(user.id);
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    toggleLikedSkills(user.id);
    onLikeClick?.(user.id);
  };

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={`${styles.card__like_button} ${isLiked ? styles.liked : ""}`}
        onClick={handleLikeClick}
      ></button>
      <div className={styles.card__header}>
        <img
          src={user.avatar}
          alt="Аватар пользователя"
          className={styles.card__avatar}
        />
        <div className={styles.card__title}>
          <span className={styles.card__user_name}>{user.name}</span>
          <span className={styles.card__user_description}>
            {user.city}, {getAgeWithDeclension(user.dateOfBirth)}
          </span>
        </div>
      </div>
      <div>
        <div className={styles.card__skills}>
          <span className={styles.card__skills_title}>Может научить:</span>
          <div className={styles.card__skills_list}>
            {user.skillsCanTeach.length <= 2
              ? user.skillsCanTeach.map((skill) => (
                <SkillTag
                    key={skill.id}
                    label={skill.title}
                    backgroundColor={skill.color ?? "#E3F2FD"}
                  />
                ))
              : user.skillsCanTeach
                  .slice(0, 2)
                  .map((skill) => (
                    <SkillTag
                      key={skill.id}
                      label={skill.title}
                      backgroundColor={"#E0F7FA"}
                    />
                  ))}
            {user.skillsCanTeach.length > 2 && (
              <SkillTag
                label={`+${user.skillsCanTeach.length - 2}`}
                backgroundColor={"#E8ECF7"}
              />
            )}
          </div>
        </div>
        <div className={styles.card__skills}>
          <span className={styles.card__skills_title}>Хочет научиться:</span>
          <div className={styles.card__skills_list}>
            {user.skillsWantsToLearn.length <= 2
              ? user.skillsWantsToLearn.map((skill) => (
                <SkillTag
                    key={skill.id}
                    label={skill.title}
                    backgroundColor={skill.color ?? "#E8F5E9"}
                  />
                ))
              : user.skillsWantsToLearn
                  .slice(0, 2)
                  .map((skill) => (
                    <SkillTag
                      key={skill.id}
                      label={skill.title}
                      backgroundColor={"#E0F7FA"}
                    />
                  ))}
            {user.skillsWantsToLearn.length > 2 && (
              <SkillTag
                label={`+${user.skillsWantsToLearn.length - 2}`}
                backgroundColor={"#E8ECF7"}
              />
            )}
          </div>
        </div>
      </div>

      {isHasSwap ? (
        <Button
          type="button"
          onClick={handleDetailsClick}
          secondClass="secondary"
          icon={ClockIcon}
          label="Обмен предложен"
          buttonWidth="100%"
          padding="12px 71.5px"
        />
      ) : (
        <Button
          type="button"
          onClick={handleDetailsClick}
          secondClass="primary"
          label="Подробнее"
          buttonWidth="100%"
          padding="12px 109px"
          className={styles.card__details_button}
        />
      )}
    </div>
  );
};
