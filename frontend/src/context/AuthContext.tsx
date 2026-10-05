import { createContext, useContext, useState, type ReactNode } from 'react';

export type Role = 'citizen' | 'advocate' | 'judge' | null;

export interface UserProfile {
  name: string;
  idNumber: string;
  idType: 'Aadhaar Card' | 'Bar Council Enrollment' | 'Judicial Cadre Token' | 'Corporate Legal ID';
  verified: boolean;
}

interface AuthContextType {
  role: Role;
  user: UserProfile | null;
  login: (role: Role, userProfile?: UserProfile) => void;
  logout: () => void;
}

const defaultProfiles: Record<string, UserProfile> = {
  citizen: {
    name: 'Rajesh Sharma',
    idNumber: 'Aadhaar: 4892-7104-3381',
    idType: 'Aadhaar Card',
    verified: true
  },
  advocate: {
    name: 'Adv. Vikram Seth',
    idNumber: 'BCI Reg: D/1482/2018',
    idType: 'Bar Council Enrollment',
    verified: true
  },
  judge: {
    name: "Hon'ble Sh. Anand Vardhan",
    idNumber: 'Cadre: DHJS-2016-084',
    idType: 'Judicial Cadre Token',
    verified: true
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const login = (r: Role, customUser?: UserProfile) => {
    setRole(r);
    if (r) {
      setUser(customUser || defaultProfiles[r] || null);
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
