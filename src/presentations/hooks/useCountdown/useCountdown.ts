import {useEffect, useRef, useState} from 'react';

export const useCountdown = (onFinish?: (startSeconds: number) => void) => {
  const [countdown, setCountdown] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current!);
      }
    };
  }, []);

  const start = (seconds: number) => {
    setCountdown(seconds);
    setStartSeconds(seconds);
    interval.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    setIsRunning(true);
  };

  if (countdown <= 0) {
    clearInterval(interval.current!);

    if (isRunning) {
      onFinish?.(startSeconds);
      setIsRunning(false);
    }
  }

  return [countdown, isRunning, start] as const;
};
