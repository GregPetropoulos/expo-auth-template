import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';

//todo validate
//todo check form values get to the server
//todo check both devices

import Button from '@/components/Button';
import Error from '@/components/Error';
import Input from '@/components/Input';
import { View, Text } from '@/components/Themed';
import useHidePassword from '@/hooks/useHidePassword';
import { useSession } from '@/store/context/authCtx';
import { UserAuthCreds } from '@/types';

export default function Register() {
  const { onRegister, isLoading } = useSession();
  const { control, handleSubmit } = useForm<UserAuthCreds>();
  const { hidePassword, onPressHidePassword } = useHidePassword();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const isInvalid = false; //TODO

  const registerHandler = handleSubmit(
    ({ username, email, confirmEmail, password, confirmPassword }) => {
      // submit form to server via context only if validated data
      onRegister({ username, email, confirmEmail, password, confirmPassword });
    }
  );

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
                name='username'
                render={({ field: { onChange, value }, fieldState: { error } }) => {
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
                      {error && <Error>{error.message}</Error>}
                    </>
                  );
                }}
                rules={{ required: 'Enter your username' }}
              />
            </View>
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
                name='confirmEmail'
                render={({ field: { onChange, value }, fieldState: { error } }) => {
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
                      {error && <Error>{error.message}</Error>}
                    </>
                  );
                }}
                rules={{ required: 'Enter your confirmation email' }}
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
                      returnKeyType='next'
                      inputMode='text'
                      maxLength={10}
                      placeholder='enter password'
                      placeholderTextColor='grey'
                      value={value}
                      secure={hidePassword}
                      onChangeHandleText={onChange}
                    />

                    {error && <Error>{error.message}</Error>}
                  </>
                )}
                rules={{ required: 'Enter Password' }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name='confirmPassword'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                      />
                      <Ionicons
                        name={hidePassword ? 'eye-off' : 'eye'}
                        style={{ marginLeft: 3, marginTop: 25 }}
                        size={25}
                        color='grey'
                        onPress={onPressHidePassword}
                      />
                    </View>
                    {error && <Error>{error.message}</Error>}
                  </>
                )}
                rules={{ required: 'Enter your confirmation password' }}
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
    width: '90%'
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
