import { APP_NAME } from "@/utils/string-constants";
import ShowcaseBox from "./components/ShowcaseBox";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useGlobal } from "@/global-context/use-global";
import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";

export default function LoginPage() {
	const { isDarkTheme, language } = useGlobal()
	const theme = getTheme(isDarkTheme);
	const captions = getLocalizedTexts(language)

	return (
		<div
			className={`min-h-screen ${theme.pageBg} flex flex-col items-center justify-center px-4 font-sans`}
			style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
		>
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
				<div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 ${theme.blobPrimary} rounded-full blur-[120px]`} />
				<div className={`absolute bottom-1/4 left-1/3 w-75 h-75 ${theme.blobSecondary} rounded-full blur-[100px]`} />
			</div>

			<div className="relative w-full max-w-sm flex flex-col items-center gap-5">
				<div className="text-center mb-1">
					<span className={`text-xs font-semibold tracking-[0.25em] uppercase ${theme.appNameColor}`}>
						{APP_NAME}
					</span>
				</div>

				<ShowcaseBox />

				<div className={`w-full rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 flex flex-col gap-4`}>
					<div className="text-center">
						<h1 className={`${theme.headingColor} text-xl font-semibold tracking-tight`}>
							{captions.welcome}
						</h1>
						<p className={`${theme.subtextColor} text-sm mt-1`}>
							{captions.signIn}
						</p>
					</div>
					<GoogleSignInButton />
				</div>
			</div>
		</div>
	);
}