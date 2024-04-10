import { useState, useEffect } from 'react';

import { Link, router } from 'expo-router';
import { TextInput, View, Text } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { useSession } from '@/store/context/authCtx';
import { KyBoardTypes } from '@/enums/enums';
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';

export default function SignIn() {
  const [error, setError] = useState(null); //google sign in
  const [userInfo, setUserInfo] = useState <any>(null); //google sing in
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useSession();

  {
    /*
   ======Google Sign in======
        ===================
        ===================
         Needs to be imp with ctx 
         ==================
         ==================
         */
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "685384373741-4a8ti7ro9rtmqs7psn0rf7tbuq99ur9l.apps.googleusercontent.com"

    });
  }, []);

  const googleSignIn = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();

      const user: any = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(null);
    } catch (e: any) {
      setError(e);
    }
  };

  const googleLogout = (): void => {
    setUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };
  // ======Google Sign in======

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  let isInvalid = false; //TODO VALIDATION
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <View style={styles.form}>
        <Text style={styles.title}>App Sign In</Text>
        {/*
        ===================
        ===================
         Needs to be imp with ctx 
         ==================
         ==================
         */}
        <Text>Google Sign in</Text>
        <Text>{JSON.stringify({ error })}</Text>
        {userInfo && <Text>{JSON.stringify(userInfo.user )}</Text>}
        {userInfo ? (
          <Button onPress={googleLogout}>Logout</Button>
        ) : (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={googleSignIn}
          />
        )}

        {/*
        ===================
        ===================
         Needs to be imp with ctx 
         ==================
         ==================
         */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            onChangeText={setUsername}
            autoCapitalize='none'
            // keyboardType={keyboardType}
            // secureTextEntry={secure}
            value={username}
            placeholder='username'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            onChangeText={setPassword}
            autoCapitalize='none'
            // keyboardType={keyboardType}
            // secureTextEntry={secure}
            value={password}
            placeholder='password'
          />
        </View>
        <Button
          style={{ width: '50%' }}
          onPress={() => {
            signIn({
              username,
              password
            });
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace('/');
          }}>
          Sign in
        </Button>
        <View style={styles.bottomTextContainer}>
          <Text>Don't have an account </Text>
          <Link href='/register'>
            <Text style={styles.linkText}>Create a new user</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20
  },
  inputContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
    width: '100%'
  },
  title: {
    fontSize: 28
  },
  label: {
    marginBottom: 8,
    fontSize: 22
  },
  labelInvalid: {
    color: 'red' //Make part of theme later
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    // backgroundColor: Colors.primary10,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '600',
    minHeight: 60
  },
  inputInvalid: {
    backgroundColor: 'red' //Make part of theme later
  },
  bottomTextContainer: {
    marginVertical: 20
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'grey',
    opacity: 0.8
  }
});
