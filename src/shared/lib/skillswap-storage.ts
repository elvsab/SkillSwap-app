import mockData from "../../api/mockData.json";
import type {
  TCreatedSkill,
  TExchangeRequest,
  TExchangeRequestStatus,
  TNotification,
  TSkillTag,
  TUser,
  TUserMain,
} from "../api/types";

const CREATED_SKILLS_KEY = "skillswap_created_skills";
const REQUESTS_KEY = "skillswap_requests";
const NOTIFICATIONS_KEY = "skillswap_notifications";
const THEME_KEY = "skillswap_theme";
const STORAGE_EVENT = "skillswap-storage-updated";

type StorageCollection = "skills" | "requests" | "notifications" | "theme";

const skillColors = ["#EEE7F7", "#E7F2F6", "#E9F7E7", "#F7EBE5", "#EBE5C5"];

const isBrowser = typeof window !== "undefined";

const emitStorageUpdate = (collection: StorageCollection) => {
  if (!isBrowser) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(STORAGE_EVENT, {
      detail: { collection },
    })
  );
};

const readJson = <T,>(key: string, fallback: T): T => {
  if (!isBrowser) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T,>(key: string, value: T, collection: StorageCollection) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  emitStorageUpdate(collection);
};

const toSkillTags = (tags: string[]): TSkillTag[] =>
  tags.slice(0, 5).map((tag, index) => ({
    id: `${tag}-${index}`,
    title: tag,
    color: skillColors[index % skillColors.length],
  }));

const buildCatalogCardFromCreatedSkill = (skill: TCreatedSkill): TUserMain => {
  const extraTags = toSkillTags(skill.tags);
  const primarySkill: TSkillTag = {
    id: skill.id,
    title: skill.title,
    color: skillColors[0],
  };

  return {
    id: skill.id,
    ownerId: skill.ownerId,
    name: skill.ownerName,
    dateOfBirth: skill.ownerBirthDate,
    gender: skill.ownerGender,
    city: skill.ownerCity,
    avatar:
      skill.ownerAvatar ??
      "https://randomuser.me/api/portraits/women/44.jpg",
    login: skill.ownerEmail,
    password: "",
    skillsCanTeach:
      skill.type === "canTeach" ? [primarySkill, ...extraTags] : extraTags,
    skillsWantsToLearn:
      skill.type === "wantToLearn" ? [primarySkill, ...extraTags] : extraTags,
    isNew: true,
    isPopular: false,
    title: skill.title,
    description: skill.description,
    category: skill.category,
    image: skill.image,
    gallery: skill.image ? [skill.image] : [],
    tags: skill.tags,
    createdAt: skill.createdAt,
  };
};

export const getCatalogUsers = (): TUserMain[] => {
  const baseUsers = mockData.users as TUserMain[];
  const createdSkills = getCreatedSkills().map(buildCatalogCardFromCreatedSkill);
  return [...createdSkills, ...baseUsers];
};

export const getCreatedSkills = (): TCreatedSkill[] =>
  readJson<TCreatedSkill[]>(CREATED_SKILLS_KEY, []);

export const addCreatedSkill = (skill: TCreatedSkill) => {
  const current = getCreatedSkills();
  writeJson(CREATED_SKILLS_KEY, [skill, ...current], "skills");
};

export const getCreatedSkillsByOwner = (ownerId?: string) =>
  getCreatedSkills().filter((skill) => skill.ownerId === ownerId);

export const getRequests = (): TExchangeRequest[] =>
  readJson<TExchangeRequest[]>(REQUESTS_KEY, []);

export const saveRequests = (requests: TExchangeRequest[]) => {
  writeJson(REQUESTS_KEY, requests, "requests");
};

export const createRequest = (request: TExchangeRequest) => {
  saveRequests([request, ...getRequests()]);
};

export const updateRequestStatus = (
  requestId: string,
  status: TExchangeRequestStatus
) => {
  const updated = getRequests().map((request) =>
    request.id === requestId
      ? {
          ...request,
          status,
          updatedAt: new Date().toISOString(),
        }
      : request
  );
  saveRequests(updated);
};

export const getNotifications = (): TNotification[] =>
  readJson<TNotification[]>(NOTIFICATIONS_KEY, []);

export const saveNotifications = (notifications: TNotification[]) => {
  writeJson(NOTIFICATIONS_KEY, notifications, "notifications");
};

export const pushNotification = (notification: TNotification) => {
  saveNotifications([notification, ...getNotifications()]);
};

export const markNotificationRead = (notificationId: string) => {
  saveNotifications(
    getNotifications().map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    )
  );
};

export const markAllNotificationsRead = () => {
  saveNotifications(
    getNotifications().map((notification) => ({
      ...notification,
      read: true,
    }))
  );
};

export const clearReadNotifications = () => {
  saveNotifications(
    getNotifications().filter((notification) => !notification.read)
  );
};

export const getThemePreference = (): "light" | "dark" =>
  readJson<"light" | "dark">(THEME_KEY, "light");

export const saveThemePreference = (theme: "light" | "dark") => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  emitStorageUpdate("theme");
};

export const applyThemeToDocument = (theme: "light" | "dark") => {
  if (!isBrowser) {
    return;
  }

  document.documentElement.dataset.theme = theme;
};

export const createCatalogCardForCurrentUser = (
  user: TUser,
  skill: TCreatedSkill
): TUserMain => {
  return buildCatalogCardFromCreatedSkill({
    ...skill,
    ownerName: user.name,
    ownerEmail: user.email,
    ownerCity: user.city,
    ownerGender: user.gender,
    ownerBirthDate: user.birthDate,
    ownerAvatar: user.avatarUrl,
  });
};

export const getStorageEventName = () => STORAGE_EVENT;
