import {formatSecondsToClock, formatClockToSeconds} from '../time';

describe('formatSecondsToClock', () => {
  it('formats seconds to clock', () => {
    expect(formatSecondsToClock(0)).toBe('00:00');
    expect(formatSecondsToClock(1)).toBe('00:01');
    expect(formatSecondsToClock(59)).toBe('00:59');
    expect(formatSecondsToClock(60)).toBe('01:00');
    expect(formatSecondsToClock(61)).toBe('01:01');
    expect(formatSecondsToClock(119)).toBe('01:59');
    expect(formatSecondsToClock(120)).toBe('02:00');
  });
});

describe('formatClockToSeconds', () => {
  it('formats clock to seconds', () => {
    expect(formatClockToSeconds('00:00')).toBe(0);
    expect(formatClockToSeconds('00:01')).toBe(1);
    expect(formatClockToSeconds('00:59')).toBe(59);
    expect(formatClockToSeconds('01:00')).toBe(60);
    expect(formatClockToSeconds('01:01')).toBe(61);
    expect(formatClockToSeconds('01:59')).toBe(119);
    expect(formatClockToSeconds('02:00')).toBe(120);
  });
});
