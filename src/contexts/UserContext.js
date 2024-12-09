import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Create the UserContext
const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Start with null to differentiate between loading and no user
  const [loading, setLoading] = useState(true); // Add loading state for session check

  // Fetch the user session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log("Fetching user session...");
        const response = await api.get("/auth/session", {
          withCredentials: true, // Ensures cookies are sent
        });
    
        console.log("Request Headers:", api.defaults.headers);
        console.log("Session response:", response);
        setUser(response.data.user); // Set the user from the session
      } catch (error) {
        console.warn("No active session found", error);
        setUser(null); // No session
      } finally {
        setLoading(false); // End loading state
      }
    };
    
    fetchSession();
  }, []);

  // Update user state with new data
  const updateUser = (name, lastname) => {
    const username = `${capitalize(name)} ${capitalize(lastname)}`;
    setUser({ name, lastname, username });
  };

  // Clear user state
  const clearUser = () => {
    setUser(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    loading,
    updateUser,
    clearUser,
  }), [user, loading]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Utility to capitalize name and lastname
const capitalize = (str) => {
  if (!str) return str;
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
