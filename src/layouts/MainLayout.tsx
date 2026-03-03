import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";
import { APP_NAME } from "@/utils/string-constants";
import { useGlobal } from "@/global-context/global";

export default function MainLayout() {
	const { isDarkTheme, setIsDarkTheme, language, setLanguage } = useGlobal();
	const theme = getTheme(isDarkTheme);
	const captions = getLocalizedTexts(language);
	const [isOpen, setIsOpen] = useState(false);

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

	return (
		<div className={`min-h-dvh flex flex-col ${theme.pageBg}`}>
			<header
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
							className={`md:hidden text-xl cursor-pointer transition ${isDarkTheme
								? "text-white hover:text-white/80"
								: "text-gray-800 hover:text-gray-600"
								}`}
							onClick={() => setIsOpen(true)}
						>
							☰
						</button>
					</div>
				</div>
			</header>

			<div
				className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
					}`}
			>
				<div
					className={`flex-1 transition-opacity duration-300 ${isDarkTheme
						? "bg-black/60"
						: "bg-black/30"
						}`}
					onClick={() => setIsOpen(false)}
				/>
				<div
					className={`w-64 h-full ${theme.sidebarBg} ${theme.sidebarBorder}
					p-6 flex flex-col gap-6 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
				>
					<button
						className={`self-end text-lg cursor-pointer transition ${theme.headingColor} hover:opacity-70`}
						onClick={() => setIsOpen(false)}
					>
						✕
					</button>

					<NavLink to="/" className={navItemClass} onClick={() => setIsOpen(false)}>
						{captions.checkCv}
					</NavLink>

					<NavLink to="/uploaded-cv" className={navItemClass} onClick={() => setIsOpen(false)}>
						{captions.uploadedCv}
					</NavLink>

					<NavLink to="/profile" className={navItemClass} onClick={() => setIsOpen(false)}>
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
				</div>
			</div>

			<main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
				<Outlet />
			</main>

			<footer
				className={`border-t ${theme.cardBorder} ${theme.cardBg} backdrop-blur-md`}
			>
				<div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
					<p className={theme.footerText}>
						© {new Date().getFullYear()} {APP_NAME}.{" "}
						{captions.rights}
					</p>

					<p className={theme.footerText}>
						{captions.builtBy}{" "}
						<a
							href="https://github.com/ridwanFatur"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-indigo-500 transition"
						>
							Ridwan Faturrahman
						</a>
					</p>

					<a
						href="https://github.com/ridwanFatur"
						target="_blank"
						rel="noopener noreferrer"
						className={`${theme.footerText} hover:text-indigo-500 transition`}
					>
						{captions.github}
					</a>
				</div>
			</footer>
		</div>
	);
}