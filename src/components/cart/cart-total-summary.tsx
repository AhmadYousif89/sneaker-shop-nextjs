import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { TOrder } from '@/types/order';
import { PromoCodes, useAuthStore, useCartStore, useUserStore } from '@/store';
import { CloseIcon, InfoIcon, SpinnerIcon } from '../icons';
import { Button } from '../ui/button';
import ToolTip from '../ui/tooltip';
import { Accordion } from '../ui/accordion';
import { cm } from '@/lib/class-merger';

export const CartTotalSummary = () => {
	const router = useRouter();
	const timeoutRef = useRef<NodeJS.Timeout>();
	const [isChecking, setIsChecking] = useState(false);

	const state = useCartStore(s => s);
	const user = useAuthStore(s => s.user);
	const addOrder = useUserStore(s => s.addOrder);

	const promoCode: PromoCodes =
		state.cartDiscount === 'full-disc'
			? 'ImBroke_100'
			: state.cartDiscount === 'half-disc'
			? 'ILoveYou_50'
			: '';

	const subtotal = state.getSubtotal();
	const totalDiscount = state.getTotalDiscount();
	const deliveryFees = state.getDeliveryFees();
	const totalCart = subtotal - totalDiscount + deliveryFees;

	const handleCheckout = () => {
		setIsChecking(true);
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			if (!user) {
				router.push('/auth/login');
				return;
			}

			const newOrder: TOrder = {
				id: Math.random().toString(36).substring(6),
				cart: state.cart,
				cartDiscount: state.cartDiscount,
				subtotal,
				totalDiscount,
				deliveryFees,
				totalDue: totalCart,
				date: new Date().toLocaleString().replace(',', ' at ')
			};

			addOrder(newOrder);
			state.setCartDiscount('');
			setIsChecking(false);
			router.push('/checkout/success');
			state.clearCart();
		}, 2000);
	};

	return (
		<div className='flex flex-col gap-8 my-16 text-xl font-normal capitalize lg:text-2xl'>
			<Accordion
				initState={false}
				header='Cart summary'
				bodyColor='bg-transparent'
				className='relative shadow-sm'>
				<div className='relative flex flex-col gap-4 p-8 pb-16'>
					{/* SUBTOTAL */}
					<p className='flex items-center justify-between text-Dark_grayish_blue'>
						<span>subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</p>

					{/* PROMO */}
					<div className='flex items-center justify-between text-Orange'>
						<span>promo code</span>
						<div className={`group normal-case flex items-center gap-4`}>
							{promoCode !== '' && ( // has promo code
								<Button
									title='remove promo code'
									className='rounded-full lg:p-1 bg-Pale_orange'
									onClick={() => state.setCartDiscount('')}>
									<CloseIcon className='scale-[.6] fill-Dark_grayish_blue hover:fill-Orange lg:scale-75' />
								</Button>
							)}
							<span>{promoCode ? promoCode : 'no code'}</span>
						</div>
					</div>

					{/* DISCOUNT */}
					<div className='flex items-center justify-between text-green-400'>
						<span>you just saved</span>
						<span>${totalDiscount.toFixed(2)}</span>
					</div>

					{/* DELIVERY */}
					<div className='flex items-center justify-between text-indigo-400'>
						<ToolTip
							renderOnHover
							className='flex items-center gap-2'
							tip={`Eligible free shipping on purchases over $${state.shippingLimit}`}>
							delivery fee
							<InfoIcon className='fill-current' />
						</ToolTip>

						<span className='normal-case'>
							{deliveryFees ? `$${deliveryFees.toFixed(2)}` : 'free shipping'}
						</span>
					</div>
				</div>

				{/* Promo Message */}
				<span
					className={cm([
						'absolute -bottom-3 -z-10 left-0 text-xl px-8 py-2 text-Dark_grayish_blue normal-case',
						'transition-[transform,opacity] duration-200 -translate-y-5 opacity-100 visible',
						promoCode === '' && '-translate-y-12 opacity-0 invisible'
					])}>
					applied
					<b className='text-2xl tracking-wide text-Orange'>
						{state.cartDiscount === 'full-disc' ? ' 100% ' : ' 50% '}
					</b>
					discount on total
				</span>
			</Accordion>

			{/* TOTAL */}
			<div className='flex items-center justify-between gap-4 text-2xl font-bold lg:text-3xl'>
				<span className='uppercase'>total bag</span>
				<span
					className={`ml-auto ${
						promoCode === '' ? 'text-Very_dark_blue' : 'line-through text-Grayish_blue'
					}`}>
					$ {totalCart.toFixed(2)}
				</span>
				{promoCode !== '' && ( // has promo code
					<span>
						{promoCode === 'ILoveYou_50' ? `$${(totalCart / 2).toFixed(2)}` : `$0.00`}
					</span>
				)}
			</div>

			<Button
				hasRipple
				variant={'secondary_orange'}
				onClick={handleCheckout}
				className='py-6 mt-8 text-2xl lg:self-center lg:w-1/2'>
				<span>Place your order</span>
				{isChecking && (
					<SpinnerIcon className='absolute right-0 -translate-x-10 -translate-y-1/2 top-1/2' />
				)}
			</Button>
		</div>
	);
};
