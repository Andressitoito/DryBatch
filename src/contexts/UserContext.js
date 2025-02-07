import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Start with null to differentiate between loading and no user
  const [loading, setLoading] = useState(true); // Add loading state for session check

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("drybatch");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // End loading state after checking localStorage
  }, []);

  // Update user state with new data including role, and save to localStorage
  const updateUser = (name, lastname, role) => {
    const username = `${capitalize(name)} ${capitalize(lastname)}`;
    const updatedUser = { name, lastname, username, role }; // Now includes role
    setUser(updatedUser);
    localStorage.setItem("drybatch", JSON.stringify(updatedUser));
  };

  // Clear user state and remove from localStorage
  const clearUser = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("drybatch"); // Remove user from localStorage
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      updateUser,
      clearUser,
    }),
    [user, loading]
  );

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
