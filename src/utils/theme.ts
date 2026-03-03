export const getTheme = (isDarkTheme: boolean) => ({
	pageBg: isDarkTheme ? "bg-[#0c0c0f]" : "bg-[#f4f4f8]",
	blobPrimary: isDarkTheme ? "bg-indigo-600/10" : "bg-indigo-400/15",
	blobSecondary: isDarkTheme ? "bg-violet-500/8" : "bg-violet-300/20",
	appNameColor: isDarkTheme ? "text-indigo-400/80" : "text-indigo-600/80",
	cardBorder: isDarkTheme ? "border-white/8" : "border-black/8",
	cardBg: isDarkTheme ? "bg-white/4" : "bg-white/70",
	headingColor: isDarkTheme ? "text-white" : "text-gray-900",
	subtextColor: isDarkTheme ? "text-white/40" : "text-gray-500",
});