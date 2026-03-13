
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { registry } from '@app/admin/registry'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { type JSX } from 'react'

export const Page = ({ meta }: { meta?: typeof registry.$tree.users.index.types.response.metadata }): JSX.Element => {
	const location = useRouterState({ select: s => s.location })
	const navigate = useNavigate()
	const url = (page: number) => {
		navigate({ to: location.pathname, search: { ...location.search, page } })
	}
	if (!meta) return <></>

	return <Pagination>
		<PaginationContent>
			{meta.previousPageUrl && (
				<PaginationItem>
					<PaginationPrevious onClick={() => url(Number(meta.currentPage) - 1)} text='上一页' />
				</PaginationItem>
			)}
			{(() => {
				const currentPage = Number(meta.currentPage ?? 1)
				const startPage = Math.max(1, currentPage - 3)
				const prevPages = Array.from({ length: currentPage - startPage }, (_, i) => startPage + i)
				return (
					<>
						{prevPages.map(p => (
							<PaginationItem key={p}>
								<PaginationLink onClick={() => url(p)}>{p}</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationLink href="#" isActive className='active'>{currentPage}</PaginationLink>
						</PaginationItem>
					</>
				)
			})()}
			{(() => {
				const currentPage = Number(meta.currentPage ?? 1)
				const total = Number(meta.lastPage ?? currentPage)
				const endPage = Math.min(total, currentPage + 3)
				const nextPages = Array.from({ length: endPage - currentPage }, (_, i) => currentPage + 1 + i)
				return (
					<>
						{nextPages.map(p => (
							<PaginationItem key={p}>
								<PaginationLink onClick={() => url(p)}>{p}</PaginationLink>
							</PaginationItem>
						))}
					</>
				)
			})()}
			{
				meta.currentPage + 3 < meta.lastPage && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)
			}
			{meta.nextPageUrl && (
				<PaginationItem>
					<PaginationNext onClick={() => url(Number(meta.currentPage) + 1)} text='下一页' />
				</PaginationItem>
			)}
		</PaginationContent>
	</Pagination>
}