import HomePageProvider, { useHomePage } from "./home-page-context"
import FileUpload from "@/components/FileUpload"
import { getTheme } from "@/utils/theme"
import { getLocalizedTexts } from "@/utils/language"
import { useGlobal } from "@/global-context/global"

export default function HomePage() {
	return (
		<HomePageProvider>
			<_HomePage />
		</HomePageProvider>
	)
}

function _HomePage() {
	const {
		totalTokens,
		loading,
		file,
		setFile,
		cvFeedback,
		uploading,
		handleUpload,
	} = useHomePage()
	const { isDarkTheme, language } = useGlobal()
	const theme = getTheme(isDarkTheme)
	const captions = getLocalizedTexts(language)

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<p className={theme.subtextColor}>{captions.homeLoadingTokens}</p>
			</div>
		)
	}

	return (
		<div className="max-w-xl mx-auto mt-10 space-y-6">

			{/* Token Info */}
			<div className={`p-4 rounded-xl ${theme.cardBg}`}> 
				<p className={`text-sm ${theme.subtextColor}`}>
					{captions.homeAvailableTokens}
				</p>
				<p className={`text-2xl font-bold ${theme.textPrimary}`}>
					{totalTokens}
				</p>
			</div>

			{/* File Upload */}
			<FileUpload
				onAttachFile={(selectedFile) => {
					setFile(selectedFile)
				}}
			/>

			{/* Upload Button */}
			{file && (
				<button
					className={`w-full py-3 rounded-xl ${theme.primaryButtonBg} ${theme.buttonText} font-semibold transition disabled:opacity-50 hover:${theme.primaryButtonHoverBg}`}
					onClick={handleUpload}
					disabled={uploading}
				>
					{uploading ? captions.homeProcessing : captions.homeUploadReview}
				</button>
			)}

			{/* CV Feedback Result */}
			{cvFeedback && (
				<div className={`p-6 rounded-xl border ${theme.cardBorder} ${theme.cardBg} shadow-sm space-y-4`}>
					<div className="flex justify-between items-center">
						<h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
							{captions.homeCvReviewResult}
						</h2>
						<a
							href={cvFeedback.file_link}
							target="_blank"
							className={`text-sm ${theme.link}`}
						>
							{captions.viewFile}
						</a>
					</div>

					<div className={`${theme.textSecondary} text-sm whitespace-pre-line`}>
						{cvFeedback.feedback}
					</div>

					<p className={`${theme.textSecondary} text-xs`}>
						{captions.homeReviewedAt} {new Date(cvFeedback.created_at).toLocaleString()}
					</p>
				</div>
			)}
		</div>
	)
}