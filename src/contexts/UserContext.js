import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", lastname: "", username: "" });

  // Update user state with new data
  const updateUser = (name, lastname) => {
    const username = `${capitalize(name)} ${capitalize(lastname)}`;
    setUser({ name, lastname, username });
  };

  // Clear user state
  const clearUser = () => {
    setUser({ name: "", lastname: "", username: "" });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
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
