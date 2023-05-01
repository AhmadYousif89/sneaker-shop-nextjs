import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
	user: UserAuth | null;
};

type AuthActions = {
	setUserCredentials: (credentials: UserAuth) => void;
	logout: () => void;
};

type AuthStore = AuthState & AuthActions;
const key = 'auth_store';

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			user: null,
			setUserCredentials: credentials => set({ user: credentials }),
			logout: () => set({ user: null })
		}),
		{ name: key }
	)
);
