import { FC, ReactNode, useState } from 'react';
import { cm } from '@/lib/class-merger';
import { ChevronIcon } from '../icons';
import { Button } from './button';

type AccordionProps = {
	header: string;
	body?: string | JSX.Element;
	icon?: JSX.Element;
	headerColor?: string;
	bodyColor?: string;
	className?: string;
	children?: ReactNode;
};

export const Accordion: FC<AccordionProps> = ({
	body,
	bodyColor,
	header,
	headerColor,
	children,
	className
}) => {
	const [expand, setExpand] = useState<boolean>(true);

	return (
		<section
			className={cm([
				'my-4 overflow-hidden text-white lg:my-8 rounded-2xl shadow-md',
				className
			])}>
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
					'relative grid grid-rows-[0fr] bg-Dark_grayish_blue transition-[grid-template-rows] duration-500',
					expand && 'grid-rows-[1fr]',
					bodyColor
				])}>
				<div className='absolute inset-0 border-t border-Very_light_grayish_blue'> </div>
				<div className='overflow-hidden'>
					{children ? (
						children
					) : (
						<div className='px-8 py-12 text-2xl lg:text-[1.6rem]'>{body}</div>
					)}
				</div>
			</div>
		</section>
	);
};
