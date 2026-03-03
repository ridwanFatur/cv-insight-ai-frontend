import HomePageProvider, { useHomePage } from "./home-page-context"
import FileUpload from "@/components/FileUpload"

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

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<p className="text-gray-500">Loading your tokens...</p>
			</div>
		)
	}

	return (
		<div className="max-w-xl mx-auto mt-10 space-y-6">

			{/* Token Info */}
			<div className="p-4 rounded-xl bg-gray-100">
				<p className="text-sm text-gray-500">
					Available Tokens
				</p>
				<p className="text-2xl font-bold text-gray-800">
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
					className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
					onClick={handleUpload}
					disabled={uploading}
				>
					{uploading ? "Processing..." : "Upload & Review"}
				</button>
			)}

			{/* CV Feedback Result */}
			{cvFeedback && (
				<div className="p-6 rounded-xl border bg-white shadow-sm space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-semibold">
							CV Review Result
						</h2>
						<a
							href={cvFeedback.file_link}
							target="_blank"
							className="text-sm text-blue-600 hover:underline"
						>
							View File
						</a>
					</div>

					<div className="text-sm text-gray-700 whitespace-pre-line">
						{cvFeedback.feedback}
					</div>

					<p className="text-xs text-gray-400">
						Reviewed at {new Date(cvFeedback.created_at).toLocaleString()}
					</p>
				</div>
			)}
		</div>
	)
}