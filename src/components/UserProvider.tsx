
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  points: number;
  isVip: boolean;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  toggleVip: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [isVip, setIsVip] = useState(false);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const spendPoints = (amount: number) => {
    if (points >= amount) {
      setPoints(prev => prev - amount);
      return true;
    }
    return false;
  };

  const toggleVip = () => {
    setIsVip(prev => !prev);
  };

  return (
    <UserContext.Provider value={{ points, isVip, addPoints, spendPoints, toggleVip }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
