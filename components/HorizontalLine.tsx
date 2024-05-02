import React from 'react';

import { View } from './Themed';

import { ChildrenProps } from '@/types';

const HorizontalLine = ({ children }: ChildrenProps) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
      }}
      testID='CustomHorizontalLineComponent'>
      <View style={{ width: '40%', borderBottomColor: 'grey', borderBottomWidth: 2 }}></View>
      {children}
      <View style={{ width: '40%', borderBottomColor: 'grey', borderBottomWidth: 2 }}></View>
    </View>
  );
};

export default HorizontalLine;
