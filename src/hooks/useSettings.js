import { useEffect, useState } from "react";
import api from "../api/axios";

// Lightweight in-memory cache so every component doesn't refetch settings
let cache = null;

export const useSettings = () => {
  const [settings, setSettings] = useState(cache);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    api
      .get("/settings")
      .then(({ data }) => {
        cache = data;
        setSettings(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
};
