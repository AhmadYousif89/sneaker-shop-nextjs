// 'use client';
import { useState } from 'react';
import { useUserStore, useUIStore, useAuthStore } from '@/store';
import { useEventListener } from '@/hooks/use-event-listener';
import { cm } from '@/lib/class-merger';

import { FavoriteList } from './favorite-list';
import { HistoryList } from './history-list';
import { OrderList } from './order-list';
import { LogoutIcon } from '../icons';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const tabs = ['favorites', 'orders', 'history'] as const;

export const UserModal = () => {
	const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>('favorites');
	const { favoriteList, historyList, orderList } = useUserStore(s => s);
	const userModalState = useUIStore(s => s.userModal);
	const setProfileStatus = useUIStore(s => s.setProfileStatus);
	const user = useAuthStore(s => s.user);
	const logout = useAuthStore(s => s.logout);

	const cartObj = {
		insideHandler: () => setProfileStatus(true),
		outsideHandler: () => setProfileStatus(false)
	};

	const { ref: modalRef } = useEventListener<HTMLDivElement>(cartObj);

	return (
		<Card
			aria-modal
			ref={modalRef}
			state={userModalState}
			variant={'header_modal'}
			className='max-w-4xl'>
			<div className='flex items-center justify-between gap-2 p-8 tracking-wide capitalize border-b border-Grayish_blue/25'>
				{tabs.map(tab => (
					<Button
						key={tab}
						aria-current={selectedTab === tab}
						onClick={() => setSelectedTab(tab)}
						className={cm([
							'rounded-none p-1 flex-grow text-Grayish_blue last:border-0 ',
							'hover:text-Dark_grayish_blue',
							'focus-visible:outline-offset-2',
							'lg:p-2 lg:border-r-2 lg:border-Grayish_blue',
							'[&[aria-current="true"]]:text-Dark_grayish_blue'
						])}>
						<span>{tab}</span>
						{/* prettier-ignore */}
						<span className='ml-4 px-2 py-1 min-w-[2rem] rounded-md ring-1 ring-Grayish_blue text-xl'>
							{tab === 'favorites' ? favoriteList.length > 99 ? '99+': favoriteList.length : ''}
							{tab === 'history' ? historyList.length > 99 ? '99+' : historyList.length : ''}
							{tab === 'orders' ? orderList.length > 99 ? '99+' : orderList.length : ''}
						</span>
					</Button>
				))}
			</div>

			<div className='grid text-2xl text-Grayish_blue p-8 min-h-[20rem] max-h-[42rem] overflow-y-auto'>
				{selectedTab === 'favorites' && <FavoriteList />}
				{selectedTab === 'history' && <HistoryList />}
				{selectedTab === 'orders' && <OrderList />}
			</div>

			<div className='flex px-8 py-6 border-t-2 border-Very_light_grayish_blue'>
				{user ? (
					<Button onClick={() => logout()} variant={'login_logout'}>
						<LogoutIcon
							className={`w-8 fill-Dark_grayish_blue group-hover:fill-Very_light_grayish_blue group-focus-visible:fill-Very_light_grayish_blue rotate-180`}
						/>
						<span>Logout</span>
					</Button>
				) : (
					<Button href={'/auth/login'} variant={'login_logout'}>
						<span>Login</span>
						<LogoutIcon
							className={`w-8 fill-Dark_grayish_blue group-hover:fill-Very_light_grayish_blue group-focus-visible:fill-Very_light_grayish_blue`}
						/>
					</Button>
				)}
			</div>
		</Card>
	);
};
