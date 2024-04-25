import Ionicons from '@expo/vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';

//todo check both devices

import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import { View, Text } from '@/components/Themed';
import useHidePassword from '@/hooks/useHidePassword';
import { useSession } from '@/store/context/authCtx';

export default function Register() {
  const { onRegister, isLoading, signInError } = useSession();
  const { hidePassword, onPressHidePassword } = useHidePassword();
  const schema = yup.object().shape({
    username: yup.string(),
    email: yup.string().required('Email is required').email('Invalid email'),
    confirmEmail: yup.string().required('Confirm Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must contain between 6 and 10 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .min(6, 'Confirm Password must contain between 6 and 10 characters')
  });
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    }
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const registerHandler = handleSubmit(({ username, email, password }) => {
    // submit form to server via context only if validated data
    // Yup validated data gets sent to context then to server for a response token
    onRegister({ username, email, password });
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}>
          <View style={styles.form}>
            <Text style={styles.title}>App Register User</Text>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{ required: true }}
                name='username'
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <Input
                        label='Username'
                        returnKeyType='next'
                        inputMode='text'
                        maxLength={50}
                        placeholder='enter username'
                        placeholderTextColor='grey'
                        value={value}
                        onChangeHandleText={onChange}
                      />
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
                name='confirmEmail'
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <Input
                        label='Confirm Email'
                        returnKeyType='next'
                        inputMode='email'
                        maxLength={50}
                        placeholder='enter confirmed email'
                        placeholderTextColor='grey'
                        value={value}
                        onChangeHandleText={onChange}
                      />
                      {errors.confirmEmail && <Error>{errors.confirmEmail.message}</Error>}
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
                      returnKeyType='next'
                      inputMode='text'
                      maxLength={10}
                      placeholder='enter password'
                      placeholderTextColor='grey'
                      value={value}
                      secure={hidePassword}
                      onChangeHandleText={onChange}
                    />
                    {errors.password && <Error>{errors.password.message}</Error>}
                  </>
                )}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='confirmPassword'
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      label=' Confirm Password'
                      returnKeyType='send'
                      inputMode='text'
                      maxLength={10}
                      placeholder='enter confirmed password'
                      placeholderTextColor='grey'
                      value={value}
                      secure={hidePassword}
                      onChangeHandleText={onChange}
                      onSubmitEditing={registerHandler}
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
                    {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
                  </>
                )}
              />
            </View>
            {signInError !== null && (
              <Error
                fontSize={18}
                color='red'>{`Sign in error: ${signInError.message ?? 'Not Authorized'}`}</Error>
            )}
            <View style={styles.bottomTextContainer}>
              <Button style={styles.buttonStyle} onPress={registerHandler}>
                Register
              </Button>
              <Text>Already have an account?</Text>
              <Link href='/sign-in'>
                <Text style={styles.linkText}>Sign in </Text>
              </Link>
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
    width: '100%'
  },
  title: {
    fontSize: 28
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    width: '100%'
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'grey',
    opacity: 0.8
  },
  buttonStyle: {
    marginBottom: 15,
    width: '100%'
  }
});
