export const SpinnerIcon = ({ className = '' }) => {
	return (
		<span
			aria-label='loading spinner'
			className={`${className} flex items-center justify-center after:p-4 after:rounded-full after:absolute after:border-4 after:border-Very_light_grayish_blue  after:border-l-Dark_grayish_blue after:animate-spin`}
		/>
	);
};
