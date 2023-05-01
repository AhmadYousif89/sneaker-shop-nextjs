import Image from 'next/image';
import { useState } from 'react';

import { useUserStore } from '@/store';
import { CloseIcon } from '../icons';
import { Button } from '../ui/button';
import { ListItem } from './list-item';
import { Input } from '../ui/input';

export const FavoriteList = () => {
	const [query, setQuery] = useState('');
	const favoriteList = useUserStore(s => s.favoriteList);
	const toggleItemFavorite = useUserStore(s => s.toggleItemFavorite);

	if (favoriteList.length === 0)
		return <h2 className='place-self-center'>You don't have any favorites !</h2>;

	const filteredFavList = favoriteList.filter(item =>
		item.title.toLowerCase().includes(query.toLowerCase())
	);

	const noQueryMsg = (
		<h2 className='mt-20 place-self-center'>We can't find what you're looking for !</h2>
	);

	return (
		<div className='flex flex-col text-center capitalize'>
			<Input
				type='text'
				id='search-favorites'
				wrapperStyle='self-center'
				variant={'search_favorite'}
				onChange={e => setQuery(e.target.value)}
				placeholder='Search your favorite sneaker'
			/>

			{filteredFavList.length === 0 && noQueryMsg}

			<ul className='grid grid-cols-2 gap-2 mt-12 lg:grid-cols-3'>
				{filteredFavList.map(item => (
					<ListItem
						key={item.id}
						href={'/product/3'}
						className='grid justify-items-center'>
						<Button
							title='delete favorite item'
							onClick={e => {
								e.preventDefault();
								toggleItemFavorite({ ...item });
							}}
							variant={'default'}
							modifier={'plain'}
							className='absolute p-1 rounded top-1 left-1 group ring-1 ring-Grayish_blue focus-visible:outline-offset-2'>
							<CloseIcon className='scale-75 group-hover:fill-Orange' />
						</Button>
						<Image
							src={item.image.thumb as string}
							alt={item.title}
							className='w-20 rounded-xl'
						/>
						<p className='text-xl font-medium text-Dark_grayish_blue'>{item.title}</p>
					</ListItem>
				))}
			</ul>
		</div>
	);
};
