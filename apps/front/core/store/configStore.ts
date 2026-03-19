import { atom, type WritableAtom } from 'jotai';
import type { Data } from '@app/admin/data'

export const configAtom: WritableAtom<Data.Config[] | undefined, [Data.Config[] | undefined], void> = atom<Data.Config[] | undefined>(undefined)
