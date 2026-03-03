import { NavLink } from "react-router-dom";
import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";
import { APP_NAME } from "@/utils/string-constants";
import { useGlobal } from "@/global-context/global";


export default function Header() {
	const { isDarkTheme, setIsDarkTheme, language, setLanguage, setIsMobileSidebarOpen, openLogoutDialog } = useGlobal();
	const theme = getTheme(isDarkTheme);
	const captions = getLocalizedTexts(language);

	const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
	const toggleLanguage = () =>
		setLanguage(language === "id" ? "en" : "id");

	const navItemClass = ({ isActive }: { isActive: boolean }) =>
		`text-sm font-medium transition ${isActive
			? "text-indigo-500"
			: isDarkTheme
				? "text-white/60 hover:text-white"
				: "text-gray-600 hover:text-gray-900"
		}`;

	return <header
		className={`sticky top-0 z-50 backdrop-blur-xl border-b ${theme.cardBorder} ${theme.cardBg}`}
	>
		<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
			<h1
				className={`text-sm font-semibold tracking-widest ${theme.appNameColor}`}
			>
				{APP_NAME}
			</h1>

			<nav className="hidden md:flex items-center gap-8">
				<NavLink to="/" className={navItemClass}>
					{captions.checkCv}
				</NavLink>

				<NavLink to="/uploaded-cv" className={navItemClass}>
					{captions.uploadedCv}
				</NavLink>

				<NavLink to="/profile" className={navItemClass}>
					{captions.profile}
				</NavLink>
			</nav>

			<div className="flex items-center gap-3">
				<button
					onClick={toggleLanguage}
					className={`cursor-pointer px-3 py-1.5 text-xs rounded-full border transition
							${theme.cardBorder} ${theme.cardBg} ${theme.headingColor}
							hover:scale-105 hidden md:block`}
				>
					{language === "id" ? "ID" : "EN"}
				</button>

				<button
					onClick={toggleTheme}
					className={`cursor-pointer px-3 py-1.5 text-xs rounded-full border transition
							${theme.cardBorder} ${theme.cardBg} ${theme.headingColor}
							hover:scale-105 hidden md:block`}
				>
					{isDarkTheme ? "🌙" : "☀"}
				</button>

				<button
					onClick={openLogoutDialog}
					className={`cursor-pointer px-3 py-1.5 text-xs rounded-full border transition
							${theme.cardBorder} ${theme.cardBg} ${theme.headingColor}
							hover:scale-105 hidden md:block`}
				>
					Logout
				</button>

				<button
					className={`md:hidden text-xl cursor-pointer transition ${isDarkTheme
						? "text-white hover:text-white/80"
						: "text-gray-800 hover:text-gray-600"
						}`}
					onClick={() => setIsMobileSidebarOpen(true)}
				>
					☰
				</button>
			</div>
		</div>
	</header>
}