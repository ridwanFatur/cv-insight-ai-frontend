export interface PaginationModel<T> {
	page: number
	page_size: number
	total: number
	total_pages: number
	data: T[]
}