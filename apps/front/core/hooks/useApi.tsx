import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { useRequestClient } from './useRequestClient'

export const useApi = () => {
	const requestClient = useRequestClient()
	const api = createTuyauReactQueryClient({ client: requestClient })
	return { api, requestClient }
}


