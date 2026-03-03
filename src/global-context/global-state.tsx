import { getUserApi } from "@/api/user-api";
import type { User } from "@/models/User";
import { getCookie, removeCookie } from "@/utils/cookie-helper";
import { createContext, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom";

export function useGlobalState() {
	const [isAppLoaded, setIsAppLoaded] = useState(false);
	const hasCheckedAuth = useRef(false);
	const [user, setUser] = useState<User>()
	const [isDarkTheme, setIsDarkTheme] = useState(false)
	const [language, setLanguage] = useState<"en" | "id">("en")
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const langParam = searchParams.get("lang");
		if (langParam === "en" || langParam === "id") {
			setLanguage(langParam);
			localStorage.setItem("language", langParam);
		} else {
			const storedLang = localStorage.getItem("language");
			if (storedLang === "en" || storedLang === "id") {
				setLanguage(storedLang);
			}
		}
	}, [searchParams]);

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

	return {
		isAppLoaded,
		setIsAppLoaded,
		user,
		setUser,
		isDarkTheme,
		setIsDarkTheme,
		language,
		setLanguage
	}
}

type GlobalStateType = ReturnType<typeof useGlobalState>

export const GlobalContext: React.Context<GlobalStateType> = createContext(
	{} as GlobalStateType,
)