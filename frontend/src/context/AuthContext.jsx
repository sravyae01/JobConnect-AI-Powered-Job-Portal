import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    console.log('Login:', credentials);
    // Simulate login - set user with role
    const mockUser = { 
      username: credentials.username, 
      role: 'seeker',
      id: 1
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const register = async (userData) => {
    console.log('Register:', userData);
    const mockUser = { 
      username: userData.username, 
      role: userData.role || 'seeker',
      id: 1
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user,
      isEmployer: user?.role === 'employer',
      isSeeker: user?.role === 'seeker'
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;