import { getCvFeedback } from "@/api/cv-feedback-api"
import { useGlobal } from "@/global-context/global"
import type { CVFeedback } from "@/models/CVFeedback"
import { WS_URL } from "@/utils/api-constants"
import { getCookie } from "@/utils/cookie-helper"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export function useUploadedCVPageState() {
	const { user } = useGlobal()
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

	const [socket, setSocket] = useState<WebSocket | null>(null)

	useEffect(() => {
		const token = getCookie("token");
		const wsUrl = `${WS_URL}/ws/cv-result/${user?.id}?token=${encodeURIComponent(token!)}`;
		const ws = new WebSocket(wsUrl);

		ws.onopen = () => {
			console.log("Connected")
		}

		ws.onmessage = (event) => {
			console.log(event)
		}

		ws.onclose = () => {
			console.log("Disconnected")
		}

		ws.onerror = (error) => {
			console.log("WebSocket error", error)
		}

		setSocket(ws)

		return () => {
			ws.close();
		};
	}, [])

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
		socket,
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

