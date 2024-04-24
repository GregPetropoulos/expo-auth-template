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
  isInvalid,
  placeholder,
  maxLength,
  returnKeyType,
  placeholderTextColor,
  onEndEditing,
  onSubmitEditing,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
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
      />
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    width: '100%'
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600'
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
  }
});
