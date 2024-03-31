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
  disabled,
  ...props
}) => {
  const textProps = [
    s.text,
    isSecondary ? s.textSecondary : s.textPrimary,
    disabled && (isSecondary ? s.textSecondaryDisabled : s.textPrimaryDisabled),
  ];

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({pressed}) => [
        s.button,
        !isSecondary && s.buttonPrimary,
        disabled &&
          (isSecondary ? s.buttonSecondaryDisabled : s.buttonPrimaryDisabled),
        pressed
          ? isSecondary
            ? s.buttonSecondaryPressed
            : s.buttonPrimaryPressed
          : null,
        style,
      ]}>
      {typeof children === 'string' ? (
        <Text style={textProps}>
          {children}
          {renderIcon &&
            renderIcon({
              style: textProps,
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
  buttonPrimaryDisabled: {
    backgroundColor: '#c7c5c5',
  },
  buttonSecondaryPressed: {
    backgroundColor: '#c4c3f7',
  },
  buttonSecondaryDisabled: {},
  text: {
    fontSize: 16,
  },
  textPrimary: {
    color: 'white',
  },
  textPrimaryDisabled: {
    color: '#dbd9d9',
  },
  textSecondary: {
    color: '#5856D6',
  },
  textSecondaryDisabled: {
    color: '#b3b3b3',
  },
});
