import React, { createContext, useContext, useEffect, useState } from "react";

interface Passport {
  token: string;
  tokenData: any;
}

interface AuthContextProps {
  passport: Passport | null;
}

const AuthContext = createContext<AuthContextProps>({ passport: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [passport, setPassport] = useState<Passport | null>(null);

  useEffect(() => {
    const passportString = localStorage.getItem("passport");
    if (passportString) {
      setPassport(JSON.parse(passportString));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ passport }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
