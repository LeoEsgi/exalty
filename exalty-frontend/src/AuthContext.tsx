import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { user, cart } from "./Models";

const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
  user: {} as user,
  cart: {} as cart,
  setCart: (cart: cart) => {},
  setUser: (user: user) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as user);
  const [cart, setCart] = useState({} as cart);

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
      const loadedCart = await getCart(user.id);
      setCart(loadedCart);
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

  const getCart = async (user_id: number) => {
    const response = await axios
      .get("http://localhost:5000/shop/cart/user/" + user_id)
      .catch((err) => {
        console.error("Error fetching cart:", err);
        return { data: [] };
      });
    return response.data as cart;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        login,
        logout,
        isLoading,
        user,
        cart,
        setCart,
        setUser,
      }}
    >
      {!isLoading ? element : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
