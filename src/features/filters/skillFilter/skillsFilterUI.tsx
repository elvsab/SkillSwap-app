import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import type { TCategoryWithSubcategories } from "../skillFilter/skillsFilter";
import { Checkbox } from "../../../shared/ui/checkbox";
import type { CheckboxVariant } from "../../../shared/ui/checkbox";
import s from "./SkillsFilter.module.css";
import ChevronDownIcon from "../../../shared/assets/icons/ui/chevron-down.svg";
import ChevronUpIcon from "../../../shared/assets/icons/ui/chevron-up.svg";

type CategoryItemProps = {
  category: TCategoryWithSubcategories;
  isExpanded: boolean;
  state: CheckboxVariant;
  selectedSubcategoryIds: string[];
  onCategoryClick: (category: TCategoryWithSubcategories) => void;
  onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  ({
    category,
    isExpanded,
    state,
    selectedSubcategoryIds,
    onCategoryClick,
    onSelectSubcategory,
  }) => {
    const headerCls = `${s.categoryHeader} ${isExpanded ? s.expanded : ""}`;
    const nodeRef = useRef<HTMLUListElement | null>(null);

    return (
      <li className={s.categoryItem}>
        <div className={headerCls}>
          <Checkbox
            id={`category-${category.id}`}
            variant={state}
            ariaLabel={`Выбрать категорию ${category.title}`}
            onChange={(e) => {e.stopPropagation();onCategoryClick(category)}}
          />
          <span
            className={s.categoryName}
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick(category);
            }}
            >
            {category.title}
          </span>
          <span className={s.chevron} onClick={(e) => {
      e.stopPropagation();
      onCategoryClick(category);
    }}>
            {isExpanded ? (
              <ChevronUpIcon className={s.chevronIcon} />
            ) : (
              <ChevronDownIcon className={s.chevronIcon} />
            )}
          </span>
        </div>
        <CSSTransition
          in={isExpanded}
          timeout={300}
          classNames={{
            enter: s.subListEnter,
            enterActive: s.subListEnterActive,
            exit: s.subListExit,
            exitActive: s.subListExitActive,
          }}
          unmountOnExit
          nodeRef={nodeRef}
        >
          <ul
          ref={nodeRef} 
            className={s.subcategoryList}
            onClick={(e) => e.stopPropagation()}
          >
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.id} className={s.subcategoryItem}>
                <Checkbox
                  id={`subcategory-${subcategory.id}`}
                  variant={
                    selectedSubcategoryIds.includes(subcategory.id)
                      ? "checked"
                      : "unchecked"
                  }
                  ariaLabel={`Выбрать подкатегорию ${subcategory.title}`}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSelectSubcategory(
                      subcategory.id,
                      e as unknown as React.MouseEvent
                    );
                  }}
                />
                <span
                  className={s.subcategoryName}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSubcategory(subcategory.id, e);
                  }}
                >
                  {subcategory.title}
                </span>
              </li>
            ))}
          </ul>
          </CSSTransition>
      </li>
    );
  }
);

type SkillsFilterUIProps = {
  subcategories: TCategoryWithSubcategories[];
  selectedSubcategoryIds: string[];
  expandedCategories: Set<string>;
  categoryCheckboxStates: Record<string, CheckboxVariant>;
  onCategoryClick: (category: TCategoryWithSubcategories) => void;
  onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void;
};

export const SkillsFilterUI: React.FC<SkillsFilterUIProps> = React.memo(
  ({
    subcategories,
    selectedSubcategoryIds,
    expandedCategories,
    categoryCheckboxStates,
    onCategoryClick,
    onSelectSubcategory,
  }) => {
    return (
      <div className={s.filterWrapper}>
        <h3 className={s.title}>Навыки</h3>
        <ul className={s.categoryList}>
          {subcategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isExpanded={expandedCategories.has(category.id)}
              state={categoryCheckboxStates[category.id]}
              onCategoryClick={onCategoryClick}
              onSelectSubcategory={onSelectSubcategory}
              selectedSubcategoryIds={selectedSubcategoryIds}
            />
          ))}
        </ul>
      </div>
    );
  }
);
