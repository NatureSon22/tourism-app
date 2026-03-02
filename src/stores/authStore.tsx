import { create } from "zustand";

type User = {
  id: string;
};

export type AuthStore = {
  user: User | null;
  onBoardingCompleted: boolean;
  login: (user: User) => void;
  logout: () => void;
  completeOnBoarding: () => void;
  resetOnBoarding: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: { id: "123" },
  onBoardingCompleted: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  completeOnBoarding: () => set({ onBoardingCompleted: true }),
  resetOnBoarding: () => set({ onBoardingCompleted: false }),
}));

export default useAuthStore;
