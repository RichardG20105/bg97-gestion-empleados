import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  organizationId: string | null;
  login: (token: string, orgId: string, tokenExpiration: Date) => void;
  logout: () => void;
};


const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  organizationId: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({children}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [organizationId, setOrganizationId] = useState<string | null>(null); // Estado para el organizationId

  const isTokenExpired = (tokenExpiration: Date | null) => {
    if (!tokenExpiration) return true; // Si no hay fecha de expiración, se considera expirado
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - tokenExpiration.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Un día en milisegundos

    return timeDifference >= oneDayInMilliseconds;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration') || null
    const orgId = localStorage.getItem('organizationId');
    if (token && tokenExpiration && orgId) {
      setIsLoggedIn(true);
      setOrganizationId(orgId)
      const expirationDate = new Date(parseInt(tokenExpiration, 10));
      if (isTokenExpired(expirationDate)) {
        logout();
      }
    }
  }, []);

  const login = async(token: string, orgId: string, tokenExpiration: Date) => {
    setIsLoggedIn(true);
    setOrganizationId(orgId);
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiration', tokenExpiration.getTime().toString());
    localStorage.setItem('organizationId', orgId);
  }
  
  const logout = () => {
    setIsLoggedIn(false);
    setOrganizationId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('organizationId');
  }

  return (
    <AuthContext.Provider value = {{isLoggedIn, organizationId, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };