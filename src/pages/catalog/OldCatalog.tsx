import { FC } from 'react';
import { Feed } from '../../shared/ui/Feed/Feed';
import mockData from '../../api/mockData.json';

export const Catalog: FC = () => {
  const cards = mockData.users

  // const handleShowAll = (category: string) => {
  //   console.log(`Показать все в категории: ${category}`);
  //   // Здесь может быть навигация на страницу со всеми карточками
  // };

  const getRandomCards = (cards, count: number) => {  // добавить тип карточек 
    if (count >= cards.length) return [...cards];
    
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  const popularCards = cards.filter(card => card.isPopular);
  const newCards = cards.filter(card => card.isNew);
  // в recommendedCards возвращается 9 рандомных карточек
  const recommendedCards = getRandomCards(cards, Math.min(9, cards.length));
  return (
    <>
      <Feed title='Популярное' cards={popularCards} handleShowAll={}/>
      <Feed title='Новое' cards={newCards} handleShowAll={}/>
      <Feed title='Рекомендуем' cards={recommendedCards} />
    </>
  )
}