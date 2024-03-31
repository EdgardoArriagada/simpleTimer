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
  repeatsLogContainer: {
    padding: 10,
  },
  seriesLogContainer: {
    padding: 10,
  },
  seriesLog: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  repeatsLog: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '500',
  },
  countdown: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.secondary,
    color: colors.primary,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
