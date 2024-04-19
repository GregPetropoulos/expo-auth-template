import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import { TextInput, View, Text } from '@/components/Themed';
import { useSession } from '@/store/context/authCtx';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const { onRegister, isLoading } = useSession();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const isInvalid = false; //TODO

  const registerHandler = () => {
    // Check all these values for validation
    const validUsername = '';
    const validPassword = '';
    const validConfirmPassword = '';
    const vaildEmail = '';
    const validConfirmEmail = '';
    const validUserData = {
      username: validUsername,
      password: validPassword,
      confirmPassword: validConfirmPassword,
      email: vaildEmail,
      confirmEmail: validConfirmEmail
    };

    onRegister(validUserData);
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace('/');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center'
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
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            onChangeText={setEmail}
            autoCapitalize='none'
            // keyboardType={keyboardType}
            // secureTextEntry={secure}
            value={email}
            placeholder='email'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Email</Text>
          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            onChangeText={setConfirmEmail}
            autoCapitalize='none'
            // keyboardType={keyboardType}
            // secureTextEntry={secure}
            value={confirmEmail}
            placeholder='confirm email'
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, isInvalid && styles.inputInvalid]}
            onChangeText={setConfirmPassword}
            autoCapitalize='none'
            // keyboardType={keyboardType}
            // secureTextEntry={secure}
            value={confirmPassword}
            placeholder='confirm password'
          />
        </View>
        <Button style={{ width: '50%' }} onPress={registerHandler}>
          Register
        </Button>
        <View style={styles.bottomTextContainer}>
          <Text>Already have an account?</Text>
          <Link href='/sign-in'>
            <Text style={styles.linkText}>Sign in </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40
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
