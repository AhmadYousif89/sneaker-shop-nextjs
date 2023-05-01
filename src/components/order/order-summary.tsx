import { TOrder } from '@/types/order';
import { SectionWrapper } from './section-wrapper';

export const OrderSummary = ({ currentOrder }: { currentOrder: TOrder }) => {
	const deliveryFees = currentOrder.deliveryFees;
	const subtotal = currentOrder.subtotal;
	const totalDiscount = currentOrder.totalDiscount;
	const totalDue = currentOrder.totalDue;

	return (
		<SectionWrapper className='xl:col-span-2'>
			<h3 className='text-3xl xl:text-4xl font-bold text-Very_dark_blue/80'>Summary</h3>

			<div className='pb-8 border-b-2 border-Light_grayish_blue capitalize text-xl font-bold text-Dark_grayish_blue space-y-2 tracking-wide xl:text-2xl'>
				<p className='flex items-center justify-between'>
					<span>subtotal</span>
					<span>${subtotal.toFixed(2)}</span>
				</p>

				<p className='flex items-center justify-between text-green-400'>
					<span>discount</span>
					<span>${totalDiscount.toFixed(2)}</span>
				</p>

				<div className='flex items-center justify-between text-Orange normal-case'>
					<span>Promo discount</span>
					<p className='text-xl text-Dark_grayish_blue'>
						{currentOrder.cartDiscount === '' ? (
							<span>no discount</span>
						) : (
							<span>
								<b className='text-2xl text-Orange'>
									{currentOrder.cartDiscount === 'full-disc' ? ' 100% ' : ' 50% '}
								</b>
								discount on total
							</span>
						)}
					</p>
				</div>

				<p className='flex items-center justify-between text-indigo-400'>
					<span>shipping</span>
					<span className='normal-case'>
						{deliveryFees === 0 ? 'free shipping' : `$${deliveryFees.toFixed(2)}`}
					</span>
				</p>
			</div>

			<div className='text-2xl flex items-center justify-between gap-4 font-bold xl:text-3xl'>
				<span className='uppercase'>total due</span>
				<span
					className={`ml-auto ${
						currentOrder.cartDiscount === ''
							? 'text-Very_dark_blue'
							: 'line-through text-Grayish_blue'
					}`}>
					$ {totalDue.toFixed(2)}
				</span>
				{currentOrder.cartDiscount !== '' && ( // has promo code
					<span>
						{currentOrder.cartDiscount === 'half-disc'
							? `$ ${(totalDue / 2).toFixed(2)}`
							: `$0.00`}
					</span>
				)}
			</div>
		</SectionWrapper>
	);
};
