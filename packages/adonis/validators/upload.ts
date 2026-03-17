import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'

export const uploadImageSingleValidator = vine.create(
  vine.object({
    file: vine.file({ size: '2mb', extnames: ['jpg', 'jpeg', 'png'] }),
  })
)
uploadImageSingleValidator.messagesProvider = validateProvider({
  messages: {},
  fields: {
    file: '文件',
  },
})
