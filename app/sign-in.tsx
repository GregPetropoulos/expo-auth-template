import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

import Button from '@/components/Button';
import Error from '@/components/Error';
import HorizontalLine from '@/components/HorizontalLine';
import Input from '@/components/Input';
import { View, Text } from '@/components/Themed';
import { useSession } from '@/store/context/authCtx';

type SignInForm = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const { onSignIn, onGoogleSignIn, signInError, isLoading } = useSession();
  const { control, handleSubmit } = useForm<SignInForm>();

  const onPressHidePassword = () => setHidePassword(!hidePassword);

  const onSubmitSignIn = handleSubmit(({ password, email }) => {
    // submit form to server via context
    onSignIn({ email, password });
  });
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const isInvalid = false; //TODO VALIDATION
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}>
          <View style={styles.form}>
            <Text style={styles.title}>App Sign In</Text>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <>
                      <Input
                        label='Email'
                        returnKeyType='next'
                        inputMode='email'
                        maxLength={50}
                        placeholder='enter email'
                        placeholderTextColor='grey'
                        value={value}
                        onChangeHandleText={onChange}
                      />
                      {error && <Error>{error.message}</Error>}
                    </>
                  );
                }}
                rules={{ required: 'Enter your email' }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <Input
                      label='Password'
                      returnKeyType='send'
                      inputMode='text'
                      maxLength={10}
                      placeholder='enter password'
                      placeholderTextColor='grey'
                      secure={hidePassword}
                      value={value}
                      onChangeHandleText={onChange}
                      onSubmitEditing={onSubmitSignIn}
                    />
                    {error && <Error>{error.message}</Error>}
                  </>
                )}
                rules={{ required: 'Enter Password' }}
              />
            </View>
            <HorizontalLine>
              <Text style={{ marginHorizontal: 10 }}>OR</Text>
            </HorizontalLine>
            {signInError !== null && (
              <Error
                fontSize={18}
                color='red'>{`Google sign in error: ${signInError.message ?? 'Check your google account'}`}</Error>
            )}
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={onGoogleSignIn}
              testID='GoogleSigninButton'
              // disabled={password.length > 0 || username.length > 0}
            />
            <View style={styles.bottomTextContainer}>
              <Button
                buttonTextSize={18}
                buttonColor='#663399'
                style={{ marginTop: 10, marginBottom: 20 }}
                onPress={onSubmitSignIn}>
                Sign in
              </Button>
              <Text>
                <Text>Don't have an account </Text>
                <Link href='/register'>
                  <Text style={styles.linkText}>Create a new user</Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  inputContainer: {
    marginVertical: 16,
    // marginHorizontal: 8,
    width: '100%'
  },
  title: {
    fontSize: 28
  },
  labelInvalid: {
    color: 'red' //Make part of theme later
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
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
