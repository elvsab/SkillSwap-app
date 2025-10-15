import { FC } from 'react';
import { type CardListProps } from './type';
import { SkillCard } from '../SkillCard/SkillCard';
import styles from './CardList.module.scss';

export const CardList: FC<CardListProps> = ({ 
  cards, 
  onLikeClick, 
  onButtonClick 
}) => {
  return (
    <div className={styles.cardList}>
      {cards.map((card) => (
        <SkillCard
          key={card.id}
          user={card}
          onLikeClick={onLikeClick}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  );
};