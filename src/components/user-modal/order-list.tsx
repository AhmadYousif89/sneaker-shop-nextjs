import { useUserStore } from '@/store';
import { ListItem } from './list-item';

export const OrderList = () => {
	const orderList = useUserStore(s => s.orderList);

	if (orderList.length === 0)
		return (
			<h2 className='text-center place-self-center'>
				Looks like you haven't purchased any sneaker lately !
			</h2>
		);

	const sortedOrders = [...orderList];
	sortedOrders.sort((a, b) => b.date.localeCompare(a.date));

	return (
		<section className='flex flex-col'>
			<h2 className='self-center mb-8 text-2xl'>Most Recent</h2>
			<ul className='grid grid-cols-1 gap-8'>
				{sortedOrders.map((item, idx) => (
					<ListItem key={item.id} href={`/orders/${item.id}`}>
						<span className='p-1 text-center min-w-[3rem] font-bold rounded-md ring-1 ring-Grayish_blue'>
							{idx < 9 ? `0${idx + 1}` : idx + 1}
						</span>
						<p className='text-center lg:text-2xl'>
							<span>
								Order with id <b className='mx-1'>"{item.id}"</b> was recieved
								successfully
							</span>
						</p>
						<span className='font-bold tracking-wider text-center'>
							{item.date.split('at')[0]}
						</span>
					</ListItem>
				))}
			</ul>
		</section>
	);
};
