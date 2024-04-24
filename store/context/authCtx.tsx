import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';

import { mockEndpoint } from '@/__mocks__/mock-endpoints';
import { mockUserCreds, mockUser } from '@/__mocks__/mock-user';
import { useStorageState } from '@/hooks/useStorageState';
import { UserAuthCreds, GoogleAuthUserInfo, SignInError, User } from '@/types';

// TODO Create HTTP utility

const AuthContext = React.createContext<{
  onGoogleSignIn: () => void;
  onSignIn: (userData: UserAuthCreds) => void;
  onSignOut: () => void;
  onRegister: (userData: UserAuthCreds) => void;
  session?: string | null;
  isLoading: boolean;
  signInError: SignInError | null;
  userInfo: User | null;
}>({
  onGoogleSignIn: () => null,
  onSignIn: () => null,
  onSignOut: () => null,
  onRegister: () => null,
  session: null,
  isLoading: false,
  signInError: null,
  userInfo: null
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
  const [signInError, setSignInError] = useState<SignInError | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '685384373741-4a8ti7ro9rtmqs7psn0rf7tbuq99ur9l.apps.googleusercontent.com'
    }); //values from the google-services.json file
  }, []);

  // 3RD PARTY SIGN IN
  // GOOGLE
  const googleSignIn = async (): Promise<void> => {
    // setSignInError({ message: 'heyy' });
    try {
      await GoogleSignin.hasPlayServices();

      const userResponse: any = await GoogleSignin.signIn(); //TODO Type out the response
      // console.log("USER ANY", user)
      if (userResponse !== null) {
        const googleUser = {
          username: userResponse.user.name,
          photo: userResponse.user.photo,
          email: userResponse.user.email,
          id: userResponse.idToken
        };
        console.log('GOOGLE- USER****', googleUser);
        setUserInfo(googleUser);
        //can only log to a route when the session is set
        setSession('gggg');
        router.replace('/');
        setSignInError(null);
      }
    } catch (er: any) {
      setSignInError(er.message ?? { message: 'See context for error' });
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

  // APPLE
  // TODO ADD APPLE SIGN IN

  // USER ENTERS VALUES NO 3RD PARTY AUTH
  const signIn = (userData: UserAuthCreds) => {
    //TODO Get token from server
    // TODO Perform sign-in logic here
    // Send the userData to the backend or auth provider to check credentials and set the user info and token
    if (userData.email === 'mockuser@gmail.com') {
      setUserInfo(mockUser);
      setSession('xxx'); //temp for testing
      router.replace('/');
      setSignInError(null);
    }
  };

  const signOut = async () => {
    setSession(null);
    setUserInfo(null);
    setSignInError(null);

    // Sync call never rejects, wither returns null or userInfo
    // https://github.com/react-native-google-signin/google-signin#getcurrentuser
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
  };

  const register = async (userData: UserAuthCreds): Promise<void> => {
    try {
      //  Set user with response token from backend/middleware
      const response = await fetch(mockEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(userData)
        body: JSON.stringify(mockUserCreds) //!for testing
      });
      if (response.ok) {
        const jwtToken = await response.json();

        setUserInfo(mockUser); //use token to get the user data not directly set it here
        setSession('yyyy'); //!temp for testing
        router.replace('/');
      } else {
        throw new Error(
          `Network Error Status: ${response.statusText} Network Error Code: ${response.status}`
        );
      }
    } catch (er: any) {
      console.error(er);
      setSignInError(er.message ?? { message: 'See context for error' });
    }
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
        signInError,
        userInfo
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
