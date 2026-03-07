import vine from '@vinejs/vine'

export const loginValidator = vine.create(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(5).maxLength(20),
  })
)
