import {useCallback, useState} from 'react';

type InitialValue = boolean | (() => boolean);

export const useBoolean = (initialValue?: InitialValue) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, setTrue, setFalse] as const;
};
