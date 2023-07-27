import { GeneralApi } from "@/apis/Apis";
import { createContext, useEffect, useState } from "react";

interface LoginData {
  userName: string,
  password: string
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async( ) => {
    setIsLoggedIn(true);
  }
  
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value = {{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };


