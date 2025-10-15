import {type FC, useMemo, useState } from 'react';
import { Feed } from '../Feed/Feed';
import mockData from '../../../api/mockData.json';
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
}

export const Catalog: FC<CatalogProps> = ({ filters = {
  searchText: '',
  role: 'all',
  gender: null,
  cities: [],
  skills: []
} }) => {
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
      ) ||
      card.name.toLowerCase().includes(lowercasedSearch) ||
      card.city.toLowerCase().includes(lowercasedSearch)
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterCardsByOtherFilters = (cards: User[], filters: any): User[] => {
    let filtered = cards;

    if (filters.role !== 'all') {
      if (filters.role === 'canTeach') {
        filtered = filtered.filter(card => card.skillsCanTeach.length > 0);
      } else if (filters.role === 'wantsToLearn') {
        filtered = filtered.filter(card => card.skillsWantsToLearn.length > 0);
      }
    }

    if (filters.gender) {
      filtered = filtered.filter(card => card.gender === filters.gender);
    }

    if (filters.cities.length > 0) {
      filtered = filtered.filter(card => 
        filters.cities.some((city: string) => 
          card.city.toLowerCase().includes(city.toLowerCase())
        )
      );
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter(card =>
        card.skillsCanTeach.some(skill => 
          filters.skills.includes(skill.id)
        ) ||
        card.skillsWantsToLearn.some(skill => 
          filters.skills.includes(skill.id)
        )
      );
    }

    return filtered;
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

  const filteredCards = useMemo(() => {
    let result = cards;

    if (filters.searchText.trim()) {
      result = filterCardsBySearch(result, filters.searchText);
    }
    
    result = filterCardsByOtherFilters(result, filters);
    
    return result;
  }, [cards, filters]);

  const popularCards = useMemo(() => 
    cards.filter(card => card.isPopular), [cards]);
  const newCards = useMemo(() => 
    cards.filter(card => card.isNew), [cards]);
  const recommendedCards = useMemo(() => 
    getRandomCards(cards, 9), [cards]);

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
            {`Подходящие предложения: ${filteredCards.length}`}
          </Title>
        </div>
        {filteredCards.length > 0 && (
          <CardList 
            cards={filteredCards}
            onLikeClick={(id) => console.log('Like:', id)}
            onButtonClick={(id) => console.log('Details:', id)}
          />
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
          onButtonClick={(id) => console.log('Details:', id)}
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
        onButtonClick={(id) => console.log('Details:', id)}
      />
      <Feed 
        title='Новое' 
        cards={newCards.slice(0, 3)}
        handleShowAll={newCards.length > 3 ? () => handleShowAll('new') : undefined}
        onLikeClick={(id) => console.log('Like:', id)}
        onButtonClick={(id) => console.log('Details:', id)}
      />
      <Feed 
        title='Рекомендуем' 
        cards={recommendedCards.slice(0, 9)}
        onLikeClick={(id) => console.log('Like:', id)}
        onButtonClick={(id) => console.log('Details:', id)}
      />
    </div>
  );
};