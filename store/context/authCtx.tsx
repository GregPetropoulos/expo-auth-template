import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import 'core-js/stable/atob';
// import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect, createContext, useContext } from 'react';

import { MOCK_FAKESTORE_AUTH_API, MOCK_FAKESTORE_REGISTER_API } from '@/__mocks__/mock-endpoints';
import { MOCK_USER_CREDS, MOCK_REGISTER_USER } from '@/__mocks__/mock-user';
import fetchUser from '@/http/fetchUser';
import { UserAuthCreds, SignInError, AuthProps, AuthState } from '@/types';

const TOKEN_KEY = 'my-jwt';

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: false },
  onGoogleSignIn: () => null,
  // onAppleSignIn: () => null, implement when I have Apple Developer account
  // appleAuthAvailable: false, when I have Apple Developer account
  onSignIn: () => null,
  onSignOut: () => null,
  onRegister: () => null,
  signInError: null,
  loading: false
});

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
  // const [appleAuthAvailable, setAppleAuthAvailable] = useState(false); when I have Apple Developer account
  const [signInError, setSignInError] = useState<SignInError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null
  });

  useEffect(() => {
    // GOOGLE
    GoogleSignin.configure({
      webClientId: '685384373741-4a8ti7ro9rtmqs7psn0rf7tbuq99ur9l.apps.googleusercontent.com',
      profileImageSize: 120
    }); //values from the google-services.json file

    // APPLE
    const checkAppleAvailable = async () => {
      // const isAvailable = await AppleAuthentication.isAvailableAsync(); bool
      // setAppleAuthAvailable(isAvailable); when I have Apple Developer account
    };
    checkAppleAvailable();
  }, []);

  // When app is fired up look for existing token from previous sign in
  useEffect(() => {
    const loadToken = async () => {
      const tokenStored = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored:', tokenStored);
      if (tokenStored) {
        setAuthState({ token: tokenStored, authenticated: true });
        router.replace('/');
        setSignInError(null);
      }
    };
    loadToken();
  }, []);

  // GOOGLE 3RD PARTY SIGN IN
  const googleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();

      const userResponse: any = await GoogleSignin.signIn();
      if (userResponse !== null) {
        setAuthState({ token: userResponse.idToken, authenticated: true });
        router.replace('/');
        setSignInError(null);
        setLoading(false);
      }
    } catch (er: any) {
      setSignInError({ message: er.message ?? 'See context for error' });
      setLoading(false);

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

  // TODO APPLE 3RD PARTY AUTH NEED APPLE DEVELOPER ACCOUNT
  // const appleSignIn = async () => {
  //   try {
  //     const credentials = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL
  //       ]
  //     });
  //     // may need to cache this in secure store, will return identityToken (jwt token) with above scopes
  //     console.log(credentials);
  //     setAuthState({
  //       token: credentials.identityToken,
  //       authenticated: true
  //     });
  //   } catch (er) {
  //     console.log(er);
  //   }
  // };

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

    //TODO IMPLEMENT CHECK IF USER ALREADY EXIST ON BACKEND
    if (data === undefined || typeof data === 'string') {
      setLoading(false);
      setSignInError({ message: data ?? 'Not Authenticated' });
    }

    // MOCKING NEWLY CREATED USER BASED OFF RESPONSE ID AND SIGN IN
    if (data.id) {
      signIn(MOCK_USER_CREDS);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        onGoogleSignIn: googleSignIn,
        // onAppleSignIn: appleSignIn, when I have Apple Developer account
        // appleAuthAvailable, when I have Apple Developer account
        onSignIn: signIn,
        onSignOut: signOut,
        onRegister: register,
        signInError,
        loading
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
