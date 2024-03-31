import {FC, ComponentProps} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

type Props = ComponentProps<typeof Pressable> & {
  style?: StyleProp<ViewStyle>;
  secondary?: boolean;
  renderIcon?: (args: {style: StyleProp<TextStyle>}) => JSX.Element;
  children?: JSX.Element;
};

export const Button: FC<Props> = ({
  children = '',
  secondary: isSecondary,
  style,
  renderIcon,
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
        <Text style={[s.text, isSecondary ? s.textSecondary : s.textPrimary]}>
          {children}
          {renderIcon &&
            renderIcon({
              style: [s.text, isSecondary ? s.textSecondary : s.textPrimary],
            })}
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
    fontSize: 16,
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: '#5856D6',
  },
});
