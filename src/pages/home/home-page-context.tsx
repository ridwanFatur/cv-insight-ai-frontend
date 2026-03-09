import { getUserTokenApi } from "@/api/user-token-api"
import { uploadCv } from "@/api/cv-feedback-api"
import type { CVFeedback } from "@/models/CVFeedback"
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react"
import { useNavigate } from "react-router-dom"

export function useHomePageState() {
	const [totalTokens, setTotalTokens] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)
	const [file, setFile] = useState<File | null>(null)
	const [cvFeedback, setCvFeedback] = useState<CVFeedback | null>(null)
	const [uploading, setUploading] = useState<boolean>(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUserToken = async () => {
			try {
				const response = await getUserTokenApi()
				setTotalTokens(response.total_tokens)
			} catch (error) {
				console.error("Failed to fetch user token", error)
			} finally {
				setLoading(false)
			}
		}

		fetchUserToken()
	}, [])

	const handleUpload = async () => {
		if (!file) return

		try {
			setUploading(true)

			const response = await uploadCv({ file })

			setTotalTokens(response.remaining_tokens)
			navigate("/uploaded-cv")
			setFile(null)
		} catch (error) {
			console.error("Upload failed", error)
		} finally {
			setUploading(false)
		}
	}

	return {
		totalTokens,
		loading,
		file,
		setFile,
		cvFeedback,
		uploading,
		handleUpload,
		setCvFeedback
	}
}

type HomePageStateType = ReturnType<typeof useHomePageState>

export const HomePageContext =
	createContext({} as HomePageStateType)

export function useHomePage() {
	const context = useContext(HomePageContext)
	if (!context)
		throw new Error(
			"useHomePage must be used inside HomePageProvider",
		)

	return context
}

export default function HomePageProvider({
	children,
}: {
	children: ReactNode
}) {
	return (
		<HomePageContext.Provider value={useHomePageState()}>
			{children}
		</HomePageContext.Provider>
	)
}