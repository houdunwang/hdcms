import type { Data } from '@app/admin/data';
import { atom } from 'jotai';

export const userAtom = atom<Data.User | undefined | null>(null)

