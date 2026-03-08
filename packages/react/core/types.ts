import { registry } from '@app/admin/registry'

export type IUser = NonNullable<typeof registry.$tree.users.profile.types.response>['data']