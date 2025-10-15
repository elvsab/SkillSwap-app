import { Catalog } from "../shared/ui/catalog/Catalog";
import { FilterPanel } from "../widgets/filterPanel/filterPanel";
import styles from "./MainPage.module.scss";
import { useReducer, useMemo } from "react";
import { useDebounce } from "../shared/hooks/useDebounce";
import { useSelector } from "react-redux";
import mockData from "../api/mockData.json";
import type { User } from "../shared/ui/SkillCard/types";
import {
  selectCity,
  selectGender,
  selectMode,
  selectSkillIds,
  selectSearchQuery
} from "../features/filters/model/filtersSlice";

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
    case 'SHOW_MORE': {
      const nextPage = state.currentPage + 1;
      const allUsers = mockData.users as User[];
      const newDisplayCount = nextPage * USERS_PER_PAGE;
      const newDisplayedUsers = allUsers.slice(0, newDisplayCount);

      return {
        displayedUsers: newDisplayedUsers,
        currentPage: nextPage,
        hasMore: newDisplayCount < allUsers.length
      };
    }

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

  const role = useSelector(selectMode);
  const gender = useSelector(selectGender);
  const cities = useSelector(selectCity);
  const skills = useSelector(selectSkillIds);
  const searchQuery = useSelector(selectSearchQuery);
  const debouncedSearchText = useDebounce(searchQuery, 300);

  const combinedFilters = useMemo(() => ({
    searchText: debouncedSearchText,
    role,
    gender,
    cities,
    skills
  }), [debouncedSearchText, role, gender, cities, skills]);

  const [state, dispatch] = useReducer(paginationReducer, initialState, () => {
    const allUsers = mockData.users as User[];
    return {
      displayedUsers: allUsers.slice(0, USERS_PER_PAGE),
      currentPage: 1,
      hasMore: allUsers.length > USERS_PER_PAGE
    };
  });

  const handleShowMore = () => {
    dispatch({ type: 'SHOW_MORE' });
  };

  const filteredUsers = useMemo(() => {
    const search = combinedFilters.searchText?.trim().toLowerCase() ?? "";

    return state.displayedUsers.filter((user:User) => {
      const matchesSearch = !search ||
        user.name.toLowerCase().includes(search) ||
        user.city.toLowerCase().includes(search) ||
        user.skillsCanTeach.some((skill) =>
          skill.title.toLowerCase().includes(search)
        ) ||
        user.skillsWantsToLearn.some((skill) =>
          skill.title.toLowerCase().includes(search)
        );

      let matchesRole = true;
      if (combinedFilters.role === "canTeach") {
        matchesRole = user.skillsCanTeach.length > 0;
      } else if (combinedFilters.role === "wantToLearn") {
        matchesRole = user.skillsWantsToLearn.length > 0;
      }

      const matchesGender =
        combinedFilters.gender == null || combinedFilters.gender === user.gender;

      const matchesCity =
        !combinedFilters.cities || combinedFilters.cities.length === 0
          ? true
          : combinedFilters.cities.includes(user.city);

      const matchesSkill =
        !combinedFilters.skills || combinedFilters.skills.length === 0
          ? true
          : user.skillsCanTeach.some((s) =>
              combinedFilters.skills.includes(s.id)
            ) ||
            user.skillsWantsToLearn.some((s) =>
              combinedFilters.skills.includes(s.id)
            );

      return (
        matchesSearch &&
        matchesRole &&
        matchesGender &&
        matchesCity &&
        matchesSkill
      );
    });
  }, [state.displayedUsers, combinedFilters]);

  return (
    <div className={styles.page}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <aside className={styles.sidebar}>
            <FilterPanel />
          </aside>
          
          <div className={styles.content}>
            <Catalog filters={combinedFilters} users={filteredUsers}/>
            {state.hasMore && (
              <div className={styles.pagination}>
                <button onClick={handleShowMore}>Показать ещё</button>
                <p>
                  Показано {state.displayedUsers.length} из {mockData.users.length} пользователей
                </p>
              </div>
            )}

            {!state.hasMore && state.displayedUsers.length > 0 && (
              <div className={styles.pagination}>
                <p>Все пользователи загружены</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};