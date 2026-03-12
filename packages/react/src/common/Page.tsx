
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
import { useRouterState } from '@tanstack/react-router'
import qs from 'qs'
import { type JSX } from 'react'

export const Page = ({ meta }: { meta: typeof registry.$tree.users.index.types.response.metadata }): JSX.Element => {
	const location = useRouterState({ select: s => s.location })
	const url = (page: number) => {
		return location.pathname + '?' + qs.stringify({ ...location.search, page })
	}
	return <Pagination>
		<PaginationContent>
			{meta.previousPageUrl && (
				<PaginationItem>
					<PaginationPrevious href={url(Number(meta.currentPage) - 1)} text='上一页' />
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
								<PaginationLink href={url(p)}>{p}</PaginationLink>
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
								<PaginationLink href={url(p)}>{p}</PaginationLink>
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
					<PaginationNext href={url(Number(meta.currentPage) + 1)} text='下一页' />
				</PaginationItem>
			)}
		</PaginationContent>
	</Pagination>
}