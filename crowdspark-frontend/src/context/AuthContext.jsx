import { createContext, useContext,  useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Show loading until checked

  // Mock: Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
    // <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
    //   {!loading && children}
    // </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
