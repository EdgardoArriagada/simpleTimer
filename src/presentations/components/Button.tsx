import {FC, ComponentProps} from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';

type Props = ComponentProps<typeof Pressable> & {
  style?: StyleProp<ViewStyle>;
  secondary?: boolean;
};

export const Button: FC<Props> = ({
  children = 'Button',
  secondary: isSecondary,
  style,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        s.button,
        !isSecondary && s.buttonPrimary,
        pressed
          ? isSecondary
            ? s.buttonSecondaryPressed
            : s.buttonPrimaryPressed
          : null,
        style,
      ]}>
      {typeof children === 'string' ? (
        <Text style={[s.text, isSecondary ? s.textSecondary : s.text]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const s = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonPrimary: {
    backgroundColor: '#5856D6',
  },
  buttonPrimaryPressed: {
    backgroundColor: '#4746AB',
  },
  buttonSecondaryPressed: {
    backgroundColor: '#c4c3f7',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  textSecondary: {
    color: '#5856D6',
    fontSize: 16,
  },
});
