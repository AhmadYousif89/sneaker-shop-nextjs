import { StaticImageData } from 'next/image';

type TCartItem = {
	id: number;
	qty: number;
	title: string;
	price: number;
	image: { full: string; thumb: string | StaticImageData };
	size: string;
	color: string;
	availableQty: number;
	discountPercentage: number;
};
