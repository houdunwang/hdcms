import { atom, type WritableAtom } from 'jotai';
import type { IUser } from '@/types/types';

export const userAtom: WritableAtom<IUser | undefined, [IUser | undefined], void> = atom<IUser | undefined>(undefined)
