import {type FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Feed } from '../Feed/Feed';
import type { User } from '../SkillCard/types';
import { Title } from '../Title/Title';
import { CardList } from '../CardList/CardList';
import styles from './Catalog.module.scss';

type ViewMode = 'all' | 'popular' | 'new';

interface CatalogProps {
  filters?: {
    searchText: string;
    role: string;
    gender: string | null;
    cities: string[];
    skills: string[];
  };
  users: User[];
  allUsers: User[];
}

export const Catalog: FC<CatalogProps> = ({ filters = {
  searchText: '',
  role: 'all',
  gender: null,
  cities: [],
  skills: []
}, users, allUsers }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('all');
  const navigate = useNavigate();

  const handleOpenDetails = (id: string) => {
    navigate(`/skill/${id}`);
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

  const popularCards = useMemo(() => 
    allUsers.filter(card => card.isPopular), [allUsers]);
  const newCards = useMemo(() => 
    allUsers.filter(card => card.isNew), [allUsers]);
  const recommendedCards = useMemo(() => 
    getRandomCards(allUsers, 9), [allUsers]);

  const hasActiveFilters = filters.searchText.trim() || 
                          filters.role !== 'all' || 
                          filters.gender !== null || 
                          filters.cities.length > 0 || 
                          filters.skills.length > 0;

  if (hasActiveFilters) {
    return (
      <div className={styles.catalog}>
        <div className={styles.categoryHeader}>
          <Title as="h1" size="lg">
            {`Подходящие предложения: ${users.length}`}
          </Title>
        </div>
        {users.length > 0 && (
          <CardList 
            cards={users}
            onLikeClick={(id) => console.log('Like:', id)}
            onButtonClick={handleOpenDetails}
          />
        )}
        {users.length === 0 && (
          <Title as="h4" size="xs">
            По выбранным фильтрам пока ничего не найдено.
          </Title>
        )}
      </div>
    );
  }

  if (currentView !== 'all') {
    let categoryCards: User[] = [];
    let categoryTitle = '';

    switch (currentView) {
      case 'popular':
        categoryCards = popularCards;
        categoryTitle = 'Популярные';
        break;
      case 'new':
        categoryCards = newCards;
        categoryTitle = 'Новые';
        break;
    }

    return (
      <div className={styles.catalog}>
        <div className={styles.categoryHeader}>
          <Title as="h1" size="lg">{categoryTitle}</Title>
        </div>
        <CardList 
          cards={categoryCards}
          onLikeClick={(id) => console.log('Like:', id)}
          onButtonClick={handleOpenDetails}
        />
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      <Feed 
        title='Популярное' 
        cards={popularCards.slice(0, 3)}
        handleShowAll={popularCards.length > 3 ? () => handleShowAll('popular') : undefined}
        onLikeClick={(id) => console.log('Like:', id)}
        onButtonClick={handleOpenDetails}
      />
      <Feed 
        title='Новое' 
        cards={newCards.slice(0, 3)}
        handleShowAll={newCards.length > 3 ? () => handleShowAll('new') : undefined}
        onLikeClick={(id) => console.log('Like:', id)}
        onButtonClick={handleOpenDetails}
      />
      <Feed 
        title='Рекомендуем' 
        cards={recommendedCards.slice(0, 9)}
        onLikeClick={(id) => console.log('Like:', id)}
        onButtonClick={handleOpenDetails}
      />
    </div>
  );
};
