import type { Data } from '@app/admin/data';
import { createStore } from "@tanstack/react-store";
export const userStore = createStore<Data.User | undefined>(undefined);
