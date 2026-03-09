import ProfilePageProvider, { useProfilePage } from "./profile-page-context"
import { getTheme } from "@/utils/theme"
import { getLocalizedTexts } from "@/utils/language"
import { useGlobal } from "@/global-context/global"

export default function ProfilePage() {
	return <ProfilePageProvider>
		<_ProfilePage />
	</ProfilePageProvider>
}

function _ProfilePage() {
	const { user, totalTokens, loading } = useProfilePage()
	const { isDarkTheme, language } = useGlobal()
	const theme = getTheme(isDarkTheme)
	const captions = getLocalizedTexts(language)

	if (loading) {
		return (
			<div className={`w-full h-full p-6 flex items-center justify-center ${theme.subtextColor}`}>
				{captions.profileLoading}
			</div>
		)
	}

	return (
		<div className={`w-full h-full p-6 ${theme.textPrimary}`}>
			<h1 className={`text-2xl font-bold mb-6 ${theme.headingColor}`}>
				{captions.profileTitle}
			</h1>

			<div
				className={`
					${theme.cardBg}
					${theme.cardBorder}
					border
					rounded-xl
					p-6
					shadow-sm
					max-w-lg
				`}
			>
				<div className="space-y-4">

					<div className="grid grid-cols-3 gap-2">
						<span className={`font-medium ${theme.subtextColor}`}>
							{captions.profileName}
						</span>
						<span className="col-span-2 break-all">{user?.name}</span>
					</div>

					<div className="grid grid-cols-3 gap-2">
						<span className={`font-medium ${theme.subtextColor}`}>
							{captions.profileEmail}
						</span>
						<span className="col-span-2 break-all">{user?.email}</span>
					</div>

					<div className="grid grid-cols-3 gap-2">
						<span className={`font-medium ${theme.subtextColor}`}>
							{captions.profileTotalTokens}
						</span>
						<span className="col-span-2 break-all">{totalTokens}</span>
					</div>

				</div>
			</div>
		</div>
	)
}