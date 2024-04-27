// Libs
import Ionicons from '@expo/vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as yup from 'yup';

// Custom Components, Hooks etc...
import Button from '@/components/Button';
import Error from '@/components/Error';
import HorizontalLine from '@/components/HorizontalLine';
import Input from '@/components/Input';
import { View, Text } from '@/components/Themed';
import useHidePassword from '@/hooks/useHidePassword';
import { useAuth } from '@/store/context/authCtx';
import { UserAuthCreds } from '@/types';

export default function SignIn() {
  const { onSignIn, onGoogleSignIn, signInError, loading } = useAuth();
  const { hidePassword, onPressHidePassword } = useHidePassword();

  // Validation
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must contain between 6 and 10 characters')
  });
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // APPLE SIGN IN

  const onSubmitSignIn = handleSubmit(({ password, email }: UserAuthCreds) => {
    // Yup validated data gets sent to context then to server for a token
    onSignIn({ email, password });
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

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
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, value } }) => {
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
                      {errors.email && <Error>{errors.email.message}</Error>}
                    </>
                  );
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='password'
                render={({ field: { onChange, value } }) => (
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
                      icon={
                        <Ionicons
                          name={hidePassword ? 'eye-off' : 'eye'}
                          style={{ marginRight: 4 }}
                          size={25}
                          color='grey'
                          onPress={onPressHidePassword}
                        />
                      }
                    />
                    {errors.password && <Error>{errors.password.message}</Error>}
                  </>
                )}
              />
            </View>
            {signInError !== null && (
              <Error
                fontSize={18}
                color='red'>{`Sign in error: ${signInError.message ?? 'UnAuthenticated'}`}</Error>
            )}
            <View style={styles.bottomTextContainer}>
              <Button
                buttonTextSize={18}
                buttonColor='#663399'
                style={styles.buttonStyle}
                onPress={onSubmitSignIn}>
                Sign in
              </Button>
              <Text>Don't have an account?</Text>
              <Link href='/register'>
                <Text style={styles.linkText}>Create a new user</Text>
              </Link>
            </View>
            <HorizontalLine>
              <Text style={{ marginHorizontal: 10 }}>OR</Text>
            </HorizontalLine>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={onGoogleSignIn}
              testID='GoogleSigninButton'
              // disabled={password.length > 0 || username.length > 0}
            />
            {/* APPLE AUTH SING IN HERE */}
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
    width: '100%'
  },
  title: {
    fontSize: 28
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '600',
    minHeight: 60
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%'
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'grey',
    opacity: 0.8
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%'
  }
});
