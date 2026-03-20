import type { Data } from '@app/admin/data';
import { atom } from 'jotai';

export const configAtom = atom<Data.Config[] | undefined | null>(null)
