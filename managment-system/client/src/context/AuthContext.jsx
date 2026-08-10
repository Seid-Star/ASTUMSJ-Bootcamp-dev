import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  signup as signupService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setToken(storedToken);
      setUser(parsedUser);
      setTheme(parsedUser.theme || "light");
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginService({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
    setTheme(data.user.theme || "light");

    return data;
  };

  const signup = async (formData) => {
    const data = await signupService(formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
    setTheme(data.user.theme || "light");

    return data;
  };

  const updateUserTheme = (newTheme) => {
    setTheme(newTheme);

    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        theme: newTheme,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setTheme("light");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        theme,
        setTheme: updateUserTheme,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
