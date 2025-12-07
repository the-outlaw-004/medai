import { createContext, useState, useEffect } from "react";
import { decodeAccessToken } from "../utils/jwt";
import { refreshToken } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const updateUserFromToken = (token) => {
    const decoded = decodeAccessToken(token);
    setUser(decoded);
  };

  const handleRefresh = async () => {
    try {
      const { data } = await refreshToken();
      setAccessToken(data.accessToken);
      updateUserFromToken(data.accessToken);
    } catch (err) {
      console.error("Refresh failed", err);
      setAccessToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      setAccessToken(storedToken);
      updateUserFromToken(storedToken);
    }
  }, []);

  const value = { accessToken, setAccessToken, user, setUser, handleRefresh };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
