import { NavLink } from "react-router-dom";
import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";
import { useGlobal } from "@/global-context/global";


export default function MobileSidebar() {
	const { isDarkTheme, setIsDarkTheme, language, setLanguage, openLogoutDialog, isMobileSidebarOpen, setIsMobileSidebarOpen } = useGlobal();
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

	return <div
		className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${isMobileSidebarOpen
			? "opacity-100 pointer-events-auto"
			: "opacity-0 pointer-events-none"
			}`}
	>
		<div
			className={`flex-1 transition-opacity duration-300 ${isDarkTheme ? "bg-black/60" : "bg-black/30"
				}`}
			onClick={() => setIsMobileSidebarOpen(false)}
		/>

		<div
			className={`w-64 h-full ${theme.sidebarBg} ${theme.sidebarBorder}
					p-6 flex flex-col gap-6 shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
				}`}
		>
			<button
				className={`self-end text-lg cursor-pointer transition ${theme.headingColor} hover:opacity-70`}
				onClick={() => setIsMobileSidebarOpen(false)}
			>
				✕
			</button>

			<NavLink to="/" className={navItemClass} onClick={() => setIsMobileSidebarOpen(false)}>
				{captions.checkCv}
			</NavLink>

			<NavLink
				to="/uploaded-cv"
				className={navItemClass}
				onClick={() => setIsMobileSidebarOpen(false)}
			>
				{captions.uploadedCv}
			</NavLink>

			<NavLink
				to="/profile"
				className={navItemClass}
				onClick={() => setIsMobileSidebarOpen(false)}
			>
				{captions.profile}
			</NavLink>

			<div className={`h-px ${theme.cardBorder}`} />

			<button
				onClick={toggleLanguage}
				className={`cursor-pointer text-left text-sm ${theme.headingColor}`}
			>
				🌐 {language === "id" ? "Switch to English" : "Ganti ke Bahasa"}
			</button>

			<button
				onClick={toggleTheme}
				className={`cursor-pointer text-left text-sm ${theme.headingColor}`}
			>
				{isDarkTheme ? "🌙 Dark Mode" : "☀ Light Mode"}
			</button>

			<button
				onClick={openLogoutDialog}
				className="cursor-pointer text-left text-sm text-red-500 hover:opacity-80 transition"
			>
				🚪Logout
			</button>
		</div>
	</div>
}