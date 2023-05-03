import { FC, useState } from 'react';
import { cm } from '@/lib/class-merger';
import { ChevronIcon } from '../icons';
import { Button } from './button';

type AccordionProps = {
	header: string;
	body: string | JSX.Element;
	icon?: JSX.Element;
	headerColor?: string;
	bodyColor?: string;
};

export const Accordion: FC<AccordionProps> = ({
	body,
	bodyColor,
	header,
	headerColor
}) => {
	const [expand, setExpand] = useState<boolean>(true);

	return (
		<section
			className={cm(['my-4 overflow-hidden text-white lg:my-8 rounded-2xl shadow-md'])}>
			<div
				className={cm([
					'flex items-center justify-between px-8 py-4 bg-Orange',
					headerColor
				])}>
				<h4 className='text-2xl font-semibold'>{header}</h4>
				<Button
					aria-expanded={expand}
					onClick={() => setExpand(!expand)}
					className='bg-white rounded-full focus-visible:outline-Very_dark_blue focus-visible:outline-dashed'>
					<ChevronIcon
						className={cm([
							'transition-transform duration-300 rotate-90',
							'hover:fill-Orange',
							expand && '-rotate-90'
						])}
					/>
				</Button>
			</div>

			<div
				className={cm([
					'grid grid-rows-[0fr] transition-[grid-template-rows] duration-500',
					expand && 'grid-rows-[1fr]'
				])}>
				<div className={cm(['overflow-hidden bg-Dark_grayish_blue', bodyColor])}>
					<p className='px-8 py-12 text-2xl border-t border-Very_light_grayish_blue lg:text-[1.6rem]'>
						{body}
					</p>
				</div>
			</div>
		</section>
	);
};
