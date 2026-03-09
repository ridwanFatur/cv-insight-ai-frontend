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
		<div className="max-w-2xl mx-auto px-6 py-10 space-y-8">

			{/* Page Title */}
			<div className="space-y-1">
				<h1 className={`text-2xl font-bold ${theme.headingColor}`}>
					{captions.homeTitle}
				</h1>
				<p className={theme.subtextColor}>
					{captions.homeSubtitle}
				</p>
			</div>

			{/* Token Card */}
			<div className={`p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}`}>
				<p className={`text-sm ${theme.subtextColor}`}>
					{captions.homeAvailableTokens}
				</p>

				<div className="flex items-end justify-between mt-2">
					<p className={`text-3xl font-bold ${theme.textPrimary}`}>
						{totalTokens}
					</p>

					<span className={`text-xs px-3 py-1 rounded-full ${theme.fileCardBg} ${theme.textSecondary}`}>
						AI Credits
					</span>
				</div>
			</div>

			{/* Upload Area */}
			<div className="space-y-4">
				<FileUpload
					onAttachFile={(selectedFile) => {
						setFile(selectedFile)
					}}
				/>

				{file && (
					<button
						className={`w-full py-3 rounded-xl ${theme.primaryButtonBg} ${theme.buttonText} font-semibold transition disabled:opacity-50 hover:${theme.primaryButtonHoverBg}`}
						onClick={handleUpload}
						disabled={uploading}
					>
						{uploading
							? captions.homeProcessing
							: captions.homeUploadReview}
					</button>
				)}
			</div>

			{/* Feedback Result */}
			{cvFeedback && (
				<div className={`p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} space-y-5`}>

					<div className="flex justify-between items-center">
						<h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
							{captions.homeCvReviewResult}
						</h2>

						<a
							href={cvFeedback.file_link}
							target="_blank"
							className={`text-sm font-medium ${theme.link}`}
						>
							{captions.viewFile}
						</a>
					</div>

					<div className={`text-sm whitespace-pre-line leading-relaxed ${theme.textSecondary}`}>
						{cvFeedback.feedback}
					</div>

					<div className="pt-3 border-t border-black/10 dark:border-white/10">
						<p className={`text-xs ${theme.textSecondary}`}>
							{captions.homeReviewedAt}{" "}
							{new Date(cvFeedback.created_at).toLocaleString()}
						</p>
					</div>

				</div>
			)}
		</div>
	)
}