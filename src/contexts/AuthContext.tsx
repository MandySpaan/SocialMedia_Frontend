import React, { createContext, useContext, useEffect, useState } from "react";

interface Passport {
  token: string;
  tokenData: any;
}

interface AuthContextProps {
  passport: Passport | null;
  setPassport: React.Dispatch<React.SetStateAction<Passport | null>>;
}

const AuthContext = createContext<AuthContextProps>({
  passport: null,
  setPassport: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [passport, setPassport] = useState<Passport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const passportString = localStorage.getItem("passport");
    if (passportString) {
      setPassport(JSON.parse(passportString));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (passport) {
      localStorage.setItem("passport", JSON.stringify(passport));
    } else {
      localStorage.removeItem("passport");
    }
  }, [passport]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ passport, setPassport }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
