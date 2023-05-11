'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { useProductStore, useUIStore } from '@/store';
import { useCarousel } from '@/hooks/use-carousel';
import { product } from '@/data/featured-product';

import { Button } from '../ui/button';
import { CloseIcon, ChevronIcon } from '../icons';

export const ProductCarousel = ({ inLightbox = false }) => {
	const mainCarouselRef = useRef<HTMLDivElement>(null);
	const curImageIdx = useProductStore(s => s.curImageIdx);
	const curImageHandler = useProductStore(s => s.curImageHandler);
	const setLightboxStatus = useUIStore(s => s.setLightboxStatus);
	const { carouselRef, carouselImagesRef, closeButtonRef, prevBtnRef, nextBtnRef } =
		useCarousel(inLightbox);

	const { full: prodFullImgs, thumb: prodThumbImgs } = product.image;

	const displayPrevImage = useCallback(() => {
		curImageHandler(pv => {
			return pv === 0 ? 3 : --pv;
		});
	}, [curImageHandler]);

	const displayNextImage = useCallback(() => {
		curImageHandler(pv => {
			return pv === 3 ? 0 : ++pv;
		});
	}, [curImageHandler]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft' && !e.altKey) {
				if (nextBtnRef.current && prevBtnRef.current) {
					nextBtnRef.current.blur();
					prevBtnRef.current.focus();
				}
				if (inLightbox) return;
				displayPrevImage();
			}

			if (e.key === 'ArrowRight' && !e.altKey) {
				if (nextBtnRef.current && prevBtnRef.current) {
					prevBtnRef.current.blur();
					nextBtnRef.current.focus();
				}
				if (inLightbox) return;
				displayNextImage();
			}
		};

		document.addEventListener('keydown', handler);
		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, [displayNextImage, displayPrevImage, inLightbox, nextBtnRef, prevBtnRef]);

	useEffect(() => {
		if (mainCarouselRef.current && inLightbox) {
			mainCarouselRef.current.focus();
			mainCarouselRef.current.style.outline = 'none';
		}
	}, [inLightbox]);

	return (
		<>
			<div ref={carouselRef} className='lg:max-w-3xl'>
				{inLightbox && (
					<Button
						title='close lightbox'
						ref={closeButtonRef}
						onClick={() => setLightboxStatus(false)}
						className='p-1 mb-3 rounded focus-visible:outline-offset-4 focus-visible:outline-Light_grayish_blue'>
						<CloseIcon className='hover:fill-Orange fill-white' />
					</Button>
				)}

				{/* FULL IMAGE */}
				<div
					ref={mainCarouselRef}
					tabIndex={0}
					className='relative outline-none group lg:focus-visible:outline-Orange lg:focus-visible:outline-1 rounded-3xl'>
					<figure className='relative flex items-center overflow-hidden lg:rounded-3xl'>
						{(prodFullImgs as string[]).map((image, idx) => (
							<Image
								priority
								src={image}
								key={`slide_${idx}`}
								alt='sneakers image'
								className='transition-transform duration-500 ease-in-out'
								style={{ transform: `translateX(-${curImageIdx * 100}%)` }}
							/>
						))}
						<figcaption className='sr-only'>showcasing the sneaker images</figcaption>
					</figure>

					{/* ARROWS */}
					<div>
						<Button
							ref={prevBtnRef}
							variant={'carousel'}
							title={'previous image'}
							onClick={displayPrevImage}
							className={`lg:hidden group-hover:block group-focus-within:block z-30 absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2 ${
								inLightbox ? 'lg:block -translate-x-1/2' : ''
							}`}>
							<ChevronIcon className='hover:fill-Orange' />
						</Button>

						<Button
							ref={nextBtnRef}
							title='next image'
							variant={'carousel'}
							onClick={displayNextImage}
							className={`lg:hidden group-hover:block group-focus-within:block z-30 absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 rotate-180 ${
								inLightbox ? 'lg:block translate-x-1/2' : ''
							}`}>
							<ChevronIcon className='hover:fill-Orange' />
						</Button>
					</div>

					{/* SHOWCASE BUTTON */}
					<div
						className={`hidden lg:flex items-center justify-between w-full absolute bottom-4 px-4 tracking-wider text-Very_light_grayish_blue opacity-0 translate-y-5 group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 ${
							inLightbox ? 'lg:hidden' : ''
						}`}>
						<p className='p-4 text-xl rounded-md bg-Very_dark_blue/50 ring-1 ring-Very_light_grayish_blue'>
							Slide with <span>⬅</span> and <span>➡</span>
						</p>

						<Button
							hasRipple
							onClick={() => setLightboxStatus(true)}
							className={`overflow-hidden text-xl bg-Very_dark_blue/50 rounded-md p-4 ring-1 ring-Very_light_grayish_blue`}>
							Showcase
						</Button>
					</div>
				</div>

				{/* THUMBNAIL IMAGES */}
				<div className='hidden mt-16 lg:items-center lg:justify-between lg:flex'>
					{(prodThumbImgs as string[]).map((imgThumb, idx) => (
						<Button
							ref={btn => {
								if (btn) carouselImagesRef[idx] = btn;
							}}
							key={`thumb_${idx}`}
							aria-current={idx === curImageIdx}
							onClick={() => curImageHandler(idx)}
							className={`overflow-hidden rounded-2xl border-Orange [&[aria-current="true"]]:border-2 after:absolute after:inset-0 [&[aria-current="true"]]:after:bg-Pale_orange after:opacity-50 shadow focus-visible:outline-offset-2 shadow-Grayish_blue ${
								inLightbox ? 'shadow-none focus-visible:outline-Light_grayish_blue' : ''
							}`}>
							<Image src={imgThumb} alt='sneakers thumbnail image' className='w-40' />
						</Button>
					))}
				</div>
			</div>
		</>
	);
};
