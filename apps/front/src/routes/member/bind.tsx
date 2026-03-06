import { Bind } from '@houdunyun/react/member'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/member/bind')({
	component: Bind,
})

