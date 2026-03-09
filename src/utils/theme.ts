export const getTheme = (isDarkTheme: boolean) => ({
	pageBg: isDarkTheme ? "bg-[#0b0b12]" : "bg-[#f7f8fc]",

	sidebarBg: isDarkTheme
		? "bg-[#11111a]"
		: "bg-white",

	sidebarBorder: isDarkTheme
		? "border-l border-white/10"
		: "border-l border-gray-200",

	blobPrimary: isDarkTheme ? "bg-indigo-600/15" : "bg-indigo-400/20",
	blobSecondary: isDarkTheme ? "bg-violet-500/10" : "bg-purple-300/20",

	appNameColor: isDarkTheme
		? "text-indigo-400/80"
		: "text-indigo-600/90",

	cardBorder: isDarkTheme
		? "border-white/10"
		: "border-black/10",

	cardBg: isDarkTheme
		? "bg-white/5"
		: "bg-white/70",

	headingColor: isDarkTheme
		? "text-white"
		: "text-gray-900",

	subtextColor: isDarkTheme
		? "text-white/60"
		: "text-gray-600",

	featureText: isDarkTheme
		? "text-white/50"
		: "text-gray-600",

	divider: isDarkTheme
		? "bg-white/10"
		: "bg-black/10",

	footerText: isDarkTheme
		? "text-white/30"
		: "text-gray-500",

	loaderRing: isDarkTheme
		? "border-indigo-500 border-t-transparent"
		: "border-indigo-600 border-t-transparent",

	loaderText: isDarkTheme
		? "text-white/50"
		: "text-gray-500",

	textPrimary: isDarkTheme ? "text-white" : "text-gray-900",
	textSecondary: isDarkTheme ? "text-gray-400" : "text-gray-600",
	link: isDarkTheme
		? "text-indigo-400 hover:text-indigo-300"
		: "text-indigo-600 hover:text-indigo-700",
	primaryButtonBg: isDarkTheme ? "bg-indigo-600" : "bg-indigo-600",
	primaryButtonHoverBg: isDarkTheme ? "bg-indigo-500" : "bg-indigo-700",
	buttonText: "text-white",
	errorText: "text-red-500",

	googleButtonBg: isDarkTheme ? "bg-gray-800" : "bg-white",
	googleButtonText: isDarkTheme ? "text-white" : "text-gray-800",
	googleButtonHoverBg: isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100",
	googleButtonActiveBg: isDarkTheme ? "active:bg-gray-600" : "active:bg-gray-200",

	dragBorder: isDarkTheme ? "border-blue-400" : "border-blue-500",
	dragBg: isDarkTheme ? "bg-blue-900/20" : "bg-blue-50",
	fileCardBg: isDarkTheme ? "bg-gray-800" : "bg-gray-50",
	fileCardBorder: isDarkTheme ? "border-gray-700" : "border-gray-300",
	fileNameText: isDarkTheme ? "text-gray-200" : "text-gray-800",
	fileSizeText: isDarkTheme ? "text-gray-400" : "text-gray-400",
});