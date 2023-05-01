import { SpinnerIcon } from '@/components/icons';

const Loading = () => {
	return (
		<div className='flex items-center justify-center min-h-screen gap-16'>
			<SpinnerIcon className='scale-110 lg:scale-150' />
			<h2 className='text-3xl lg:text-4xl text-Dark_grayish_blue'>Loading</h2>
		</div>
	);
};

export default Loading;
