import { registry } from '@app/admin/registry';
import { atom } from 'jotai';

export const userAtom = atom<typeof registry.$tree.users.profile.types.response.data | undefined>(undefined)
