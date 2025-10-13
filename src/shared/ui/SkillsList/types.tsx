export interface SkillSubCategory {
  id: string;
  title: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subCategories: SkillSubCategory[];
}

export interface SkillsListProps {
  isOpen: boolean;
  onClose: () => void;
}
