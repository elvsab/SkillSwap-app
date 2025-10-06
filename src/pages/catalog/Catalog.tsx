import { FC, useMemo, useState } from 'react';
import { Feed } from '../../shared/ui/Feed/Feed';
import mockData from '../../api/mockData.json';
import type { User } from '../../shared/ui/SkillCard/types';
import { Title } from '../../shared/ui/Title/Title';
import { CardList } from '../../shared/ui/CardList/CardList';
import styles from './Catalog.module.scss';

type ViewMode = 'all' | 'popular' | 'new';

interface CatalogProps {
  searchText?: string; // Добавьте пропс для поиска
}

export const Catalog: FC<CatalogProps> = ({ searchText = '' }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('all');
  const cards: User[] = mockData.users as User[];

  const filterCardsBySearch = (cards: User[], searchText: string): User[] => {
    if (!searchText.trim()) return cards;
    
    const lowercasedSearch = searchText.toLowerCase();
    
    return cards.filter(card => 
      card.skillsCanTeach.some(skill => 
        skill.title.toLowerCase().includes(lowercasedSearch)
      ) ||
      card.skillsWantsToLearn.some(skill => 
        skill.title.toLowerCase().includes(lowercasedSearch)
      )
    );
  };

  const handleShowAll = (category: ViewMode) => {
    setCurrentView(category);
  };

  const getRandomCards = (cards: User[], count: number) => {
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

  const filteredCards = useMemo(() => 
    filterCardsBySearch(cards, searchText),
    [cards, searchText]
  );

  if (searchText.trim()) {
    return (
      <div className={styles.catalog}>
        <div className={styles.categoryHeader}>
          <Title as="h1" size="lg">
            {filteredCards.length > 0 ? `Подходящие предложения: ${filteredCards.length}` : 'Ничего не найдено'}
          </Title>
        </div>
        {filteredCards.length > 0 && <CardList cards={filteredCards} />}
      </div>
    );
  }

  if (currentView !== 'all') {
    let categoryCards: User[] = [];
    let categoryTitle = '';

    switch (currentView) {
      case 'popular':
        categoryCards = popularCards;
        categoryTitle = 'Все популярные';
        break;
      case 'new':
        categoryCards = newCards;
        categoryTitle = 'Все новые';
        break;
    }
    return (
      <div className={styles.catalog}>
        <div className={styles.categoryHeader}>
          <Title as="h1" size="lg">{categoryTitle}</Title>
        </div>
        <CardList cards={categoryCards} />
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      <Feed 
        title='Популярное' 
        cards={popularCards.slice(0, 3)} 
        handleShowAll={() => handleShowAll('popular')}
      />
      <Feed 
        title='Новое' 
        cards={newCards.slice(0, 3)} 
        handleShowAll={() => handleShowAll('new')}
      />
      <Feed 
        title='Рекомендуем' 
        cards={recommendedCards} 
      />
    </div>
  );
};