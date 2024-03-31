import {useMemo} from 'react';
import {create} from 'zustand';
import {
  formatSecondsToClock,
  formatClockToSeconds,
} from '../../utils/time/time';

const isGoingToFinishSerie = (repeatsLogs: string[], repeats: number) =>
  repeatsLogs.length + 1 >= repeats;

export type SessionStore = {
  // Config
  seconds: number;
  repeats: number;

  // Countdown
  countdown: number;
  repeatsLog: string[];
  seriesLog: string[];
  isRunning: boolean;
  interval: NodeJS.Timeout | null;
  changeSeconds: (seconds: number) => void;
  changeSecondsFromTime: (time: string) => void;
  changeRepeats: (repeats: number) => void;
  start: (seconds: number) => void;
};

export const useSessionStore = create<SessionStore>()(set => ({
  // Config
  seconds: 10,
  repeats: 4,

  // Countdown
  countdown: 0,
  repeatsLog: [],
  seriesLog: [],
  isRunning: false,
  interval: null,
  changeSeconds: (seconds: number) => set({seconds}),
  changeSecondsFromTime: (time: string) =>
    set({seconds: formatClockToSeconds(time)}),
  changeRepeats: (repeats: number) => set({repeats}),
  start: (seconds: number) => {
    const interval = setInterval(() => {
      set(prev => {
        if (prev.countdown > 0) {
          return {
            countdown: prev.countdown - 1,
          };
        }

        clearInterval(interval);
        let newSeriesLog = prev.seriesLog;
        let newRepeatsLog: string[];

        if (isGoingToFinishSerie(prev.repeatsLog, prev.repeats)) {
          newSeriesLog = [
            ...prev.seriesLog,
            `Serie of ${prev.repeats} repeats finished`,
          ];
          newRepeatsLog = [];
        } else {
          newRepeatsLog = [...prev.repeatsLog, formatSecondsToClock(seconds)];
        }

        return {
          isRunning: false,
          interval: null,
          countdown: 0,
          seconds: 10,
          seriesLog: newSeriesLog,
          repeatsLog: newRepeatsLog,
        };
      });
    }, 1000);

    set({
      isRunning: true,
      interval,
      countdown: seconds,
    });
  },
}));

export const useMemoizedClock = () => {
  const seconds = useSessionStore(state => state.seconds);

  return useMemo(() => formatSecondsToClock(seconds), [seconds]);
};