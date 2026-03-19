import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "../../shared/ui/input";
import { Title } from "../../shared/ui/Title";
import { Button } from "../../shared/ui/button";
import Dropdown from "../../shared/ui/Dropdown";
import { selectUser } from "../../features/auth/model/authSlice";
import type { TCreatedSkill, TSkillType } from "../../shared/api/types";
import { addCreatedSkill } from "../../shared/lib/skillswap-storage";
import styles from "./CreateSkillPage.module.css";

const categoryOptions = [
  "Бизнес и карьера",
  "Творчество и искусство",
  "Иностранные языки",
  "Образование и развитие",
  "Здоровье и лайфстайл",
  "Дом и уют",
].map((label) => ({
  label,
  value: label,
}));

const createId = () =>
  `skill-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const CreateSkillPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<TSkillType>("canTeach");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string>("");
  const [tagsText, setTagsText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 5),
    [tagsText]
  );

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (title.trim().length < 3 || title.trim().length > 50) {
      nextErrors.title = "Название должно быть от 3 до 50 символов.";
    }

    if (description.trim().length === 0 || description.trim().length > 500) {
      nextErrors.description =
        "Описание обязательно и не должно превышать 500 символов.";
    }

    if (!category) {
      nextErrors.category = "Выберите категорию.";
    }

    if (tags.length > 5) {
      nextErrors.tags = "Можно указать не более 5 тегов.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((current) => ({
        ...current,
        image: "Допустимы только jpeg и png.",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: "Файл должен быть меньше 2 MB.",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      setErrors((current) => {
        const next = { ...current };
        delete next.image;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!currentUser || !validate()) {
      return;
    }

    const createdSkill: TCreatedSkill = {
      id: createId(),
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerEmail: currentUser.email,
      ownerCity: currentUser.city,
      ownerGender: currentUser.gender,
      ownerBirthDate: currentUser.birthDate,
      ownerAvatar: currentUser.avatarUrl,
      title: title.trim(),
      description: description.trim(),
      type,
      category,
      image,
      tags,
      createdAt: new Date().toISOString(),
    };

    addCreatedSkill(createdSkill);
    navigate("/");
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <Title as="h1" size="lg">
            Создать новый навык
          </Title>
          <p className={styles.subtitle}>
            После сохранения карточка появится в каталоге без перезагрузки.
          </p>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.card}>
          <div className={styles.fieldGrid}>
            <div>
              <Input
                label="Название"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Например, Английский язык"
                error={Boolean(errors.title)}
                message={errors.title}
              />
            </div>

            <div>
              <label className={styles.label}>Описание</label>
              <textarea
                className={styles.textarea}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Кратко расскажите, что именно вы предлагаете."
              />
              <div className={styles.hint}>{description.length}/500</div>
              {errors.description && (
                <div className={styles.error}>{errors.description}</div>
              )}
            </div>

            <div className={styles.row}>
              <div>
                <span className={styles.label}>Тип навыка</span>
                <div className={styles.radioRow}>
                  <label className={styles.radioChip}>
                    <input
                      type="radio"
                      checked={type === "canTeach"}
                      onChange={() => setType("canTeach")}
                    />
                    Я учу
                  </label>
                  <label className={styles.radioChip}>
                    <input
                      type="radio"
                      checked={type === "wantToLearn"}
                      onChange={() => setType("wantToLearn")}
                    />
                    Я учусь
                  </label>
                </div>
              </div>

              <div>
                <label className={styles.label}>Категория</label>
                <Dropdown
                  placeholder="Выберите категорию"
                  options={categoryOptions}
                  value={category}
                  onChange={(value: string | string[] | null) =>
                    setCategory(String(value ?? ""))
                  }
                  fullWidth
                />
                {errors.category && (
                  <div className={styles.error}>{errors.category}</div>
                )}
              </div>
            </div>

            <div>
              <Input
                label="Теги"
                value={tagsText}
                onChange={(event) => setTagsText(event.target.value)}
                placeholder="Например, разговорный английский, IELTS, speaking"
                message={
                  errors.tags ??
                  "До 5 тегов, разделяйте запятыми. Они помогут в поиске."
                }
                error={Boolean(errors.tags)}
              />
            </div>

            <div>
              <label className={styles.label}>Изображение</label>
              <input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} />
              {errors.image && <div className={styles.error}>{errors.image}</div>}
            </div>

            <div className={styles.actions}>
              <Button label="Отмена" secondClass="secondary" onClick={() => navigate(-1)} />
              <Button label="Сохранить" secondClass="primary" onClick={handleSubmit} />
            </div>
          </div>
        </div>

        <aside className={styles.card}>
          <div className={styles.preview}>
            <Title as="h3" size="sm">
              Превью карточки
            </Title>
            <div className={styles.imagePreview}>
              {image ? (
                <img src={image} alt="Превью навыка" />
              ) : (
                <div style={{ padding: 24, color: "var(--font-color-secondary)" }}>
                  Здесь появится изображение навыка.
                </div>
              )}
            </div>
            <div>
              <Title as="h4" size="xs">
                {title.trim() || "Название навыка"}
              </Title>
              <p className={styles.subtitle}>
                {description.trim() || "Краткое описание вашего предложения"}
              </p>
            </div>
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
