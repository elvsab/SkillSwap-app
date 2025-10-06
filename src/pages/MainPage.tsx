import { Catalog } from "../pages/catalog/Catalog";
import { FilterPanel } from "../widgets/filterPanel/filterPanel";
import { Header } from "../widgets/header/Header";
import { Footer } from "../widgets/footer/Footer";
import styles from "./MainPage.module.scss";
import { useState } from "react";
import { useDebounce } from "../shared/hooks/useDebounce";

export const MainPage = () => {
  const [searchText, setSearchText] = useState('');
  const debouncesSearchText = useDebounce(searchText, 300);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className={styles.page}>
      <Header 
        variant="guest" 
        name="" 
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <aside className={styles.sidebar}>
            <FilterPanel />
          </aside>
          
          <div className={styles.content}>
            <Catalog searchText={debouncesSearchText} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

