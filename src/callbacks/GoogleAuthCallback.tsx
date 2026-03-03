import { loginApi } from "@/api/auth-api";
import LoadingPage from "@/components/LoadingPage";
import { useGlobal } from "@/global-context/use-global";
import { removeCookie, setCookie } from "@/utils/cookie-helper";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleAuthCallback() {
	const { setUser } = useGlobal()
	const [searchParams] = useSearchParams();
	const hasCheckedAuthCode = useRef(false);
	const navigate = useNavigate()

	async function googleLogin() {
		const code = searchParams.get("code");
		if (code) {
			try {
				const result = await loginApi({
					auth_code: code
				})
				setCookie("token", result.token)
				setUser(result.user)
			} catch (e) {
				removeCookie("token")
				setUser(undefined)
				navigate("/")
			}
		} else {
			navigate("/")
		}
	}

	useEffect(() => {
		if (!hasCheckedAuthCode.current) {
			googleLogin();
			hasCheckedAuthCode.current = true;
		}
	}, [searchParams]);

	return <LoadingPage />
}