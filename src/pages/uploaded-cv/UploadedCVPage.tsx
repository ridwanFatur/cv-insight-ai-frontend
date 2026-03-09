import UploadedCVPageProvider, { useUploadedCVPage } from "./uploaded-cv-page-context"
import { getTheme } from "@/utils/theme"
import { getLocalizedTexts } from "@/utils/language"
import { useGlobal } from "@/global-context/global"

export default function UploadedCVPage() {
	return <UploadedCVPageProvider>
		<_UploadedCVPage />
	</UploadedCVPageProvider>
}

function _UploadedCVPage() {
	const {
		data,
		page,
		totalPages,
		loading,
		setPage,
	} = useUploadedCVPage()
	const { isDarkTheme, language } = useGlobal()
	const theme = getTheme(isDarkTheme)
	const captions = getLocalizedTexts(language)

	return (
		<div className={`w-full h-full p-6 ${theme.textPrimary}`}>
			<h1 className="text-2xl font-bold mb-6">{captions.uploadedCvTitle}</h1>

			{loading && <p>{captions.uploadedCvLoading}</p>}

			{!loading && data.length === 0 && (
				<p>{captions.uploadedCvNoData}</p>
			)}

			<div className="space-y-4">
				{data.map((cv) => (
					<div
						key={cv.id}
						className={`${theme.cardBg} p-4 border ${theme.cardBorder} rounded-lg shadow-sm`}
					>
						<p className={`${theme.subtextColor} text-sm`}>
							{captions.uploadedCvUploadedAt} {new Date(cv.created_at).toLocaleString()}
						</p>

						<a
							href={cv.file_link}
							target="_blank"
							rel="noopener noreferrer"
							className={`${theme.link} underline text-sm`}
						>
							{captions.viewFile}
						</a>

						<div className="mt-2">
							<p className="text-sm font-semibold">{captions.uploadedCvFeedbackLabel}</p>
							<p className="text-sm whitespace-pre-wrap">
								{cv.feedback}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center gap-4 mt-6">
					<button
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
						className="px-3 py-1 border rounded disabled:opacity-50"
					>
						{captions.paginationPrev}
					</button>

					<span>
						{captions.paginationPageOf.replace("{{page}}", String(page)).replace("{{total}}", String(totalPages))}
					</span>

					<button
						disabled={page === totalPages}
						onClick={() => setPage(page + 1)}
						className="px-3 py-1 border rounded disabled:opacity-50"
					>
						{captions.paginationNext}
					</button>
				</div>
			)}
		</div>
	)
}