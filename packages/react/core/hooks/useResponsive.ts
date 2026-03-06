import { configResponsive, useResponsive as useResponsiveHook } from 'ahooks';

configResponsive({
	small: 0,
	middle: 800,
	large: 1200,
});

export const useResponsive = () => {
	const responsive = useResponsiveHook();
	return responsive
}