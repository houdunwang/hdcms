import { app } from '../../config/app'
import { Header } from '#core/common'

export const HdHeader = () => {
	return (
		<Header config={app} />
	)
}
