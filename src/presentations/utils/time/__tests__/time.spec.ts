import {formatSecondsToClock, formatClockToSeconds} from '../time';

describe('formatSecondsToClock', () => {
  it.each([
    [0, '00:00'],
    [1, '00:01'],
    [59, '00:59'],
    [60, '01:00'],
    [61, '01:01'],
    [119, '01:59'],
    [120, '02:00'],
  ])('formats seconds to clock', (seconds, clock) => {
    expect(formatSecondsToClock(seconds)).toBe(clock);
  });
});
