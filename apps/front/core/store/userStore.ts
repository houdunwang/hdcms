import { atom, type WritableAtom } from 'jotai';
import type { Data } from '@app/admin/data'

export const userAtom: WritableAtom<Data.User | undefined, [Data.User | undefined], void> = atom<Data.User | undefined>(undefined)
