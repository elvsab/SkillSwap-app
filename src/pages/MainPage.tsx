import { Catalog } from "../shared/ui/catalog/Catalog";
import { FilterPanel } from "../widgets/filterPanel/filterPanel";
import styles from "./MainPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDebounce, useStorageSync } from "../shared/hooks";
import { useSelector } from "react-redux";
import type { User } from "../shared/ui/SkillCard/types";
import {
  selectCity,
  selectGender,
  selectMode,
  selectSkillIds,
  selectSearchQuery
} from "../features/filters/model/filtersSlice";
import { Button } from "../shared/ui/button";
import { getCatalogUsers } from "../shared/lib/skillswap-storage";

const USERS_PER_PAGE = 20;

export const MainPage = () => {
  useStorageSync();
  const allUsers = getCatalogUsers() as User[];
  const [sortMode, setSortMode] = useState<"default" | "newest">("default");

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
  const [visibleCount, setVisibleCount] = useState(USERS_PER_PAGE);

  const handleShowMore = () => {
    setVisibleCount((current) => current + USERS_PER_PAGE);
  };

  const hasActiveFilters = useMemo(
    () =>
      combinedFilters.searchText.trim() !== "" ||
      combinedFilters.role !== "all" ||
      combinedFilters.gender !== null ||
      combinedFilters.cities.length > 0 ||
      combinedFilters.skills.length > 0,
    [combinedFilters]
  );

  const filteredUsers = useMemo(() => {
    const search = combinedFilters.searchText?.trim().toLowerCase() ?? "";

    const matched = allUsers.filter((user: User) => {
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

    if (sortMode === "newest") {
      return [...matched].sort((first, second) => {
        const firstDate = first.createdAt ? Date.parse(first.createdAt) : 0;
        const secondDate = second.createdAt ? Date.parse(second.createdAt) : 0;
        return secondDate - firstDate;
      });
    }

    return matched;
  }, [allUsers, combinedFilters, sortMode]);

  const displayedUsers = hasActiveFilters
    ? filteredUsers.slice(0, visibleCount)
    : allUsers;

  const hasMore = hasActiveFilters && displayedUsers.length < filteredUsers.length;

  useEffect(() => {
    setVisibleCount(USERS_PER_PAGE);
  }, [combinedFilters]);

  return (
    <div className={styles.page}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <aside className={styles.sidebar}>
            <FilterPanel />
          </aside>
          
          <div className={styles.content}>
            <div className={styles.toolbar}>
              <Button
                label={sortMode === "newest" ? "Сначала новые" : "По умолчанию"}
                secondClass="secondary"
                onClick={() =>
                  setSortMode((current) =>
                    current === "default" ? "newest" : "default"
                  )
                }
              />
            </div>
            <Catalog filters={combinedFilters} users={displayedUsers} allUsers={allUsers} />
            {hasMore && (
              <div className={styles.pagination}>
                <button onClick={handleShowMore}>Показать ещё</button>
                <p>
                  Показано {displayedUsers.length} из {filteredUsers.length} пользователей
                </p>
              </div>
            )}

            {!hasMore && hasActiveFilters && displayedUsers.length > 0 && (
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
