import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email?: string;
  telegram_connected: boolean;
  telegram_username?: string;
}

interface Profile {
  id?: number;
  user_id?: number;
  date_of_birth?: string;
  height?: number;
  weight?: number;
  gender?: string;
  blood_type?: string;
}

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  authenticated: boolean;
  refreshUser: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const refreshUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setUser(null);
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/profile`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setProfile(data.profile);
        setAuthenticated(true);
      } else {
        setUser(null);
        setProfile(null);
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setProfile(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`/api/users/${userId}/profile`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  useEffect(() => {
    // Check if user is authenticated on mount
    const userId = localStorage.getItem('userId');
    if (userId) {
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        authenticated,
        refreshUser,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
