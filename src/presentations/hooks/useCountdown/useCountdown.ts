import {useEffect, useRef, useState} from 'react';

export const useCountdown = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval.current!);
    };
  }, []);

  if (countdown <= 0) {
    clearInterval(interval.current!);
  }

  return countdown;
};
