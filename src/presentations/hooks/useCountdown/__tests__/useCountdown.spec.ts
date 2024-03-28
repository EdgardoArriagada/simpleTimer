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
  act(() => {
    result.current[2]();
  });
  expect(result.current[0]).toBe(initialValue);

  runOneSecond();
  expect(result.current[0]).toBe(2);

  runOneSecond();
  expect(result.current[0]).toBe(1);

  runOneSecond();
  expect(result.current[0]).toBe(0);

  runOneSecond();
  expect(result.current[0]).toBe(0);
});
