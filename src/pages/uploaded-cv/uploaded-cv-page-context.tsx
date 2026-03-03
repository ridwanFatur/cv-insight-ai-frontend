import { getCvFeedback } from "@/api/cv-feedback-api"
import type { CVFeedback } from "@/models/CVFeedback"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export function useUploadedCVPageState() {
	const [data, setData] = useState<CVFeedback[]>([])
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(false)

	const totalPages = Math.ceil(total / pageSize)

	const fetchData = async () => {
		try {
			setLoading(true)

			const response = await getCvFeedback({
				page,
				page_size: pageSize,
			})

			setData(response.data ?? [])
			setTotal(response.total ?? 0)
		} catch (error) {
			console.error("Failed fetch CV feedback", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [page, pageSize])

	return {
		data,
		page,
		pageSize,
		total,
		totalPages,
		loading,
		setPage,
		setPageSize,
		refetch: fetchData,
	}
}

type UploadedCVPageStateType = ReturnType<typeof useUploadedCVPageState>

export const UploadedCVPageContext: React.Context<UploadedCVPageStateType> = createContext(
	{} as UploadedCVPageStateType,
)

export function useUploadedCVPage() {
	const context = useContext(UploadedCVPageContext)
	if (!context) throw new Error('useUploadedCVPage must be used inside UploadedCVPageProvider')

	return context
}

export default function UploadedCVPageProvider({ children }: { children: ReactNode }) {
	return <UploadedCVPageContext.Provider value={useUploadedCVPageState()}>{children}</UploadedCVPageContext.Provider>
}

