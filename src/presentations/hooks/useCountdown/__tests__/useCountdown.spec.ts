import {renderHook, act} from '@testing-library/react-native';
import {useCountdown} from '../useCountdown';

jest.useFakeTimers();

const runOneSecond = () =>
  act(() => {
    jest.advanceTimersByTime(1000);
  });

const initialValue = 3;

const setup = () => {
  const result = renderHook(() => useCountdown(initialValue));
  return result;
};

test('should run countdown', () => {
  const {result} = setup();
  expect(result.current).toBe(initialValue);

  runOneSecond();
  expect(result.current).toBe(2);

  runOneSecond();
  expect(result.current).toBe(1);

  runOneSecond();
  expect(result.current).toBe(0);

  runOneSecond();
  expect(result.current).toBe(0);
});
