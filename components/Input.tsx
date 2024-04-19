import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from './Themed';

import { KyBoardTypes } from '@/enums/enums';

type InputProps = {
  label?: string | undefined;
  keyboardType?: KyBoardTypes;
  secure?: boolean;
  onUpdateValue: any;
  value: string;
  isInvalid?: boolean; //TODO CHANGE THIS AFTER IMPLEMENT VALIDATION
  placeholder?: string;
};
const Input = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize='none'
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
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
    color: 'white',
    marginBottom: 4
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
    fontWeight: '600'
  },
  inputInvalid: {
    backgroundColor: 'red' //Make part of theme later
  }
});
