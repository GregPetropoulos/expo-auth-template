import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';

import { useStorageState } from '@/hooks/useStorageState';

interface UserData {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  confirmEmail?: string;
}

// based off the google userinfo
interface UserInfo {
  idToken: string;
  serverAuthCode: string;
  scopes: string[];
  user: {
    email: string;
    id: string;
    givenName: string;
    familyName: string;
    photo: string; // url
    name: string; // full name
  };
}
const AuthContext = React.createContext<{
  onGoogleSignIn: () => void;
  onSignIn: (userData: UserData) => void;
  onSignOut: () => void;
  onRegister: (userData: UserData) => void;
  session?: string | null;
  isLoading: boolean;
  error: object | null;
  userInfo: UserInfo;
}>({
  onGoogleSignIn: () => null,
  onSignIn: () => null,
  onSignOut: () => null,
  onRegister: () => null,
  session: null,
  isLoading: false,
  error: null,
  userInfo: {
    idToken: '',
    serverAuthCode: '',
    scopes: [],
    user: {
      email: '',
      id: '',
      givenName: '',
      familyName: '',
      photo: '', // url
      name: '' // full name
    }
  }
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
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '685384373741-4a8ti7ro9rtmqs7psn0rf7tbuq99ur9l.apps.googleusercontent.com'
    }); //values from the google-services.json file
  }, []);

  const googleSignIn = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();

      const user: any = await GoogleSignin.signIn();
      if (user !== null) {
        setUserInfo(user);
        //can only log to a route when the session is set
        setSession('yyy');
        router.replace('/');
        setError(null);
      }
    } catch (er: any) {
      setError(er);
      if (er instanceof Error) {
        console.log(er);
        if (er.message === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (er.message === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (er.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    }
  };

  // USER ENTERS VALUES NO 3RD PARTY AUTH
  const signIn = (userData: UserData) => {
    // TODO Perform sign-in logic here

    // Send the userData to the backend or auth provider to check credentials and set the user info and token
    if (userData.username === 'test') {
      const mockUser = {
        idToken: '',
        serverAuthCode: '',
        scopes: [],
        user: {
          email: 'test@email.com',
          id: '123id',
          givenName: 'John',
          familyName: 'Doe',
          photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D', // url
          name: 'John Doe' // full name
        }
      };
      setUserInfo(mockUser);
      setSession('xxx'); //temp for testing
      router.replace('/');
    }
  };

  const signOut = async () => {
    setSession(null);
    setUserInfo(null);

    // Sync call never rejects, wither returns null or userInfo
    // https://github.com/react-native-google-signin/google-signin#getcurrentuser
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
  };
  const register = (userData: UserData) => {
    setSession('xxx'); //temp for testing
  };
  return (
    <AuthContext.Provider
      value={{
        onGoogleSignIn: googleSignIn,
        onSignIn: signIn,
        onSignOut: signOut,
        onRegister: register,
        session,
        isLoading,
        error,
        userInfo
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
