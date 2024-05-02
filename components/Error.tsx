import React from 'react';

import { Text, View } from './Themed';

import { ErrorProps } from '@/types';

const Error = ({ children, fontSize, color }: ErrorProps) => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      testID='ErrorComponent'>
      <Text style={{ fontSize: fontSize ?? 16, color: color ?? 'red' }}>{children ?? 'Error'}</Text>
    </View>
  );
};

export default Error;
