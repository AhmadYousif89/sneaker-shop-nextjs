// 'use client';
import { FC, HTMLAttributes, useState } from 'react';
import { useEventListener } from '@/hooks/use-event-listener';
import { cm } from '@/lib/class-merger';

type ToolTipProps = {
	tip: string | JSX.Element;
	renderOnHover?: boolean;
	renderOnClick?: boolean;
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
	renderOnClick = true,
	...props
}) => {
	const [showPolicyTip, setShowPolicyTip] = useState(false);
	const { ref: policyRef } = useEventListener({
		insideHandler: () => setShowPolicyTip(!showPolicyTip),
		outsideHandler: () => setShowPolicyTip(false)
	});

	return (
		<span
			ref={policyRef}
			data-tip={tip}
			aria-pressed={showPolicyTip}
			className={cm([
				'relative z-30 cursor-pointer after:bg-Very_dark_blue',
				// position & dimensions
				'after:absolute after:-top-3 after:px-6 after:py-3 after:rounded-md after:w-max',
				renderLeft && 'after:left-0',
				renderRight && 'after:right-0',
				renderCenter && 'after:left-1/2 after:-translate-x-1/2',
				// typography
				'after:text-xl after:font-semibold after:tracking-wide after:normal-case after:text-Very_light_grayish_blue after:content-[attr(data-tip)]',
				// animation
				'after:opacity-0 after:invisible after:transition-[transform,opacity] after:duration-300',
				renderOnHover &&
					'after:hover:-translate-y-9 after:hover:opacity-100 after:hover:visible',
				renderOnClick &&
					'after:aria-pressed:-translate-y-9 after:aria-pressed:opacity-100 after:aria-pressed:visible',
				className
			])}
			{...props}>
			{children}
		</span>
	);
};

export default ToolTip;
