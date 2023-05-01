import { useAuthStore, useUserStore } from '@/store';
import Image from 'next/image';

import { SectionWrapper } from './section-wrapper';
import profileImg from '../../../public/assets/images/avatar.png';
import moneyImg from '../../../public/assets/images/money.png';

export const PersonalInfo = () => {
	const orderList = useUserStore(s => s.orderList);
	const user = useAuthStore(s => s.user);
	const numOfOrders = orderList.length;

	return (
		<SectionWrapper className='xl:row-start-2 xl:col-start-3'>
			<h3 className='text-3xl font-bold xl:text-4xl text-Very_dark_blue/80'>
				Personal info
			</h3>

			<div className='grid gap-8 xl:gap-12'>
				{/* Personal Info */}
				<div className='flex flex-col gap-8 pb-8 border-b-2 border-Light_grayish_blue'>
					<div className='flex items-center justify-between'>
						<Image src={profileImg} alt='profile image' className='w-16' />
						<div className='grid items-center grid-cols-2 gap-4 justify-items-center'>
							<p className='text-3xl font-bold text-Orange'>{user?.name}</p>
							<p className='text-xl capitalize text-Dark_grayish_blue xl:text-2xl'>
								<b className='mr-2 text-2xl'>{numOfOrders}</b>
								<span>Total orders</span>
							</p>
						</div>
					</div>
					<p className='flex items-end justify-between'>
						<span className='text-xl text-Dark_grayish_blue'>Current Email</span>
						<span className='text-3xl tracking-wider text-Dark_grayish_blue/75'>
							{user?.email}
						</span>
					</p>
				</div>

				{/* Shipping Address */}
				<div className='pb-8 border-b-2 border-Light_grayish_blue'>
					<h4 className='mb-8 text-2xl capitalize xl:text-3xl'>shipping address</h4>

					<div className='space-y-2 text-xl xl:text-2xl text-Dark_grayish_blue'>
						<p>1234 Elm Street, Apt 567</p>
						<p>Anytown, CA 98765</p>
						<p>Somewhere on Earth</p>
					</div>
				</div>

				{/* Billing Address */}
				<div className='pb-8 border-b-2 border-Light_grayish_blue'>
					<h4 className='mb-8 text-2xl capitalize xl:text-3xl'>billing address</h4>

					<div className='space-y-2 text-xl xl:text-2xl text-Dark_grayish_blue'>
						<p>5678 Maple Avenue, Suite 910</p>
						<p>Sometown, NY 12345</p>
						<p>Another place on Earth</p>
					</div>
				</div>

				{/* PAYMENTS */}
				<div>
					<h4 className='mb-8 text-2xl capitalize xl:text-3xl'>payment method</h4>
					<div className='flex items-center gap-4 text-2xl font-bold xl:text-3xl text-Dark_grayish_blue'>
						<p>Cash on delivery</p>
						<Image src={moneyImg} alt='cash money image' className='w-12' />
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
};