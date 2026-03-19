import { Button } from "../button/Button";
import { Title } from "../Title";
import { type FeedProps } from "./type";
import type { FC } from 'react';
import { CardList } from "../CardList/CardList";
import styles from './Feed.module.scss';
import ButtonIcon from '../../assets/icons/ui/chevron-right.svg'


export const Feed: FC<FeedProps> = ({
  title, 
  cards, 
  handleShowAll,
  onLikeClick,
  onButtonClick
}) => {
  return (
    <div className={styles.feed}>
      <section className={styles.section}>
        <div className={styles.header}>
          <Title as="h1" size="lg">{title}</Title>
          {handleShowAll && (
          <Button
            type="button"
            label="Смотреть все"
            icon={ButtonIcon}
            onClick={handleShowAll}
            buttonWidth="auto"
            secondClass="button__show-all"
          />
        )}
        </div>
        <CardList 
          cards={cards}
          onLikeClick={onLikeClick}
          onButtonClick={onButtonClick}
        />
      </section>
    </div>
  )
}
