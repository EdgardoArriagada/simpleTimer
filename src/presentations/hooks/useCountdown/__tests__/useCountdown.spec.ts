import {renderHook, act} from '@testing-library/react-native';
import {useCountdown} from '../useCountdown';

jest.useFakeTimers();

const runOneSecond = () =>
  act(() => {
    jest.advanceTimersByTime(1000);
  });

const initialValue = 3;

const setup = () => {
  const result = renderHook(() => useCountdown());
  return result;
};

const getExpect = (args: {countdown: number; isRunning: boolean}) => [
  args.countdown,
  args.isRunning,
  expect.any(Function),
];

const CLEAR_STATE = [0, false, expect.any(Function)] as const;

it('should run countdown', () => {
  const {result} = setup();

  expect(result.current).toStrictEqual(CLEAR_STATE);

  act(() => {
    result.current[2](initialValue);
  });

  expect(result.current).toStrictEqual(
    getExpect({
      countdown: initialValue,
      isRunning: true,
    }),
  );

  runOneSecond();

  expect(result.current).toStrictEqual(
    getExpect({
      countdown: initialValue - 1,
      isRunning: true,
    }),
  );

  runOneSecond();

  expect(result.current).toStrictEqual(
    getExpect({
      countdown: initialValue - 2,
      isRunning: true,
    }),
  );

  runOneSecond();

  expect(result.current).toStrictEqual(CLEAR_STATE);

  runOneSecond();

  expect(result.current).toStrictEqual(CLEAR_STATE);
});

it('should not run countdown if not started', () => {
  const {result} = setup();

  runOneSecond();

  expect(result.current).toStrictEqual(CLEAR_STATE);
});
