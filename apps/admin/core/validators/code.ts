import { getUserByName } from '#core/helper'
import vine from '@vinejs/vine'

export const sendCodeValidator = vine.create(
  vine.object({
    account: vine.string().exists(async (_db, value, _field) => {
      return !!(await getUserByName(value))
    }),
  })
)

