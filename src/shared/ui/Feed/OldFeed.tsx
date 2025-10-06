import { Title } from "../Title"
import { FeedProps } from "./type"
import { FC } from 'react';


export const Feed: FC<FeedProps> = ({title, cards, handleShowAll}) => {
  return (
    <main>
      <section className={} >
        <div className={} >
          <Title as="h1" size="lg">{title}</Title>
          {handleShowAll && (
          <button 
            className={}
            onClick={handleShowAll}
          >
            Смотреть все
          </button>
        )}
        </div>
        <CardList cards={cards} />
      </section>
    </main>
  )
}