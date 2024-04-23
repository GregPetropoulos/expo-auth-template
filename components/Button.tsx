import { Pressable, StyleSheet } from 'react-native';

import { Text } from './Themed';

interface ButtonProps {
  children: string;
  onPress: () => void;
  style?: object;
  disabled?: boolean;
  buttonTextSize?: number;
  buttonColor?: string;
}
const Button = ({
  buttonTextSize,
  buttonColor,
  style,
  children,
  onPress,
  disabled
}: ButtonProps) => {
  return (
    <Pressable
      testID='CustomButton'
      android_ripple={{ color: 'blue' }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
        { backgroundColor: buttonColor ?? styles.button.backgroundColor }
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, { fontSize: buttonTextSize ?? styles.buttonText.fontSize }]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'blue',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },
  pressed: {
    opacity: 0.7
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  }
});
export default Button;
