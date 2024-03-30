import {create} from 'zustand';
import {formatClockToSeconds} from '../utils/time/time';

export type SessionStore = {
  time: string;
  changeTime: (time: string) => void;
  getTimeAsSeconds: () => number;
};

export const useSessionStore = create<SessionStore>()((set, get) => ({
  time: '00:10',
  changeTime: (time: string) => set({time}),
  getTimeAsSeconds: () => formatClockToSeconds(get().time),
}));
