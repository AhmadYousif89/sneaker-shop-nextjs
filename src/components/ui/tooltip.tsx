import { FC, HTMLAttributes, useRef, useState } from 'react';
import { useEventListener } from '@/hooks/use-event-listener';
import { cm } from '@/lib/class-merger';

type ToolTipProps = {
	tip: string | JSX.Element;
	shouldRender?: boolean;
	renderOnHover?: boolean;
	renderLeft?: boolean;
	renderRight?: boolean;
	renderCenter?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

const ToolTip: FC<ToolTipProps> = ({
	tip,
	children,
	className,
	renderOnHover,
	renderLeft = true,
	renderRight,
	renderCenter,
	shouldRender = true,
	...props
}) => {
	const timeoutRef = useRef<NodeJS.Timeout>();
	const [showTip, setShowTip] = useState(false);
	const { ref: policyRef } = useEventListener({
		insideHandler: () => {
			setShowTip(pv => !pv);
			clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				setShowTip(false);
			}, 3000);
		},
		outsideHandler: () => setShowTip(false)
	});

	return (
		<span
			ref={policyRef}
			data-tip={tip}
			className={cm([
				'relative flex z-30 cursor-pointer after:bg-Very_dark_blue',
				// position & dimensions
				'after:absolute after:-top-2 after:px-6 after:py-3 after:rounded-md after:w-max',
				renderLeft && 'after:left-0',
				renderRight && 'after:right-0',
				renderCenter && 'after:left-1/2 after:-translate-x-1/2',
				// typography
				'after:text-xl after:font-semibold after:tracking-wide after:normal-case after:text-Very_light_grayish_blue after:content-[attr(data-tip)]',
				// animation
				'after:opacity-0 after:invisible after:transition-[transform,opacity] after:duration-300',
				showTip &&
					shouldRender &&
					'after:-translate-y-11 after:opacity-100 after:visible',
				renderOnHover &&
					'after:hover:-translate-y-11 after:hover:opacity-100 after:hover:visible',
				className
			])}
			{...props}>
			{children}
		</span>
	);
};

export default ToolTip;
