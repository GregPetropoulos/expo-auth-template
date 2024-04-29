import { jwtDecode } from 'jwt-decode'; //Make sure this verifys not jus decode
import { Image, useWindowDimensions, StyleSheet } from 'react-native';

import { View, Text } from './Themed';

import { useAuth } from '@/store/context/authCtx';
import { UserPayload, TODO } from '@/types';

const User = () => {
  const { authState } = useAuth();
  const { width } = useWindowDimensions();
  //The token should be verified before decoded and
  //this should occur on the backend middleware before gets here
  const payload = authState.token && jwtDecode<TODO>(authState.token); // returns payload

  //For advanced features like user CRUD ops, make the user into a state variable
  const user: UserPayload | null = {
    name: payload.user || payload.name,
    picture: payload.picture,
    email: payload.email
  };
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user.name}</Text>
      <Image
        source={user.picture ? { uri: user.picture } : require('../assets/images/favicon.png')}
        height={width / 2}
        width={width / 2}
        resizeMode='contain'
      />
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};
export default User;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'red',
    borderWidth: 2,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: { marginVertical: 6 },
  email: { marginVertical: 6 }
});
