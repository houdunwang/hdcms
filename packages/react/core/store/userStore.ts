import type { IUser } from '@core/types';
import { atom } from 'jotai';

export const userAtom = atom<IUser | undefined>(undefined)
