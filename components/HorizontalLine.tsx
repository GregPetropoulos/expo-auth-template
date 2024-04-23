import React from 'react';

import { View } from './Themed';

interface Props {
  children: React.ReactNode;
}

const HorizontalLine = ({ children }: Props) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
      }}>
      <View style={{ width: '40%', borderBottomColor: 'grey', borderBottomWidth: 2 }}></View>
      {children}
      <View style={{ width: '40%', borderBottomColor: 'grey', borderBottomWidth: 2 }}></View>
    </View>
  );
};

export default HorizontalLine;
