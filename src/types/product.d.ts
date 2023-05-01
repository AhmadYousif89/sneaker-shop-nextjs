import { StaticImageData } from 'next/image';

type TImage = string | string[] | StaticImageData | StaticImageData[];
type TProductImage = {
	full: TImage;
	thumb: TImage;
};
type TProductCategory = 'sports' | 'fashion' | 'gym' | 'running' | 'training';
type TProduct = {
	id: number;
	title: string;
	image: TProductImage;
	size: string;
	color: string;
	price: number;
	description: string;
	availableQty: number;
	discountedPrice: number;
	discountPercentage: number;
	category: TProductCategory;
	inStock: boolean;
};
