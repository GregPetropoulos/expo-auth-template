import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from './Themed';

import { InputProps } from '@/types';

const Input = ({
  label,
  keyboardType,
  inputMode,
  secure,
  onChangeHandleText,
  value,
  placeholder,
  maxLength,
  returnKeyType,
  placeholderTextColor,
  onEndEditing,
  onSubmitEditing,
  icon,
  testID,
  accessibilityLabel,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputIconContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect={false}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          inputMode={inputMode}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onChangeHandleText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          accessibilityLabel={accessibilityLabel}
          // testID={testID}
        />
        {icon}
      </View>
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    flex: 1
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600'
  },
  inputIconContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 0,
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    minHeight: 60
  }
});
