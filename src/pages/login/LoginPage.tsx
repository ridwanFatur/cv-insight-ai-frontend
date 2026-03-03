import { APP_NAME } from "@/utils/string-constants";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";
import { useGlobal } from "@/global-context/global";

export default function LoginPage() {
	const { isDarkTheme, language, setLanguage, setIsDarkTheme } = useGlobal();
	const theme = getTheme(isDarkTheme);
	const captions = getLocalizedTexts(language);

	const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
	const toggleLanguage = () =>
		setLanguage(language === "id" ? "en" : "id");

	return (
		<div
			className={`min-h-screen ${theme.pageBg} flex items-center justify-center px-6 font-sans relative overflow-hidden`}
			style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
		>
			<div className="absolute top-4 right-4 flex items-center gap-3 z-50">
				<button
					onClick={toggleLanguage}
					className={`cursor-pointer px-3 py-1.5 text-xs rounded-full border transition ${theme.cardBorder} ${theme.cardBg} ${theme.headingColor} hover:scale-105`}
				>
					{language === "id" ? "ID" : "EN"}
				</button>
				<button
					onClick={toggleTheme}
					className={`cursor-pointer px-3 py-1.5 text-xs rounded-full border transition ${theme.cardBorder} ${theme.cardBg} ${theme.headingColor} hover:scale-105`}
				>
					{isDarkTheme ? "🌙 Dark" : "☀ Light"}
				</button>
			</div>

			<div className="absolute inset-0 pointer-events-none">
				<div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 ${theme.blobPrimary} rounded-full blur-[140px]`} />
				<div className={`absolute bottom-1/4 left-1/4 w-75 h-75 ${theme.blobSecondary} rounded-full blur-[120px]`} />
			</div>

			<div className="relative w-full max-w-md flex flex-col items-center gap-6">
				<div className="text-center">
					<h2 className={`text-sm font-semibold tracking-[0.3em] uppercase ${theme.appNameColor}`}>
						{APP_NAME}
					</h2>
				</div>

				<div className={`w-full rounded-3xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-xl p-8 shadow-xl flex flex-col gap-6`}>
					<div className="text-center">
						<h1 className={`${theme.headingColor} text-2xl font-semibold`}>
							{captions.welcome}
						</h1>
						<p className={`${theme.subtextColor} text-sm mt-2`}>
							{captions.signIn}
						</p>
					</div>

					<div className="flex flex-col gap-2 text-center text-xs">
						<p className={theme.featureText}>
							✨ {captions.feature1}
						</p>
						<p className={theme.featureText}>
							⚡ {captions.feature2}
						</p>
						<p className={theme.featureText}>
							🔒 {captions.feature3}
						</p>
					</div>

					<div className={`h-px ${theme.divider}`} />
					<GoogleSignInButton />

				</div>

				<p className={`${theme.footerText} text-xs text-center`}>
					© {new Date().getFullYear()} {APP_NAME}. {captions.rights}
				</p>
			</div>
		</div>
	);
}