import { createContext, useEffect, useState } from "react";

interface LoginData {
  userName: string,
  password: string
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, tokenExpiration: Date) => void;
  logout: () => void;
};


const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({children}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const isTokenExpired = (tokenExpiration: Date | null) => {
    if (!tokenExpiration) return true; // Si no hay fecha de expiración, se considera expirado
    return tokenExpiration <= new Date();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration') || null
    if (token && tokenExpiration) {
      setIsLoggedIn(true);
      const expirationDate = new Date(parseInt(tokenExpiration, 10));
      if (isTokenExpired(expirationDate)) {
        logout();
      }
    }
  }, []);

  const login = async(token: string, tokenExpiration: Date) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiration', tokenExpiration.getTime().toString())
  }
  
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  return (
    <AuthContext.Provider value = {{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };