import {useMemo} from 'react';
import {create} from 'zustand';
import {formatSecondsToClock, formatClockToSeconds} from '../utils/time/time';

export type SessionStore = {
  seconds: number;
  repeats: number;
  changeSeconds: (seconds: number) => void;
  changeSecondsFromTime: (time: string) => void;
  changeRepeats: (repeats: number) => void;
};

export const useSessionStore = create<SessionStore>()(set => ({
  seconds: 10,
  repeats: 4,
  changeSeconds: (seconds: number) => set({seconds}),
  changeSecondsFromTime: (time: string) =>
    set({seconds: formatClockToSeconds(time)}),
  changeRepeats: (repeats: number) => set({repeats}),
}));

export const useMemoizedClock = () => {
  const seconds = useSessionStore(state => state.seconds);

  return useMemo(() => formatSecondsToClock(seconds), [seconds]);
};
