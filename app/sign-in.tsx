import { useState } from 'react';

import { Link, router } from 'expo-router';
import { TextInput, View, Text } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { useSession } from '@/store/context/authCtx';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  let isInvalid = false;//TODO

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 1
      }}>
      <View style={styles.form}>
        <Text style={styles.title}>App Sign In</Text>
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
    color: 'purple',
    opacity: 0.8
  }
});
