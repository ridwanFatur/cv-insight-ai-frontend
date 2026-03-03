import { getUserApi } from "@/api/user-api";
import type { User } from "@/models/User";
import { getCookie, removeCookie } from "@/utils/cookie-helper";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useSearchParams } from "react-router-dom";

export function useGlobalState() {
	const [isAppLoaded, setIsAppLoaded] = useState(false);
	const hasCheckedAuth = useRef(false);
	const [user, setUser] = useState<User>()
	const [isDarkTheme, setIsDarkTheme] = useState(false)
	const [language, setLanguage] = useState<"en" | "id">()
	const [searchParams] = useSearchParams();
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	useEffect(() => {
		const langParam = searchParams.get("lang");
		if (langParam === "en" || langParam === "id") {
			setLanguage(langParam);
		} else {
			const storedLang = localStorage.getItem("language");
			if (storedLang === "en" || storedLang === "id") {
				setLanguage(storedLang);
			} else {
				setLanguage("en")
			}
		}
	}, [searchParams]);

	useEffect(() => {
		if (language != undefined) {
			localStorage.setItem("language", language);
		}
	}, [language])

	async function checkAuth() {
		const token = getCookie("token");
		if (!token) {
			setIsAppLoaded(true)
			return;
		}

		try {
			const result = await getUserApi()
			setUser(result.user)
			setIsAppLoaded(true)
			return
		} catch (e) {
			setUser(undefined)
			setIsAppLoaded(true)
			removeCookie("token")
		}
	}

	useEffect(() => {
		if (!hasCheckedAuth.current) {
			checkAuth();
			hasCheckedAuth.current = true;
		}
	}, [])

	function openLogoutDialog() {
		setIsLogoutOpen(true)
	}

	function handleLogout() {
		setUser(undefined)
		removeCookie("token")
	}

	return {
		isAppLoaded,
		setIsAppLoaded,
		user,
		setUser,
		isDarkTheme,
		setIsDarkTheme,
		language,
		setLanguage,
		isMobileSidebarOpen,
		setIsMobileSidebarOpen,
		openLogoutDialog,
		isLogoutOpen,
		setIsLogoutOpen,
		handleLogout
	}
}

type GlobalStateType = ReturnType<typeof useGlobalState>

export const GlobalContext: React.Context<GlobalStateType> = createContext(
	{} as GlobalStateType,
)

export function useGlobal() {
	const context = useContext(GlobalContext)
	if (!context) throw new Error('useGlobal must be used inside GlobalProvider')

	return context
}

export default function GlobalProvider({ children }: { children: ReactNode }) {
	return <GlobalContext.Provider value={useGlobalState()}>{children}</GlobalContext.Provider>
}

