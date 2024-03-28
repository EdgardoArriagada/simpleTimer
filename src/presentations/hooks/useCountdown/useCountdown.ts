import {useEffect, useRef, useState} from 'react';

export const useCountdown = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    interval.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current!);
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  if (countdown <= 0) {
    clearInterval(interval.current!);

    if (isRunning) {
      setIsRunning(false);
    }
  }

  return [countdown, isRunning, start] as const;
};
