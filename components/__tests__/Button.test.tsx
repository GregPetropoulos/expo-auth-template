import { fireEvent, render, screen } from 'expo-router/testing-library';

import Button from '../Button';
// it('test',()=>{
//   console.log('tested button')
// })

// it('button', () => {
//   expect(1).toBe(1);
// });
describe(`Custom Button`, () => {
  it('Calls onPress function when the button is pressed', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<Button onPress={mockPress}>Sign In</Button>);
    const pressMeButton = getByTestId('CustomButton');
    fireEvent.press(pressMeButton);
    expect(mockPress).toHaveBeenCalled();
  });

  // const tree = render(<Button value={'Test'} onPress={mockPress}>SignIn</Button>);
  // expect(tree).toMatchSnapshot();
});
