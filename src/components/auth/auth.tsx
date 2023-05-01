import Image from 'next/image';
import authImg from '../../../public/assets/images/auth-wallpaper.jpg';

export const AuthComponent = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='my-16 mx-auto w-11/12 max-w-[144rem] h-[100dvh] grid gap-8 lg:my-28 lg:grid-cols-2'>
			{children}
			<figure className='hidden lg:flex'>
				<Image
					src={authImg}
					alt='side picture'
					className='rounded-3xl h-[75rem]'
					priority
				/>
			</figure>
		</main>
	);
};
