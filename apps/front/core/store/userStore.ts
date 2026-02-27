import type { Data } from '@app/admin/data';
import { atom } from 'jotai';
export const userAtom = atom<Data.User | undefined>(undefined)
// export const userStore = createStore({
// 	user: undefined as Data.User | undefined,
// });
