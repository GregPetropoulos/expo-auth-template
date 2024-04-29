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

interface UserPayload {
  name: string;
  picture?: string;
  email?: string;
}
export interface UserAuthCreds {
  username?: string;
  email?: string;
  password: string;
}
export interface SignInError {
  message: string;
}

export interface AuthProps {
  authState: AuthState;
  onGoogleSignIn?: () => void;
  // onAppleSignIn: () => void; when I have Apple Developer account
  // appleAuthAvailable: boolean; when I have Apple Developer account
  onSignIn: (userData: UserAuthCreds) => void;
  onSignOut: () => void;
  onRegister: (userData: UserAuthCreds) => void;
  signInError: SignInError | null;
  loading: boolean;
}
//TODO  Need to check this custom fetch hook response
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
