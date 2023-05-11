import Image from 'next/image';
import { Button } from '../ui/button';
import ToolTip from '../ui/tooltip';
import googleIcon from '../../../public/assets/icons/google.png';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const GoogleButton = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') ?? '';
	const handleLogin = () => signIn('google', { callbackUrl });

	return (
		<ToolTip tip={'Todo 🤔 maybe!'} renderCenter className='grid'>
			<Button
				hasRipple
				rippleColor='bg-Dark_grayish_blue'
				className='flex items-center justify-center gap-4 py-6 font-bold shadow ring-1 ring-Grayish_blue text-Dark_grayish_blue focus-visible:outline-offset-4'>
				<Image src={googleIcon} alt='google icon' className='w-8 h-8' />
				<span>continue with google</span>
			</Button>
		</ToolTip>
	);
};
