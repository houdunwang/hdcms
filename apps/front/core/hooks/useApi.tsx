import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { useRequestClient } from './useRequestClient'

import type { InferTree } from '@tuyau/core/types'
import type { TransformToReactQuery } from '@tuyau/react-query'
type Registry = typeof import('@app/admin/registry').registry
type ApiTree = InferTree<Registry>
type ReactQueryApi = TransformToReactQuery<ApiTree>

export const useApi = (): ReactQueryApi => {
	const requestClient = useRequestClient()
	const api = createTuyauReactQueryClient({ client: requestClient })
	return api
}

