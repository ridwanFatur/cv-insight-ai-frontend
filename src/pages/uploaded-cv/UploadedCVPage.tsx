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

			{/* Title */}
			<h1 className={`text-2xl font-bold mb-6 ${theme.headingColor}`}>
				{captions.uploadedCvTitle}
			</h1>

			{loading && (
				<p className={theme.subtextColor}>
					{captions.uploadedCvLoading}
				</p>
			)}

			{!loading && data.length === 0 && (
				<p className={theme.subtextColor}>
					{captions.uploadedCvNoData}
				</p>
			)}

			{/* List */}
			<div className="space-y-4">
				{data.map((cv) => {

					const isFinished = cv.status === "finished"

					return (
						<div
							key={cv.id}
							className={`
								${theme.cardBg}
								${theme.cardBorder}
								border
								rounded-xl
								p-5
								shadow-sm
								space-y-3
							`}
						>

							{/* Header */}
							<div className="flex items-center justify-between">

								<p className={`text-sm ${theme.subtextColor}`}>
									{captions.uploadedCvUploadedAt}{" "}
									{new Date(cv.created_at).toLocaleString()}
								</p>

								{/* Status */}
								<span
									className={`
										text-xs px-2 py-1 rounded-full
										${isFinished
											? "bg-green-500/20 text-green-400"
											: "bg-yellow-500/20 text-yellow-400"}
									`}
								>
									{isFinished ? "Finished" : "Processing"}
								</span>

							</div>

							{/* File link */}
							<a
								href={cv.file_link}
								target="_blank"
								rel="noopener noreferrer"
								className={`${theme.link} text-sm underline`}
							>
								{captions.viewFile}
							</a>

							{/* Feedback */}
							{isFinished ? (
								<div className="space-y-1">
									<p className="text-sm font-semibold">
										{captions.uploadedCvFeedbackLabel}
									</p>

									<div
										className={`
											text-sm
											whitespace-pre-wrap
											${theme.subtextColor}
											border
											${theme.cardBorder}
											rounded-lg
											p-3
										`}
									>
										{cv.feedback}
									</div>
								</div>
							) : (
								<div className={`text-sm ${theme.subtextColor}`}>
									⏳ CV is still being analyzed...
								</div>
							)}
						</div>
					)
				})}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center gap-4 mt-6">

					<button
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
						className={`
							px-3 py-1
							border
							rounded
							${theme.cardBorder}
							disabled:opacity-40
						`}
					>
						{captions.paginationPrev}
					</button>

					<span className={theme.subtextColor}>
						{captions.paginationPageOf
							.replace("{{page}}", String(page))
							.replace("{{total}}", String(totalPages))}
					</span>

					<button
						disabled={page === totalPages}
						onClick={() => setPage(page + 1)}
						className={`
							px-3 py-1
							border
							rounded
							${theme.cardBorder}
							disabled:opacity-40
						`}
					>
						{captions.paginationNext}
					</button>

				</div>
			)}
		</div>
	)
}