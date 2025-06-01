import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Sample users data - in a real app, this would come from an API
const sampleUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'Admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'staff@example.com',
    password: 'staff123',
    role: 'Staff',
    name: 'Staff User'
  },
  {
    id: 3,
    email: 'customer@example.com',
    password: 'customer123',
    role: 'Customer',
    name: 'Customer User'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('Login attempt:', { email, password });
    console.log('Available users:', sampleUsers);
    
    const foundUser = sampleUsers.find(
      user => user.email === email && user.password === password
    );
    
    console.log('Found user:', foundUser);

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name
      };
      console.log('Setting user data:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 