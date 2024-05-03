
import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'react-native';
it('router-testing', async () => {
  const MockComponent = jest.fn(() => <View />);

  renderRouter(
    {
      index: MockComponent,
      'sign-in': MockComponent,
      'register': MockComponent
    },
    {
      initialUrl: 'sign-in'
    }
  );
  expect(screen).toHavePathname('/sign-in');
});
