import React from 'react';
import { useStorageState } from '@/hooks/useStorageState';

interface UserData {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  confirmEmail?: string;
}

const AuthContext = React.createContext<{
  signIn: (userData: UserData) => void;
  signOut: () => void;
  register: (userData: UserData) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  register: () => null,
  session: null,
  isLoading: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const onSignIn = (userData: UserData) => {
    // TODO Perform sign-in logic here

    const userCreds = {
      username: userData.username,
      password: userData.password,
      date: new Date()
    };

    // Send the userData to the backend or auth provider to check credentials and set the token
    if (userData.username === 'test') {
      setSession('xxx');//temp for testing
    }
  };

  const onSignOut = () => {
    setSession(null);
  };
  const onRegister = (userData: UserData) => {
    setSession('xxx');//temp for testing
  };
  return (
    <AuthContext.Provider
      value={{
        signIn: onSignIn,
        signOut: onSignOut,
        register: onRegister,
        session,
        isLoading
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
