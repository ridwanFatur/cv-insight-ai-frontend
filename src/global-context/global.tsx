import { getUserApi } from "@/api/user-api";
import type { User } from "@/models/User";
import { getCookie, removeCookie } from "@/utils/cookie-helper";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export function useGlobalState() {
	const [isAppLoaded, setIsAppLoaded] = useState(false);
	const [user, setUser] = useState<User>()
	const [isDarkTheme, setIsDarkTheme] = useState(
		() => localStorage.getItem("dark") === "true"
	);
	const [language, setLanguage] = useState<"en" | "id">(() => {
		const langParam = new URLSearchParams(window.location.search).get("lang");

		if (langParam === "en" || langParam === "id") {
			return langParam;
		}

		const storedLang = localStorage.getItem("language");
		if (storedLang === "en" || storedLang === "id") {
			return storedLang;
		}

		return "en";
	});
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem("dark", String(isDarkTheme));
	}, [isDarkTheme]);

	useEffect(() => {
		localStorage.setItem("language", language);
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
		checkAuth();
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

