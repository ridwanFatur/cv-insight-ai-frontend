import { useGlobal } from "@/global-context/global"
import type { CVFeedback } from "@/models/CVFeedback"
import { WS_URL } from "@/utils/api-constants"
import { getCookie } from "@/utils/cookie-helper"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useCvFeedback } from "@/query/cv-feedback-query"
import { getCvFeedbackDetail } from "@/api/cv-feedback-api"
import { queryClient } from "@/utils/query-client"

export function useUploadedCVPageState() {
	const { user } = useGlobal()

	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const { data: response, isLoading, refetch } = useCvFeedback(page, pageSize)

	const data: CVFeedback[] = response?.data ?? []
	const total = response?.total ?? 0

	const totalPages = Math.ceil(total / pageSize)

	const [socket, setSocket] = useState<WebSocket | null>(null)

	useEffect(() => {
		if (!user?.id) return

		const token = getCookie("token")
		const wsUrl = `${WS_URL}/ws/cv-result/${user.id}?token=${encodeURIComponent(token!)}`
		const ws = new WebSocket(wsUrl)

		ws.onmessage = (event) => {
			const payload = JSON.parse(event.data)

			const id = payload.id
			const status = payload.status
			const feedback = payload.feedback

			queryClient.setQueryData(
				["cvFeedback", page, pageSize],
				(old: any) => {
					if (!old) return old

					return {
						...old,
						data: old.data.map((item: CVFeedback) =>
							item.id === id
								? { ...item, status, feedback }
								: item
						),
					}
				}
			)
		}

		ws.onerror = (error) => {
			console.error("WebSocket error", error)
		}

		setSocket(ws)

		return () => {
			ws.close()
		}
	}, [user?.id, page, pageSize, queryClient])

	async function openFileLink(id: number) {
		try {
			const result = await queryClient.fetchQuery({
				queryKey: ["cvFeedbackDetail", id],
				queryFn: () => getCvFeedbackDetail({ id }),
				staleTime: 5 * 60 * 1000,
			})

			window.open(result.download_url, "_blank")
		} catch (e) {
			console.error(e)
		}
	}

	return {
		data,
		page,
		pageSize,
		total,
		totalPages,
		loading: isLoading,
		setPage,
		setPageSize,
		refetch,
		socket,
		openFileLink
	}
}

type UploadedCVPageStateType = ReturnType<typeof useUploadedCVPageState>

export const UploadedCVPageContext: React.Context<UploadedCVPageStateType> =
	createContext({} as UploadedCVPageStateType)

export function useUploadedCVPage() {
	const context = useContext(UploadedCVPageContext)
	if (!context)
		throw new Error("useUploadedCVPage must be used inside UploadedCVPageProvider")

	return context
}

export default function UploadedCVPageProvider({ children }: { children: ReactNode }) {
	return (
		<UploadedCVPageContext.Provider value={useUploadedCVPageState()}>
			{children}
		</UploadedCVPageContext.Provider>
	)
}