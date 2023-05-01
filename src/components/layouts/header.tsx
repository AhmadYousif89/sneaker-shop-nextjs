'use client';

import Image from 'next/image';
import { useAuthStore, useCartStore, useUIStore } from '@/store';
import profileImg from '../../../public/assets/images/avatar.png';
import logo from '../../../public/assets/icons/logo.svg';

import { CartIcon, UserIcon } from '../icons';
import { SideNavigation } from './side-nav';
import { TopNavigation } from './top-nav';
import { Button } from '../ui/button';
import { useHydratedStore } from '@/hooks/use-hydrated-store';

export const Header = ({ children }: { children: React.ReactNode }) => {
	const user = useAuthStore(s => s.user);
	const cart = useCartStore(s => s.cart);
	// const user = useHydratedStore(useAuthStore, s => s.user);
	// const cart = useHydratedStore(useCartStore, s => s.cart);
	const getTotalQty = useCartStore(s => s.getTotalQty);
	const setCartStatus = useUIStore(s => s.setCartStatus);
	const setProfileStatus = useUIStore(s => s.setProfileStatus);

	let totalQty: string | number = getTotalQty() ?? 0;
	if (totalQty > 99) totalQty = `99+`;

	return (
		<header className='sticky top-0 z-50 flex items-center justify-between px-8 border-b-2 lg:relative bg-white/50 backdrop-blur-sm h-36 border-Very_light_grayish_blue'>
			<div className='flex items-center gap-8 lg:gap-20 h-[inherit]'>
				<SideNavigation />

				<Button title='sneakers home' href='/' modifier={'plain'} className='p-2'>
					<Image src={logo} alt='sneakers logo' aria-hidden />
				</Button>

				<TopNavigation />
			</div>

			<div className='flex items-center gap-8 lg:gap-16'>
				<div className='relative flex'>
					<Button onClick={() => setCartStatus(pv => !pv)} title='show cart' className=''>
						{cart && cart.length > 0 && (
							<span className='absolute px-3 text-xl font-bold text-white -top-3 left-3 bg-Orange rounded-3xl'>
								{totalQty}
							</span>
						)}
						<CartIcon className='w-12 fill-Dark_grayish_blue' />
					</Button>
				</div>

				<Button
					onClick={() => setProfileStatus(pv => !pv)}
					title='profile options'
					rounded={'full'}
					className='w-14 h-14 hover:ring-2 hover:ring-Orange'>
					{user ? (
						<Image alt='user profile icon' src={profileImg} aria-hidden />
					) : (
						<UserIcon className='object-cover w-full h-full fill-Dark_grayish_blue' />
					)}
				</Button>
			</div>
			{children}
		</header>
	);
};
