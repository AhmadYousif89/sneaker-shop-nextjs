'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<section className='flex flex-col items-center justify-center min-h-full gap-20 my-72 text-Dark_grayish_blue'>
			<h2 className='text-4xl capitalize'>page not found</h2>
			<div className='text-9xl'>\(0_o)/</div>
			<p className='text-5xl'>404</p>
			<Button onClick={() => router.back()} variant={'default'} modifier={'outline'}>
				Go back
			</Button>
		</section>
	);
};

export default NotFoundPage;
