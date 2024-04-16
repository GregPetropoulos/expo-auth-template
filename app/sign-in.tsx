import { useState } from 'react';

import { Link} from 'expo-router';
import { TextInput, View, Text } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { useSession } from '@/store/context/authCtx';
import { KyBoardTypes } from '@/enums/enums';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

//TODO VALIDATION

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onSignIn, onGoogleSignIn, error, isLoading } = useSession();

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
        {/* Show a modal for the error */}
        <Text>{JSON.stringify({ error })}</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleSignIn}
        />

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
            onSignIn({
              username,
              password
            });
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            // router.replace('/');
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
