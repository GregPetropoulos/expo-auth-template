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
  email: string;
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
