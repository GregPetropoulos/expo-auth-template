import { render, screen } from '@testing-library/react-native';
import React from 'react';

import Button from '../Button';
import { Text, View, TextInput } from '../Themed';

describe('Testing Accessible Components', () => {
  it('Accessibility of Text', async () => {
    render(<Text accessibilityRole='header'>App Sign In</Text>);
    expect(screen.getByRole('header', { name: 'App Sign In' }));
  });

  it('Accessibility of a basic form', async () => {
    const mockInput = jest.fn(() => 'user input');
    render(
      <View>
        <Text nativeID='formLabel' accessibilityRole='text' accessibilityLabel='Some text lorem'>
          This is some text
        </Text>
        <TextInput
          accessibilityLabel='input'
          accessibilityLabelledBy='formLabel'
          value={''}
          onChangeText={mockInput}
        />
      </View>
    );
    screen.getByRole('text', { name: 'This is some text' });
    expect(screen.getByLabelText('input'));
  });
  it('Accessibility of submission button', () => {
    const mockOnPress = jest.fn();
    render(<Button onPress={mockOnPress}>Submit Test</Button>);
    expect(screen.getByRole('button'));
  });
});
