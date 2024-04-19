import { Image, useWindowDimensions } from 'react-native';

import { View, Text } from './Themed';

interface UserProps {
  userData: {
    email: string;
    id: string;
    photo: string; // url
    name: string; // full name
  };
}
const User = ({ userData }: UserProps) => {
  const { width } = useWindowDimensions();
  const { name, email, photo } = userData;
  return (
    <View
      style={{
        width: '100%',
        borderColor: 'red',
        borderWidth: 2,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text style={{ marginVertical: 6 }}>{name}</Text>
      <Image source={{ uri: photo }} height={width / 2} width={width / 2} resizeMode='contain' />
      <Text style={{ marginVertical: 6 }}>{email}</Text>
    </View>
  );
};
export default User;
