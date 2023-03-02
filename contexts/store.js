import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// export const useDataStore = create(
//   persist((set) => ({
//     data: [],
//     setData: (order) => {},
//   }))
// );

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

export const useSoundToggle = create(
  persist(
    (set) => ({
      sound: false,
      onSound: () => set((state) => ({ sound: true })),
      offSound: () => set((state) => ({ sound: false })),
    }),
    {
      name: "sound",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
