import { Pressable,StyleSheet } from 'react-native';
import { Text, View } from './Themed';

interface ButtonProps {
  children:string;
  onPress:()=>void;
  style?:Object
}
const Button = ({style, children, onPress }:ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed,style]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'blue',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor:'blue',
    fontSize: 16,
    fontWeight: '600'
  }
});
