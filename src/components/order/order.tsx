'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useUserStore } from '@/store';

import { DeleteIcon } from '../icons';
import { Button } from '../ui/button';
import { ActionModal } from '../ui/action-modal';
import { ItemsDetails } from './items-details';
import { OrderStatus } from './order-status';
import { OrderSummary } from './order-summary';
import { PersonalInfo } from './personal-info';
import { useHydratedStore } from '@/hooks/use-hydrated-store';

export const Order = ({ id }: { id: string }) => {
	const router = useRouter();
	const [modal, setModal] = useState(false);
	const orderList = useHydratedStore(useUserStore, s => s.orderList);
	const deleteOrder = useUserStore(s => s.deleteOrder);
	const user = useAuthStore(s => s.user);

	const curOrder = orderList?.find(order => order.id === id);

	useEffect(() => {
		if (!user) router.replace('/auth/login');
	}, [router, user]);

	if (orderList?.length === 0)
		return (
			<p className='mx-8 my-24 text-3xl font-bold text-center text-Dark_grayish_blue'>
				You have not placed any order !
			</p>
		);

	if (!curOrder)
		return (
			<p className='mx-8 my-24 text-3xl font-bold text-center text-Dark_grayish_blue'>
				Order Not Found !
			</p>
		);

	return (
		<>
			<ActionModal
				state={modal}
				variant={'delete_order'}
				onConfirm={() => {
					deleteOrder?.(curOrder.id);
					router.replace('/');
				}}
				onCancel={() => setModal(false)}
			/>
			<section className='grid gap-8 mx-8 my-16 lg:grid-cols-3 lg:my-32'>
				<section className='flex flex-col row-start-1 gap-4 mb-8 text-4xl font-bold capitalize col-span-full lg:text-5xl'>
					<div className='flex items-end gap-6 text-center'>
						<h2 className='text-Very_dark_blue'>order confirmed</h2>
						<p className='text-Dark_grayish_blue'>#{id}</p>
					</div>

					<div className='flex items-center justify-between text-xl tracking-wide normal-case text-Dark_grayish_blue'>
						<span>Placed on : {curOrder.date}</span>
						<Button
							title='delete this order'
							onClick={() => setModal(true)}
							className='flex items-center justify-center w-16 h-16 rounded-lg group bg-Light_grayish_blue'>
							<DeleteIcon className='fill-Very_dark_blue group-hover:fill-Orange group-focus-visible:fill-Orange' />
						</Button>
					</div>
				</section>

				<ItemsDetails currentOrderCart={curOrder.cart} />

				<OrderSummary currentOrder={curOrder} />

				<PersonalInfo />

				<OrderStatus />
			</section>
		</>
	);
};
