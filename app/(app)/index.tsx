import { View, Text } from '@/components/Themed';
import Button from '@/components/Button';
import { useSession } from '@/store/context/authCtx';

export default function Index() {
  const { signOut} = useSession();


  const signoutHandler = ()=> {
     // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
     signOut();
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:36, marginVertical:20, textAlign:'center'}}>Welcome You are authenticated</Text>
      <Button
        onPress={signoutHandler}>
        Sign Out
      </Button>
    </View>
  );
}
