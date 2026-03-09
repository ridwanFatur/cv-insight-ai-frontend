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

	if (loading) return <div className="p-6">{captions.profileLoading}</div>

	return (
		<div className={`w-full h-full p-6 ${theme.textPrimary}`}>
			<h1 className="text-2xl font-bold mb-4">{captions.profileTitle}</h1>

			<div className={`${theme.cardBg} p-4 rounded-lg shadow-md space-y-2`}>
				<p>
					<span className="font-semibold">{captions.profileName}</span> {user?.name}
				</p>
				<p>
					<span className="font-semibold">{captions.profileEmail}</span> {user?.email}
				</p>
				<p>
					<span className="font-semibold">{captions.profileTotalTokens}</span> {totalTokens}
				</p>
			</div>
		</div>
	)
}