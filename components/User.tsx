import { Image, useWindowDimensions, StyleSheet } from 'react-native';

import { View, Text } from './Themed';

import { useSession } from '@/store/context/authCtx';

const User = () => {
  const { userInfo } = useSession();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{userInfo?.username}</Text>
      <Image
        source={
          userInfo?.photo ? { uri: userInfo?.photo } : require('../assets/images/favicon.png')
        }
        height={width / 2}
        width={width / 2}
        resizeMode='contain'
      />
      <Text style={styles.email}>{userInfo?.email}</Text>
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
