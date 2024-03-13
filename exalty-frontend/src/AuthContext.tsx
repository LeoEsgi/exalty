import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { user } from "./Models";

const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
  user: {} as user,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as user);

  useEffect(() => {
    verifyAuthentication();
  }, []);

  const login = async () => {
    setIsAuthenticated(true);
    await checkAdmin();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const checkAdmin = async () => {
    try {
      const response = await axios
        .get("http://localhost:5000/auth/me")
        .catch((error) => {
          console.error("Failed to check admin status", error);
          setIsAdmin(false);
        });

      const user: user = response!.data;
      setIsAdmin(user.role_id === 2);
      setUser(user);
    } catch (error) {
      console.error("Failed to check admin status", error);
      setIsAdmin(false);
    }
  };

  const verifyAuthentication = async () => {
    try {
      const response = await axios
        .get("http://localhost:5000/auth/verify")
        .catch((error) => {
          console.error("Verification failed");
          setIsAuthenticated(false);
        });
      const isAuthenticated = response!.data.isAuthenticated;
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        await checkAdmin();
      }
    } catch (error) {
      console.error("Verification failed");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, isLoading, user }}
    >
      {!isLoading ? element : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
