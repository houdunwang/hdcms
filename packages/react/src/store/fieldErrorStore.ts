import { atom, type WritableAtom } from "jotai";
export const fieldErrorAtom: WritableAtom<Record<string, string>, [Record<string, string>], void> = atom<Record<string, string>>({})
// export const fieldErrorStore = createStore({
// 	errors: {} as Record<string, string>,
// });