import { getTheme } from "@/utils/theme";
import { APP_NAME } from "@/utils/string-constants";
import { useGlobal } from "@/global-context/global";

export default function LoadingPage() {
	const { isDarkTheme } = useGlobal();
	const theme = getTheme(isDarkTheme);

	return (
		<div className={`h-dvh flex items-center justify-center ${theme.pageBg} relative overflow-hidden`}>
			<div className="absolute inset-0 pointer-events-none">
				<div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-87.5 ${theme.blobPrimary} rounded-full blur-[140px]`} />
				<div className={`absolute bottom-1/4 left-1/4 w-62.5 h-62.5 ${theme.blobSecondary} rounded-full blur-[120px]`} />
			</div>

			<div className="relative flex flex-col items-center gap-6">
				<div
					className={`animate-spin rounded-full h-14 w-14 border-4 ${theme.loaderRing}`}
				/>
				<div className="flex flex-col items-center gap-2">
					<p className={`text-sm font-medium tracking-wide ${theme.appNameColor}`}>
						{APP_NAME}
					</p>
				</div>

			</div>
		</div>
	);
}