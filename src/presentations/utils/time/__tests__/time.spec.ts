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

describe('formatClockToSeconds', () => {
  it.each([
    ['00:00', 0],
    ['00:01', 1],
    ['00:59', 59],
    ['01:00', 60],
    ['01:01', 61],
    ['01:59', 119],
    ['02:00', 120],
  ])('formats clock to seconds', (clock, seconds) => {
    expect(formatClockToSeconds(clock)).toBe(seconds);
  });
});
