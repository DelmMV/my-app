import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useLogsStore = create(
  persist(
    (set) => ({
      log: [],
      removeLogs: () => {
        set({ log: [] });
      },
      addLogs: (order) => {
        set((state) => ({
          log: [...state.log, order],
        }));
      },
    }),
    {
      name: "logOrder",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useCountLogsStore = create(
  persist(
    (set) => ({
      logs: 0,
      increaseCount: () => set((state) => ({ logs: state.logs + 1 })),

      removeCountLogs: () => set({ logs: 0 }),
    }),
    {
      name: "logs",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
