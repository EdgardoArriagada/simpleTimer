import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#5856D6',
  primaryDark: '#4746AB',
  secondary: '#C4C3F7',
  gray: '#C7C5C5',
  lightGray: '#DBD9D9',
  middleGray: '#B3B3B3',
};

export const gs = StyleSheet.create({
  seriesLog: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  repeatsLog: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '500',
  },
  countdownContainer: {
    margin: 20,
  },
  countdown: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: '700',
  },
});
