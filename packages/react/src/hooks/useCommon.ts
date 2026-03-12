import { useRouterState } from "@tanstack/react-router"

type Types = {
	getCurrentPage: () => number;
}

export const useCommon = (): Types => {
	const location = useRouterState({ select: s => s.location })
	const getCurrentPage = (): number => {
		return location.search?.page || 1
	}

	return {
		getCurrentPage
	}
}