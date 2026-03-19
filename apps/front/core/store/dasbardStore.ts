import { atom, type WritableAtom } from 'jotai';

export const dasbardStore: WritableAtom<Record<string, any> | undefined, [Record<string, any> | undefined], void>
	= atom<Record<string, any> | undefined>(undefined)
