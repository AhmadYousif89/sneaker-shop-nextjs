'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { Footer } from '@/components/layouts/footer';
import { CartModal } from '@/components/cart-modal/cart-modal';
import { UserModal } from '@/components/user-modal/user-modal';
import { SkeletonHeader } from '@/components/skeletons/skeleton-header';

const DynamicHeader = dynamic<any>(
	() => import('../components/layouts/header').then(rc => rc.Header),
	{
		loading: () => <SkeletonHeader />,
		ssr: false
	}
);

export const CheckLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	if (pathname === '/auth/register' || pathname === '/auth/login') {
		return <>{children}</>;
	}

	return (
		<>
			<DynamicHeader>
				<CartModal />
				<UserModal />
			</DynamicHeader>
			{children}
			<Footer />
		</>
	);
};
