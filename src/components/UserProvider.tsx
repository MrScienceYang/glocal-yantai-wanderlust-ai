import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

const hardcodedUsers = [
  { user: "17375411453", password: "123456", isPermanentVip: false },
  { user: "ytkj", password: "user", isPermanentVip: true },
  { user: "admin", password: "admin", isPermanentVip: true },
];

const CHECK_IN_REWARDS = [5, 10, 5, 7, 5, 5, 30];

interface CurrentUser {
  username: string;
  points: number;
  isVip: boolean;
  isPermanentVip: boolean;
  lastCheckInDate: string | null;
  consecutiveCheckInDays: number;
}

interface UserContextType {
  points: number;
  isVip: boolean;
  isLoggedIn: boolean;
  currentUser: CurrentUser | null;
  canCheckIn: boolean;
  consecutiveCheckInDays: number;
  checkInRewards: number[];
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  toggleVip: () => void;
  login: (username: string, pass: string) => boolean;
  socialLogin: (provider: string) => boolean;
  loginWithCode: (identifier: string, code: string) => boolean;
  logout: () => void;
  checkIn: () => number | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('glocal-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setCurrentUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      localStorage.setItem('glocal-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('glocal-user');
    }
  }, [currentUser, isLoggedIn]);

  const addPoints = (amount: number) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, points: prev.points + amount } : null);
  };

  const spendPoints = (amount: number) => {
    if (!currentUser || currentUser.points < amount) return false;
    setCurrentUser(prev => prev ? { ...prev, points: prev.points - amount } : null);
    return true;
  };

  const toggleVip = () => {
    if (!currentUser || currentUser.isPermanentVip) return;
    setCurrentUser(prev => prev ? { ...prev, isVip: !prev.isVip } : null);
  };

  const performLogin = (username: string, isPermanentVip: boolean) => {
      const storedUsers = JSON.parse(localStorage.getItem('glocal-user-registry') || '{}');
      const hasLoggedInBefore = storedUsers[username];
      
      const initialPoints = hasLoggedInBefore ? 0 : 100;
      if (!hasLoggedInBefore) {
        storedUsers[username] = true;
        localStorage.setItem('glocal-user-registry', JSON.stringify(storedUsers));
      }

      const existingData = JSON.parse(localStorage.getItem('glocal-user-data') || '{}');
      const userData = existingData[username] || {
        points: 0,
        lastCheckInDate: null,
        consecutiveCheckInDays: 0,
      };

      const newUser: CurrentUser = {
        username: username,
        points: userData.points + initialPoints,
        isVip: isPermanentVip || userData.isVip || false,
        isPermanentVip: isPermanentVip,
        lastCheckInDate: userData.lastCheckInDate,
        consecutiveCheckInDays: userData.consecutiveCheckInDays,
      };

      setCurrentUser(newUser);
      setIsLoggedIn(true);
  }

  const login = (username: string, pass: string): boolean => {
    const foundUser = hardcodedUsers.find(u => u.user === username && u.password === pass);
    if (foundUser) {
      performLogin(foundUser.user, foundUser.isPermanentVip);
      return true;
    }
    return false;
  };
  
  const socialLogin = (provider: string): boolean => {
    const username = `${provider.toLowerCase()}_user`;
    // For demo, we assume social login is successful and the user is not a permanent VIP.
    performLogin(username, false);
    toast.success(`Logged in with ${provider}`);
    return true;
  }

  const loginWithCode = (identifier: string, code: string): boolean => {
    // For demo, any code is "valid" as long as it's not empty.
    if (identifier && code) {
      performLogin(identifier, false);
      return true;
    }
    return false;
  }
  
  const logout = () => {
    if (currentUser) {
       const existingData = JSON.parse(localStorage.getItem('glocal-user-data') || '{}');
       existingData[currentUser.username] = {
         points: currentUser.points,
         lastCheckInDate: currentUser.lastCheckInDate,
         consecutiveCheckInDays: currentUser.consecutiveCheckInDays,
         isVip: currentUser.isVip,
       };
       localStorage.setItem('glocal-user-data', JSON.stringify(existingData));
    }
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const canCheckIn = !currentUser?.lastCheckInDate || !isSameDay(new Date(currentUser.lastCheckInDate), new Date());

  const checkIn = (): number | null => {
    if (!currentUser || !canCheckIn) return null;

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let consecutiveDays = currentUser.consecutiveCheckInDays;
    if (currentUser.lastCheckInDate && isSameDay(new Date(currentUser.lastCheckInDate), yesterday)) {
      consecutiveDays = (consecutiveDays % 7) + 1;
    } else {
      consecutiveDays = 1;
    }

    const pointsEarned = CHECK_IN_REWARDS[consecutiveDays - 1];
    
    setCurrentUser(prev => prev ? {
      ...prev,
      points: prev.points + pointsEarned,
      lastCheckInDate: today.toISOString(),
      consecutiveCheckInDays: consecutiveDays,
    } : null);
    
    return pointsEarned;
  };

  return (
    <UserContext.Provider value={{ 
      points: currentUser?.points ?? 0, 
      isVip: currentUser?.isVip ?? false,
      isLoggedIn,
      currentUser,
      canCheckIn,
      consecutiveCheckInDays: currentUser?.consecutiveCheckInDays ?? 0,
      checkInRewards: CHECK_IN_REWARDS,
      addPoints, 
      spendPoints, 
      toggleVip,
      login,
      socialLogin,
      loginWithCode,
      logout,
      checkIn,
    }}>
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
