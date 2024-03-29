import {FC, ComponentProps} from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';

type Props = ComponentProps<typeof Pressable> & {
  style?: StyleProp<ViewStyle>;
};

export const Button: FC<Props> = props => {
  const children = props.children || 'Button';

  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        s.button,
        props.style,
        pressed && s.buttonPressed,
      ]}>
      {typeof children === 'string' ? (
        <Text style={s.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const s = StyleSheet.create({
  button: {
    backgroundColor: '#5856D6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonPressed: {
    backgroundColor: '#4746AB',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
