import { getGoogleConfigApi } from "@/api/auth-api";
import { useGlobal } from "@/global-context/use-global";
import GoogleIcon from "@/icons/GoogleIcon";
import { getLocalizedTexts } from "@/utils/language";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton() {
	const { language } = useGlobal();
	const captions = getLocalizedTexts(language);
	const navigate = useNavigate()

	async function redirectToGoogleAuth() {
		try {
			const result = await getGoogleConfigApi()
			const clientId = result.client_id
			const redirectUri = `${window.location.origin}/auth/google/callback`;
			const scope = "openid email profile";

			const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
			url.searchParams.set("client_id", clientId);
			url.searchParams.set("redirect_uri", redirectUri);
			url.searchParams.set("response_type", "code");
			url.searchParams.set("scope", scope);
			url.searchParams.set("access_type", "offline");
			url.searchParams.set("prompt", "consent");
			window.location.href = url.toString();
		} catch (e) {
			navigate("/")
		}
	}

	return (
		<button
			onClick={redirectToGoogleAuth}
			className={clsx(
				"w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl text-sm font-medium",
				"bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200",
				"transition-all duration-150 ease-in-out shadow-[0_1px_3px_rgba(0,0,0,0.4)] cursor-pointer"
			)}
		>
			<GoogleIcon />
			{captions.googleButton}
		</button>
	);
}