import { ReactElement } from 'react';
import { InputModeOptions, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';

export type InputProps = {
  label?: string | undefined;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onChangeHandleText: any;
  value: string | undefined;
  placeholder?: string;
  maxLength?: number;
  returnKeyType?: ReturnKeyTypeOptions;
  placeholderTextColor?: string;
  inputMode?: InputModeOptions;
  onEndEditing?: () => void;
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
  icon?: ReactElement;
};

export interface ButtonProps {
  children: string;
  onPress: () => void;
  style?: object;
  disabled?: boolean;
  buttonTextSize?: number;
  buttonColor?: string;
}
export interface ErrorProps {
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface User {
  username: string; // full name
  photo?: string; // url
  email: string;
  id: string; // get id from backend
}
export interface UserAuthCreds {
  username?: string;
  email?: string;
  password: string;
}

// based off the google userinfo
export interface GoogleAuthUserInfo {
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

export interface SignInError {
  message: string;
}

export interface AuthProps {
  authState: { token: string | null; authenticated: boolean | null };
  onGoogleSignIn?: () => void;
  onSignIn: (userData: UserAuthCreds) => void;
  onSignOut: () => void;
  onRegister: (userData: UserAuthCreds) => void;
  session: string | null;
  isLoading: boolean;
  signInError: SignInError | null;
  userInfo: User | null;
  loading: boolean;
}

export interface APIResponse {
  data: TODO;
  loading: boolean;
  errorMessage: string | null;
  refetch: () => void;
}
export interface APIConfig {
  method: string;
  headers: {
    'Content-Type': string;
    Accept: string;
  };
  body: string;
}
export interface AuthState {
  token: string | null;
  authenticated: boolean | null;
}
export interface FetchUserResponse {
  token?: string;
  data?: object;
  id: string;
  errorMessage?: string;
}
export type TODO = any;
