import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";
import { APP_NAME } from "@/utils/string-constants";
import { useGlobal } from "@/global-context/global";


export default function Footer() {
	const { isDarkTheme, language } = useGlobal();
	const theme = getTheme(isDarkTheme);
	const captions = getLocalizedTexts(language);


	return <footer
		className={`border-t ${theme.cardBorder} ${theme.cardBg} backdrop-blur-md`}
	>
		<div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
			<p className={theme.footerText}>
				© {new Date().getFullYear()} {APP_NAME}. {captions.rights}
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
}