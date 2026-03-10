import type { IUser } from '@/types/types';
import { atom } from 'jotai';

export const userAtom = atom<IUser | undefined>(undefined)
