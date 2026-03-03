import { getTheme } from "@/utils/theme";
import { getLocalizedTexts } from "@/utils/language";
import { useGlobal } from "@/global-context/global";

type LogoutDialogProps = {
	isOpen: boolean;
	onCancel: () => void;
	onLogout: () => void;
};

export default function LogoutDialog({
	isOpen,
	onCancel,
	onLogout,
}: LogoutDialogProps) {
	const { isDarkTheme, language } = useGlobal();
	const theme = getTheme(isDarkTheme);
	const captions = getLocalizedTexts(language);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onCancel}
			/>

			<div
				className={`
					relative w-[90%] max-w-md rounded-2xl p-6
					border ${theme.cardBorder}
					${theme.cardBg}
					shadow-2xl
				`}
			>
				<h2
					className={`
						text-xl font-semibold mb-3
						${theme.headingColor}
					`}
				>
					{captions.logoutTitle ?? "Logout"}
				</h2>

				<p className={`mb-6 text-sm ${theme.subtextColor}`}>
					{captions.logoutDescription ??
						"Are you sure you want to logout from this account?"}
				</p>

				<div className={`h-px w-full mb-6 ${theme.divider}`} />

				<div className="flex justify-end gap-3">
					<button
						onClick={onCancel}
						className={`
							cursor-pointer px-4 py-2 rounded-lg text-sm font-medium
							transition
							${theme.subtextColor}
							hover:opacity-80
						`}
					>
						{captions.cancel ?? "Cancel"}
					</button>

					<button
						onClick={onLogout}
						className={`
							cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold
							bg-red-500 hover:bg-red-600
							text-white
							transition
						`}
					>
						{captions.logout ?? "Logout"}
					</button>
				</div>
			</div>
		</div>
	);
}