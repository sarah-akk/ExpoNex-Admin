import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from '../util/AuthHttp';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      // Set up automatic token refresh
      const expiryTime = new Date(user.expiresAt).getTime();
      const currentTime = new Date().getTime();
      const timeUntilExpiry = expiryTime - currentTime;

      // Set an interval to refresh token 1 minute before expiration
      const refreshTimeout = setTimeout(() => {
        handleTokenRefresh();
      }, timeUntilExpiry - 60 * 1000);

      return () => clearTimeout(refreshTimeout);
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const login = (userData) => {
    // Calculate expiry time
    const expiresAt = new Date().getTime() + userData.expiresIn * 1000;
    const updatedUserData = {
      ...userData,
      expiresAt: expiresAt,
    };
    setUser(updatedUserData);
  };

  const logout = () => {
    setUser(null);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleTokenRefresh = async () => {
    if (user && user.refreshToken) {
      try {
        const refreshedData = await refreshAccessToken(user.refreshToken);
        const expiresAt = new Date().getTime() + refreshedData.expires_in * 1000;
        const updatedUserData = {
          ...user,
          accessToken: refreshedData.access_token,
          refreshToken: refreshedData.refresh_token,
          expiresAt: expiresAt,
        };
        setUser(updatedUserData);
      } catch (error) {
        console.error('Token refresh error:', error.message);
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
