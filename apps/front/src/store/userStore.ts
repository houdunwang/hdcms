import { createStore } from "@tanstack/react-store";
import { type User } from './../types/models/user';
export const userStore = createStore<User | undefined>(undefined);