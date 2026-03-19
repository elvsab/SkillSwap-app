const REGISTRATION_DRAFT_KEY = "skillswap_registration_draft";

export type RegistrationDraft = {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: "Мужской" | "Женский";
  city: string;
  aboutUser: string;
  interests: string[];
  learningGoals: string[];
};

const initialDraft: RegistrationDraft = {
  email: "",
  password: "",
  name: "",
  birthDate: "",
  gender: "Женский",
  city: "",
  aboutUser: "",
  interests: [],
  learningGoals: [],
};

export const getRegistrationDraft = (): RegistrationDraft => {
  try {
    const raw = localStorage.getItem(REGISTRATION_DRAFT_KEY);
    return raw ? { ...initialDraft, ...JSON.parse(raw) } : initialDraft;
  } catch {
    return initialDraft;
  }
};

export const saveRegistrationDraft = (draft: Partial<RegistrationDraft>) => {
  localStorage.setItem(
    REGISTRATION_DRAFT_KEY,
    JSON.stringify({
      ...getRegistrationDraft(),
      ...draft,
    })
  );
};

export const clearRegistrationDraft = () => {
  localStorage.removeItem(REGISTRATION_DRAFT_KEY);
};
