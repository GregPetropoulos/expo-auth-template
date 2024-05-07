import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { Text } from '../Themed';

describe('Testing Text', () => {
  it('displays the passed-in child as string', () => {
    render(<Text>App Sign In</Text>);
    expect(screen.getByText('App Sign In')).toBeDefined();
  });
});
