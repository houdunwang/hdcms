import { atom } from "jotai";
export const fieldErrorAtom = atom<Record<string, string>>({})
// export const fieldErrorStore = createStore({
// 	errors: {} as Record<string, string>,
// });