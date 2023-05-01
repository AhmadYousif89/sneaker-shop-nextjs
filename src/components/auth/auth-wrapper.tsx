import { FormEvent, ReactNode, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { Button } from '../ui/button';

type AuthWrapperProps = {
	className?: string;
	children: (
		handleSubmit: (e: FormEvent, userInputs: any, validateForm: () => boolean) => void,
		isSubmitting: boolean
	) => ReactNode | ReactNode;
};

export const AuthWrapper = ({ children, className = '' }: AuthWrapperProps) => {
	const router = useRouter();
	const timeoutId = useRef<NodeJS.Timeout>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const setUserCredentials = useAuthStore(s => s.setUserCredentials);

	const handleSubmit = (e: FormEvent, userInputs: any, validateForm: () => boolean) => {
		e.preventDefault();

		setIsSubmitting(true);
		if (!validateForm()) {
			setIsSubmitting(false);
			return;
		}

		setUserCredentials?.(userInputs);

		clearTimeout(timeoutId.current);
		timeoutId.current = setTimeout(() => {
			setIsSubmitting(false);
			router.push('/cart');
		}, 2000);
	};

	return (
		<section
			className={`${className} grid grid-rows-[15rem,10rem,min-content,10rem] justify-items-center`}>
			<div className='space-y-8 text-center'>
				<h2 className='text-5xl font-bold capitalize text-Very_dark_blue'>hey there!</h2>
				<p className='text-2xl tracking-wide text-Dark_grayish_blue'>
					welcome to
					<Button
						href={'/'}
						className='inline mx-1 text-2xl font-bold uppercase rounded text-Orange'>
						sneakers
					</Button>
					the best selling sneaker shop in the world
				</p>
			</div>

			{typeof children === 'function' ? children(handleSubmit, isSubmitting) : children}
		</section>
	);
};
