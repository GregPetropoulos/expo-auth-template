import User from '../../components/User';

import Button from '@/components/Button';
import { View, Text } from '@/components/Themed';
import { useSession } from '@/store/context/authCtx';

export default function Index() {
  const { isLoading, onSignOut } = useSession();

  const signoutHandler = () => {
    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
    onSignOut();
  };
  if (isLoading) {
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
