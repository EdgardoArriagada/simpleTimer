import {{{levare::hook-name}}} from '../{{levare::hook-name}}';

const setup = () => {
  const result = renderHook(() => {{{levare::hook-name}}}());
  return result;
};

test('should return the initial value', () => {
  const { result } = setup();
  expect(result.current).toBe(0);
}
