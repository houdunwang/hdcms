import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { useRequestClient } from './useRequestClient'
import { useAuth } from './useAuth'

import type { TransformToReactQuery } from '@tuyau/react-query'
import type { InferTree } from '@tuyau/core/types'
import type { Tuyau } from '@tuyau/core/client'
type Registry = typeof import('@app/admin/registry').registry
type ApiTree = InferTree<Registry>
type ReactQueryApi = TransformToReactQuery<ApiTree>
type RequestClient = Tuyau<Registry>

export const useApi = (): { api: ReactQueryApi, auth: ReturnType<typeof useAuth>, requestClient: RequestClient } => {
	const auth = useAuth()
	const requestClient = useRequestClient()
	const api = createTuyauReactQueryClient({ client: requestClient })
	return { api, auth, requestClient }
}

