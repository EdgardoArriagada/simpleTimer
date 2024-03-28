import {FC, ComponentProps} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type Props = Omit<ComponentProps<typeof Pressable>, 'style'>;

export const Button: FC<Props> = props => {
  const children = props.children || 'Button';

  return (
    <Pressable
      {...props}
      style={({pressed}) => [s.button, pressed && s.buttonPressed]}>
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
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: '#4746AB',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
