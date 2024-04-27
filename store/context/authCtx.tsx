import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect, createContext, useContext } from 'react';

import { MOCK_FAKESTORE_AUTH_API, MOCK_FAKESTORE_REGISTER_API } from '@/__mocks__/mock-endpoints';
import { MOCK_USER_CREDS, MOCK_USER, MOCK_REGISTER_USER } from '@/__mocks__/mock-user';
import { useStorageState } from '@/hooks/useStorageState';
import fetchUser from '@/http/fetchUser';
import {
  UserAuthCreds,
  GoogleAuthUserInfo,
  SignInError,
  User,
  AuthProps,
  AuthState
} from '@/types';


const TOKEN_KEY = 'my-jwt';

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: false },
  onGoogleSignIn: () => null,
  onSignIn: () => null,
  onSignOut: () => null,
  onRegister: () => null,
  session: null,
  isLoading: false,
  signInError: null,
  userInfo: null,
  loading: false
});

// This hook can be used to access the user info.
// export function useSession() {
//   const value = React.useContext(AuthContext);
//   if (process.env.NODE_ENV !== 'production') {
//     if (!value) {
//       throw new Error('useSession must be wrapped in a <SessionProvider />');
//     }
//   }
//   return value;
// }

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <AuthProvider />');
    }
  }
  return value;
};

export function AuthProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [signInError, setSignInError] = useState<SignInError | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '685384373741-4a8ti7ro9rtmqs7psn0rf7tbuq99ur9l.apps.googleusercontent.com',
      profileImageSize: 120
    }); //values from the google-services.json file
  }, []);

  // When app is fired up look for existing token from previous sign in
  useEffect(() => {
    const loadToken = async () => {
      const tokenStored = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored:', tokenStored);
      if (tokenStored) {
        // update state
        setAuthState({ token: tokenStored, authenticated: true });
        router.replace('/');
        setSignInError(null);
      }
    };
    loadToken();
  }, []);

  // GOOGLE 3RD PARTY SIGN IN
  const googleSignIn = async () => {
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
          id: userResponse.idToken // jwt token
        };
        setUserInfo(googleUser);
        setAuthState({ token: userResponse.idToken, authenticated: true });
        router.replace('/');
        setSignInError(null);
      }
    } catch (er: any) {
      setSignInError({ message: er.message ?? 'See context for error' });
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

  // APPLE 3RD PARTY AUTH
  // TODO ADD APPLE SIGN IN

  // USER ENTERS SING IN CREDS FOR CUSTOM BACKEND, NO 3RD PARTY AUTH
  const signIn = async (userData: UserAuthCreds) => {
    setLoading(true);
    setSignInError(null);
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: '*/*' },
      //testing on the fakestore api requires a username in MOCK_USER_CREDS, My UI built for email
      body: JSON.stringify(MOCK_USER_CREDS)
    };
    const data = await fetchUser(MOCK_FAKESTORE_AUTH_API, config);

    if (data === undefined || typeof data === 'string') {
      setLoading(false);
      setSignInError({ message: data ?? 'Not Authenticated' });
    }

    if (data.token) {
      setAuthState({ token: data.token, authenticated: true });
      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      router.replace('/');
      setSignInError(null);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setAuthState({ token: null, authenticated: false });
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setSession(null);
    setUserInfo(null);
    setSignInError(null);

    /*
    GOOGLE SIGNOUT
    Sync call never rejects, either returns null or user object
    https://github.com/react-native-google-signin/google-signin#getcurrentuser
    */
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
  };

  const register = async (userData: UserAuthCreds) => {
    setLoading(true);
    setSignInError(null);
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: '*/*' },
      body: JSON.stringify(MOCK_REGISTER_USER)
    };
    const data = await fetchUser(MOCK_FAKESTORE_REGISTER_API, config);

    //TODO IMPLEMENT CHECK IF USER ALREADY EXIST
    if (data === undefined || typeof data === 'string') {
      setLoading(false);
      setSignInError({ message: data ?? 'Not Authenticated' });
    }

    // MOCKING NEW CREATED USER BASED OFF RESPONSE ID AND SIGN IN
    if (data.id) {
      signIn(MOCK_USER_CREDS);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        onGoogleSignIn: googleSignIn,
        onSignIn: signIn,
        onSignOut: signOut,
        onRegister: register,
        session,
        isLoading,
        signInError,
        userInfo,
        loading
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
