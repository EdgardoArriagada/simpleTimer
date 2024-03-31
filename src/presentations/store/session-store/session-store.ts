import {useEffect, useMemo, useRef} from 'react';
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
  changeSeconds: (seconds: number) => void;
  changeSecondsFromTime: (time: string) => void;
  changeRepeats: (repeats: number) => void;

  // Countdown
  countdown: number;
  repeatsLog: string[];
  seriesLog: string[];
  isRunning: boolean;
  interval: NodeJS.Timeout | null;
  startCountdown: (seconds: number) => void;
  clearSession: () => void;

  // ClearModal
  isClearModalVisible: boolean;
  showClearModal: () => void;
  hideClearModal: () => void;
};

export const useSessionStore = create<SessionStore>()(set => ({
  // Config
  seconds: 10,
  repeats: 4,
  changeSeconds: (seconds: number) => set({seconds}),
  changeSecondsFromTime: (time: string) =>
    set({seconds: formatClockToSeconds(time)}),
  changeRepeats: (repeats: number) => set({repeats}),

  // Countdown
  countdown: 0,
  repeatsLog: [],
  seriesLog: [],
  isRunning: false,
  interval: null,
  clearSession: () =>
    set({
      repeatsLog: [],
      seriesLog: [],
    }),
  startCountdown: (seconds: number) => {
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

  // ClearModal
  isClearModalVisible: false,
  showClearModal: () => set({isClearModalVisible: true}),
  hideClearModal: () => set({isClearModalVisible: false}),
}));

export const useUnmountInterval = () => {
  const interval = useSessionStore(state => state.interval);
  const ref = useRef<NodeJS.Timeout | null>(null);

  ref.current = interval;

  useEffect(() => {
    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);
};

export const useMemoizedClock = () => {
  const seconds = useSessionStore(state => state.seconds);

  return useMemo(() => formatSecondsToClock(seconds), [seconds]);
};
