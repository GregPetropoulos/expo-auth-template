import React from 'react';

import { Text, View } from './Themed';

interface Props {
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
}

const Error = ({ children, fontSize, color }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: fontSize ?? 16, color: color ?? 'red' }}>{children}</Text>
    </View>
  );
};

export default Error;
