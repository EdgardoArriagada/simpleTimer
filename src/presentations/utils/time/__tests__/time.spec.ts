import {formatSecondsToClock} from '../time';

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
