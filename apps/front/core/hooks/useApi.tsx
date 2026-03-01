import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { useRequestClient } from './useRequestClient'
import { useAuth } from './useAuth'

export const useApi = () => {
	const auth = useAuth()
	const requestClient = useRequestClient()
	const api = createTuyauReactQueryClient({ client: requestClient })
	return { api, auth, requestClient }
}


