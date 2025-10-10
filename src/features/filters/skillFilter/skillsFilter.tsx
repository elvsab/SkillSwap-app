import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../app/providers/store";
import {
  fetchCategories,
  fetchSubcategories,
  selectCategoriesForFilter,
} from "../../../entities/skills/model/skillsSlice";
import { filtersActions, selectSkillIds } from "../model/filtersSlice";
import { SkillsFilterUI } from "./skillsFilterUI";
import type { TCategory, TSubcategory } from "../../../shared/api/types";
import type { CheckboxVariant } from "../../../shared/ui/checkbox";

export type TCategoryWithSubcategories = TCategory & {
  subcategories: TSubcategory[];
};

export const SkillsFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoriesForFilter = useSelector(selectCategoriesForFilter);
  const selectedSubcategoryIds = useSelector(selectSkillIds);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const categoryCheckboxStates = useMemo(() => {
    const states: Record<string, CheckboxVariant> = {};

    for (const category of categoriesForFilter) {
      const subcategoryIds = category.subcategories.map((sc: any) => sc.id);
      const totalSubcategories = subcategoryIds.length;

      if (totalSubcategories === 0) {
        states[category.id] = "unchecked";
        continue;
      }

      const selectedCount = subcategoryIds.filter((id: string) =>
        selectedSubcategoryIds.includes(id)
      ).length;

      if (selectedCount === totalSubcategories) {
        states[category.id] = "checked";
      } else if (selectedCount > 0) {
        states[category.id] = "mixed";
      } else {
        states[category.id] = "unchecked";
      }
    }

    return states;
  }, [categoriesForFilter, selectedSubcategoryIds]);

  const handleCategoryClick = useCallback(
    (category: TCategoryWithSubcategories) => {
      const currentState = categoryCheckboxStates[category.id];
      const subcategoryIds = category.subcategories.map((sc) => sc.id);

      if (currentState === "checked") {
        // Снимаем выделение со всех подкатегорий
        const newSelectedSkillIds = selectedSubcategoryIds.filter(
          (id: string) => !subcategoryIds.includes(id)
        );
        dispatch(filtersActions.setSkillIds(newSelectedSkillIds));
        setExpandedCategories((prev) => {
          const newSet = new Set(prev);
          newSet.delete(category.id);
          return newSet;
        });
      } else {
        // Добавляем все подкатегории
        const newSelectedSkillIds = [
          ...selectedSubcategoryIds.filter(
            (id: string) => !subcategoryIds.includes(id)
          ),
          ...subcategoryIds,
        ];
        dispatch(filtersActions.setSkillIds(newSelectedSkillIds));
        setExpandedCategories((prev) => new Set(prev).add(category.id));
      }
    },
    [categoryCheckboxStates, dispatch, selectedSubcategoryIds]
  );

  const handleSelectSubcategory = useCallback(
    (subcategoryId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newSelectedSkillIds = selectedSubcategoryIds.includes(subcategoryId)
        ? selectedSubcategoryIds.filter((id: string) => id !== subcategoryId)
        : [...selectedSubcategoryIds, subcategoryId];
      dispatch(filtersActions.setSkillIds(newSelectedSkillIds));
    },
    [selectedSubcategoryIds, dispatch]
  );

  return (
    <SkillsFilterUI
      subcategories={categoriesForFilter}
      selectedSubcategoryIds={selectedSubcategoryIds}
      expandedCategories={expandedCategories}
      categoryCheckboxStates={categoryCheckboxStates}
      onCategoryClick={handleCategoryClick}
      onSelectSubcategory={handleSelectSubcategory}
    />
  );
};
