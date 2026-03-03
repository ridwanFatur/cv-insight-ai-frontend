import { getUserTokenApi } from "@/api/user-token-api"
import { useGlobal } from "@/global-context/global"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export function useProfilePageState() {
	const { user } = useGlobal()

	const [totalTokens, setTotalTokens] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)

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

	return {
		user,
		totalTokens,
		loading,
	}
}

type ProfilePageStateType = ReturnType<typeof useProfilePageState>

export const ProfilePageContext: React.Context<ProfilePageStateType> = createContext(
	{} as ProfilePageStateType,
)

export function useProfilePage() {
	const context = useContext(ProfilePageContext)
	if (!context) throw new Error("useProfilePage must be used inside ProfilePageProvider")
	return context
}

export default function ProfilePageProvider({ children }: { children: ReactNode }) {
	return (
		<ProfilePageContext.Provider value={useProfilePageState()}>
			{children}
		</ProfilePageContext.Provider>
	)
}

