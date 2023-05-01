import { Lightbox } from '@/components/product/lightbox';
import { ProductDetails } from '@/components/product/details';
import { ProductCarousel } from '@/components/product/carousel';
import { product } from '@/data/featured-product';

export const metadata = {
	title: product.title + ' | Sneakers',
	description: product.description
};

const SingleProductPage = ({ params }: { params: { id: number } }) => {
	return (
		<section className='grid-cols-2 lg:grid justify-items-center lg:my-40'>
			<ProductCarousel />
			<ProductDetails id={params.id} />
			<Lightbox />
		</section>
	);
};

export default SingleProductPage;
