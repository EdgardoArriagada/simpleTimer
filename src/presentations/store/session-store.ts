import {useMemo} from 'react';
import {create} from 'zustand';
import {formatSecondsToClock} from '../utils/time/time';

export type SessionStore = {
  seconds: number;
  changeSeconds: (seconds: number) => void;
  changeSecondsFromTime: (time: string) => void;
};

export const useSessionStore = create<SessionStore>()(set => ({
  seconds: 10,
  changeSeconds: (seconds: number) => set({seconds}),
  changeSecondsFromTime: (time: string) =>
    set({seconds: formatClockToSeconds(time)}),
}));

export const useMemoizedClock = () => {
  const seconds = useSessionStore(state => state.seconds);

  return useMemo(() => formatSecondsToClock(seconds), [seconds]);
};
