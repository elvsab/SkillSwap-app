import React from "react";
import { Modal } from "@/shared/ui/Modal";
import styles from "./SkillsList.module.scss";
import mockData from "../../../api/mockData.json";
import type { SkillCategory, SkillsListProps } from "./types";
import BookIcon from "@/shared/assets/icons/categories/book.svg";
import BriefCaseIcon from "@/shared/assets/icons/categories/briefcase.svg";
import GlobalIcon from "@/shared/assets/icons/categories/global.svg";
import HomeIcon from "@/shared/assets/icons/categories/home.svg";
import LifestyleIcon from "@/shared/assets/icons/categories/lifestyle.svg";
import PaletteIcon from "@/shared/assets/icons/categories/palette.svg";

const categoryIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "Образование и развитие": BookIcon,
  "Бизнес и карьера": BriefCaseIcon,
    "Иностранные языки": GlobalIcon,
    "Дом и уют": HomeIcon,
    "Здоровье и лайфстайл": LifestyleIcon,
    "Творчество и искусство": PaletteIcon,
};

const categoryColorMap: Record<string, string> = {
  "Бизнес и карьера": "var(--tag-business)",
  "Иностранные языки": "var(--tag-languages)",
  "Дом и уют": "var(--tag-home)",
  "Творчество и искусство": "var(--tag-creative)",
  "Образование и развитие": "var(--tag-education)",
  "Здоровье и лайфстайл": "var(--tag-health)",
};

export const SkillsList: React.FC<SkillsListProps> = ({ isOpen, onClose }) => {
  const { skills } = mockData as { skills: SkillCategory[] };

  const styleInline: React.CSSProperties = {
    top: 125,
    left: 36,
    width: 1136,
    transform: "none",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} noOverlay className={styles['skills-modal-root']}>
      {/* .content обернёт это; позиционируем через внешний блок */}
      <div className={styles['skills__modal']} style={styleInline}>
        {skills.map((category) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedColor = (category as any).color ?? categoryColorMap[category.title] ?? "transparent";
          const IconComponent = categoryIconMap[category.title];

          return (
            <div
              key={category.id}
              className={styles['skills__modal-item']}
              style={{
                ...(mappedColor !== "transparent" && { borderLeftColor: mappedColor }),
              }}
            >
              <div
                className={styles['icon-circle']}
                style={{ backgroundColor: mappedColor === "transparent" ? "var(--tag-plus)" : mappedColor }}
                aria-hidden
              >
                {IconComponent ? (
                  <IconComponent width="20" height="20" fill="#000" />
                ) : (
                  <span className={styles['icon-letter']}>
                    {category.title?.[0]?.toUpperCase() ?? ""}
                  </span>
                )}
              </div>

              <div className={styles['skills__modal-item-text']}>
                <h2 className={styles['item-title']}>{category.title}</h2>
                <div className={styles['item-subs']}>
                  {category.subCategories.map((sub) => (
                    <p key={sub.id} className={styles['sub-item']}>
                      {sub.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SkillsList;
