import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'react-native';

describe('app router screens', () => {
  it('router testing for sign-in screen and register screen', async () => {
    const MockComponent = jest.fn(() => <View />);

    renderRouter(
      {
        index: MockComponent,
        'sign-in': MockComponent,
        register: MockComponent
      },
      {
        initialUrl: 'sign-in'
      }
    );

    // await screen.getByRole('header')
    expect(screen).toHavePathname('/sign-in');
  });
});
