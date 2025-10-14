import { useReducer } from 'react';
import { SkillCard } from '../shared/ui/SkillCard';
import mockData from '../api/mockData.json';
import type { User } from '../shared/ui/SkillCard/types';

interface PaginationState {
  displayedUsers: User[];
  currentPage: number;
  hasMore: boolean;
}

type PaginationAction = 
  | { type: 'SHOW_MORE' }
  | { type: 'RESET' };

const USERS_PER_PAGE = 20;

const initialState: PaginationState = {
  displayedUsers: [],
  currentPage: 1,
  hasMore: true
};

function paginationReducer(state: PaginationState, action: PaginationAction): PaginationState {
  switch (action.type) {
    case 'SHOW_MORE':
      const nextPage = state.currentPage + 1;
      const allUsers = mockData.users as User[];
      const newDisplayCount = nextPage * USERS_PER_PAGE;
      const newDisplayedUsers = allUsers.slice(0, newDisplayCount);
      
      return {
        displayedUsers: newDisplayedUsers,
        currentPage: nextPage,
        hasMore: newDisplayCount < allUsers.length
      };

    case 'RESET':
      return {
        displayedUsers: (mockData.users as User[]).slice(0, USERS_PER_PAGE),
        currentPage: 1,
        hasMore: (mockData.users as User[]).length > USERS_PER_PAGE
      };

    default:
      return state;
  }
}

export const MainPage = () => {
  const [state, dispatch] = useReducer(paginationReducer, initialState, () => {
    const allUsers = mockData.users as User[];
    return {
      displayedUsers: allUsers.slice(0, USERS_PER_PAGE),
      currentPage: 1,
      hasMore: allUsers.length > USERS_PER_PAGE
    };
  });

  const handleLikeClick = (userId: string) => {
    console.log('Like clicked for user:', userId);
  };

  const handleButtonClick = (userId: string) => {
    console.log('Details clicked for user:', userId);
  };

  const handleShowMore = () => {
    dispatch({ type: 'SHOW_MORE' });
  };

  return (
    <div>
      <h1>Найдите своего ментора</h1>
      
      <div>
        {state.displayedUsers.map(user => (
          <SkillCard 
            key={user.id} 
            user={user} 
            onLikeClick={handleLikeClick}
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>

      {state.hasMore && (
        <div>
          <button onClick={handleShowMore}>
            Показать ещё
          </button>
          <p>
            Показано {state.displayedUsers.length} из {mockData.users.length} пользователей
          </p>
        </div>
      )}

      {!state.hasMore && state.displayedUsers.length > 0 && (
        <div>
          <p>Все пользователи загружены</p>
        </div>
      )}
    </div>
  );
};