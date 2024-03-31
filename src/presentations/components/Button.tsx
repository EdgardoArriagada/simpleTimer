import {FC, ComponentProps} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {colors} from '../../config/theme';

type Props = ComponentProps<typeof Pressable> & {
  style?: StyleProp<ViewStyle>;
  secondary?: boolean;
  renderIcon?: (args: {style: StyleProp<TextStyle>}) => JSX.Element;
  children?: JSX.Element | string;
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
    backgroundColor: colors.primary,
  },
  buttonPrimaryPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonPrimaryDisabled: {
    backgroundColor: colors.gray,
  },
  buttonSecondaryPressed: {
    backgroundColor: colors.secondary,
  },
  buttonSecondaryDisabled: {},
  text: {
    fontSize: 16,
  },
  textPrimary: {
    color: 'white',
  },
  textPrimaryDisabled: {
    color: colors.lightGray,
  },
  textSecondary: {
    color: colors.primary,
  },
  textSecondaryDisabled: {
    color: colors.middleGray,
  },
});
