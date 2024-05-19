import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'react-native';

describe('register screens', () => {
  it('router testing for register screen pathname', async () => {
    const MockComponent = jest.fn(() => <View />);

    renderRouter(
      {
        index: MockComponent,
        register: MockComponent
      },
      {
        initialUrl: '/register'
      }
    );
    expect(screen).toHavePathname('/register');
  });
});
