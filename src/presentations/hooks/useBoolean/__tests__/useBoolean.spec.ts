import {renderHook} from '@testing-library/react-native';
import {useBoolean} from '../useBoolean';

const setup = () => {
  const result = renderHook(() => useBoolean());
  return result;
};

test('should return the initial value', () => {
  const {result} = setup();
  expect(result.current).toBe(0);
});
