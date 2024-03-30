import {create} from 'zustand';

export type SessionStore = {
  time: string;
  changeTime: (time: string) => void;
};

export const useSessionStore = create<SessionStore>()((set, get) => ({
  time: '00:10',
  changeTime: (time: string) => set({time}),
}));
