import { useEffect, useState } from "react";
import { getStorageEventName } from "../lib/skillswap-storage";

export const useStorageSync = () => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const eventName = getStorageEventName();

    const handleUpdate = () => {
      setVersion((current) => current + 1);
    };

    window.addEventListener(eventName, handleUpdate as EventListener);
    return () =>
      window.removeEventListener(eventName, handleUpdate as EventListener);
  }, []);

  return version;
};
