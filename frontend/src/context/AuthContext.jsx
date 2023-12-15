import React, { createContext, useContext, useEffect, useState } from 'react';
import { logoutUser } from '../api/user';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let storedUser = undefined;
    try {
      // Load user data from localStorage on website startup.
      storedUser = JSON.parse(localStorage.getItem('user'));
    } catch (err) {
      // Malformed data in local storage.
      localStorage.removeItem('user');
    }

    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Assume userData is an object containing user information
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Remove token from cookie, need backend for this.
    logoutUser().catch((e) => console.log("Error: ", e));
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
