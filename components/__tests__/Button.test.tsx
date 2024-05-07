import { fireEvent, render } from 'expo-router/testing-library';

import Button from '../Button';

describe(`Custom Button`, () => {
  it('Calls onPress function when the button is pressed', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<Button onPress={mockPress}>Sign In</Button>);
    const pressMeButton = getByTestId('CustomButton');
    fireEvent.press(pressMeButton);
    expect(mockPress).toHaveBeenCalled();
  });
});
