import { useState, useEffect } from 'react';

export const useHydratedState = (value: string | number, initState: string | number) => {
	const [state, setState] = useState(initState);

	useEffect(() => {
		setState(value);
	}, [value]);

	return state;
};
