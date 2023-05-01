import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const SearchSection = () => {
	return (
		<section className='relative pt-32 pb-64 bg-Orange lg:pb-96 lg:pt-40'>
			<h2 className='mx-8 mb-16 text-4xl font-bold text-center capitalize text-Very_light_grayish_blue'>
				search your favorite sneakers
			</h2>
			<div className='flex items-center justify-center gap-4 mx-auto lg:gap-8 lg:max-w-4xl'>
				<Input
					id='search'
					type='text'
					variant={'search'}
					placeholder='Type here'
					wrapperStyle='relative flex items-center cursor-pointer'>
					<svg
						aria-labelledby='search'
						className='absolute w-10 h-10 pl-2 border-l-2 border-l-Grayish_blue right-5 stroke-Orange lg:w-14 lg:h-14 lg:pl-4'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>
				</Input>

				<Button hasRipple variant={'secondary_black'}>
					Search
				</Button>
			</div>

			{/* This will draw the wavy shape on the bottom of the section */}
			<div className='wave'>
				<svg
					data-name='Layer 1'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'>
					<path
						d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
						className='shape-fill'></path>
				</svg>
			</div>
		</section>
	);
};
