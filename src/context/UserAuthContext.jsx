import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

// Auth for public commenter accounts — completely separate from the admin login.
// No public profile pages, no admin privileges: just enough identity to sign a comment.
const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tp_user_token");
    const stored = localStorage.getItem("tp_user_data");
    if (token && stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    localStorage.setItem("tp_user_token", data.token);
    localStorage.setItem("tp_user_data", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/users/register", { name, email, password });
    localStorage.setItem("tp_user_token", data.token);
    localStorage.setItem("tp_user_data", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("tp_user_token");
    localStorage.removeItem("tp_user_data");
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
