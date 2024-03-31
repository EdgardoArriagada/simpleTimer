import {renderHook, act} from '@testing-library/react-native';
import {useSessionStore} from '../session-store';

jest.useFakeTimers();

const initialState = useSessionStore.getState();

const runOneSecond = () =>
  act(() => {
    jest.advanceTimersByTime(1000);
  });

const setup = () => {
  useSessionStore.setState(initialState);

  const {result} = renderHook(() => useSessionStore());
  return result;
};

it('should run countdown', () => {
  const result = setup();

  expect(result.current.countdown).toBe(0);

  act(() => {
    result.current.startCountdown(3);
  });

  expect(result.current.countdown).toBe(3);

  runOneSecond();
  expect(result.current.countdown).toBe(2);

  runOneSecond();
  expect(result.current.countdown).toBe(1);

  runOneSecond();
  expect(result.current.countdown).toBe(0);

  runOneSecond();
  expect(result.current.countdown).toBe(0);
});
