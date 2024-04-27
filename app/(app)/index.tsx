import User from '../../components/User';

import Button from '@/components/Button';
import { View, Text } from '@/components/Themed';
import { useAuth } from '@/store/context/authCtx';

export default function Index() {
  const { onSignOut, loading } = useAuth();

  const signoutHandler = () => {
    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
    onSignOut();
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 28 }}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 36, marginVertical: 20, textAlign: 'center' }}>
        Welcome You are authenticated
      </Text>
      <User />
      <Button onPress={signoutHandler}>Sign Out</Button>
    </View>
  );
}
