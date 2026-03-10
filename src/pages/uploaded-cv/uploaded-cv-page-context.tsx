import { useGlobal } from "@/global-context/global"
import type { CVFeedback } from "@/models/CVFeedback"
import { WS_URL } from "@/utils/api-constants"
import { getCookie } from "@/utils/cookie-helper"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useCvFeedback } from "@/query/cv-feedback-query"

export function useUploadedCVPageState() {
	const { user } = useGlobal()

	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const queryClient = useQueryClient()

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