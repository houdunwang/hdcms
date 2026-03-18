import { registry } from '@app/admin/registry';
import { atom, type WritableAtom } from 'jotai';

export const dasbardStore: WritableAtom<typeof registry.$tree.admin.types.response.data | undefined, [typeof registry.$tree.admin.types.response.data | undefined], void>
	= atom<typeof registry.$tree.admin.types.response.data | undefined>(undefined)
