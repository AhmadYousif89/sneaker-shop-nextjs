import { create } from 'zustand';

type UIState = {
	sideMenu: boolean;
	cartModal: boolean;
	userModal: boolean;
	lightboxIsOpen: boolean;
};

type UIActions = {
	setCartStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
	setMenuStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
	setProfileStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
	setLightboxStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
};

type InitUIStore = UIState & UIActions;

export const useUIStore = create<InitUIStore>((set, get) => ({
	sideMenu: false,
	cartModal: false,
	userModal: false,
	lightboxIsOpen: false,
	setCartStatus: toggle =>
		set({ cartModal: typeof toggle === 'boolean' ? toggle : toggle(get().cartModal) }),
	setMenuStatus: toggle =>
		set({ sideMenu: typeof toggle === 'boolean' ? toggle : toggle(get().sideMenu) }),
	setProfileStatus: toggle =>
		set({
			userModal: typeof toggle === 'boolean' ? toggle : toggle(get().userModal)
		}),
	setLightboxStatus: toggle =>
		set({
			lightboxIsOpen: typeof toggle === 'boolean' ? toggle : toggle(get().lightboxIsOpen)
		})
}));
