import {renderHook, act} from '@testing-library/react-native';
import {SessionStore, useSessionStore} from '../session-store';

jest.useFakeTimers();

const initialState = useSessionStore.getState();

const runOneSecond = () =>
  act(() => {
    jest.advanceTimersByTime(1000);
  });

const startAndFinishCountdown = (result: {current: SessionStore}) => {
  act(() => {
    result.current.startCountdown(1);
  });
  runOneSecond();
  runOneSecond();
};

const setup = () => {
  useSessionStore.setState(initialState);

  const {result} = renderHook(() => useSessionStore());
  return result;
};

describe('When running countdown', () => {
  it('should decrease to 0', () => {
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

  it('should set logs properly', () => {
    const result = setup();
    expect(result.current.seriesLog).toStrictEqual([]);
    expect(result.current.repeatsLog).toStrictEqual([]);

    startAndFinishCountdown(result);

    expect(result.current.seriesLog).toStrictEqual([]);
    expect(result.current.repeatsLog).toStrictEqual(['00:01']);

    startAndFinishCountdown(result);

    expect(result.current.seriesLog).toStrictEqual([]);
    expect(result.current.repeatsLog).toStrictEqual(['00:01', '00:01']);

    startAndFinishCountdown(result);

    expect(result.current.seriesLog).toStrictEqual([]);
    expect(result.current.repeatsLog).toStrictEqual([
      '00:01',
      '00:01',
      '00:01',
    ]);

    startAndFinishCountdown(result);

    expect(result.current.seriesLog).toStrictEqual([
      'Serie of 4 repeats finished',
    ]);
    expect(result.current.repeatsLog).toStrictEqual([]);
  });
});
