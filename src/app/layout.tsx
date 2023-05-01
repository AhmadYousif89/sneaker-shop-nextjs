'use client';
import './globals.css';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Kumbh_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { Footer } from '@/components/layouts/footer';
import { UserModal } from '@/components/user-modal/user-modal';
import { CartModal } from '@/components/cart-modal/cart-modal';
import { SkeletonHeader } from '@/components/skeletons/skeleton-header';

const DynamicHeader = dynamic<any>(
	() => import('../components/layouts/header').then(rc => rc.Header),
	{
		loading: () => <SkeletonHeader />,
		ssr: false
	}
);

export const metadata: Metadata = {
	title: 'Sneakers Shop',
	description: 'The best sneaker shop in the world.'
};

const kumbhSans = Kumbh_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	let content;
	if (pathname === '/auth/register' || pathname === '/auth/login') {
		content = children;
	} else {
		content = (
			<>
				<DynamicHeader>
					<CartModal />
					<UserModal />
				</DynamicHeader>
				{children}
				<Footer />
			</>
		);
	}
	return (
		<html lang='en'>
			<link rel='icon' type='image/png' href='/favicon.png' />
			<body
				className={`${kumbhSans.className} flex flex-col min-h-[100dvh] mx-auto max-w-[43rem] lg:max-w-[144rem] xs:max-lg:hidden`}>
				{content}
			</body>
		</html>
	);
}
