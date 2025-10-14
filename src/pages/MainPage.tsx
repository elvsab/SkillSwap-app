import { Catalog } from "../shared/ui/catalog/Catalog";
import { FilterPanel } from "../widgets/filterPanel/filterPanel";
import styles from "./MainPage.module.scss";
import { useState, useMemo } from "react";
import { useDebounce } from "../shared/hooks/useDebounce";
import { useSelector } from "react-redux";
import {
  selectCity,
  selectGender,
  selectMode,
  selectSkillIds,
  selectSearchQuery
} from "../features/filters/model/filtersSlice";

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

  return (
    <div className={styles.page}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <aside className={styles.sidebar}>
            <FilterPanel />
          </aside>
          
          <div className={styles.content}>
            <Catalog filters={combinedFilters} />
          </div>
        </div>
      </div>
    </div>
  );
};