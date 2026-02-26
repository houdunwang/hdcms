import { createStore } from "@tanstack/react-store";
export const fieldErrorStore = createStore({
	errors: {} as Record<string, string>,
});