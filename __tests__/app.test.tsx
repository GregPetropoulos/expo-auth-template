import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'react-native';

describe('app router screens', () => {
  it('router testing for sign-in screen pathname', async () => {
    const MockComponent = jest.fn(() => <View />);

    renderRouter(
      {
        index: MockComponent,
        'sign-in': MockComponent,
        '/register': MockComponent
      },
      {
        initialUrl: 'sign-in'
      }
    );
    expect(screen).toHavePathname('/sign-in');
  });
});
