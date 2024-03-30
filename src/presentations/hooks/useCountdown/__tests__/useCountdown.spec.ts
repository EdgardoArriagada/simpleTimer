import {renderHook, act} from '@testing-library/react-native';
import {useCountdown} from '../useCountdown';

jest.useFakeTimers();

const runOneSecond = () =>
  act(() => {
    jest.advanceTimersByTime(1000);
  });

const initialValue = 3;

const setup = () => {
  const onFinish = jest.fn();

  const result = renderHook(() => useCountdown(onFinish));
  return {...result, onFinish};
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

it('should run onFinish fn', () => {
  const initialSeconds = 2;
  const {result, onFinish} = setup();

  expect(onFinish).not.toHaveBeenCalled();

  act(() => {
    result.current[2](initialSeconds);
  });

  runOneSecond();

  expect(onFinish).not.toHaveBeenCalled();

  runOneSecond();

  expect(onFinish).toHaveBeenCalledTimes(1);
  expect(onFinish).toHaveBeenCalledWith(initialSeconds);
});
