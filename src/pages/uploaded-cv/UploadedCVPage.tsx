import UploadedCVPageProvider, { useUploadedCVPage } from "./uploaded-cv-page-context"

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

	return (
		<div className="w-full h-full p-6">
			<h1 className="text-2xl font-bold mb-6">Uploaded CV List</h1>

			{loading && <p>Loading...</p>}

			{!loading && data.length === 0 && (
				<p>No CV uploaded yet.</p>
			)}

			<div className="space-y-4">
				{data.map((cv) => (
					<div
						key={cv.id}
						className="p-4 border rounded-lg shadow-sm bg-white"
					>
						<p className="text-sm text-gray-500">
							Uploaded at: {new Date(cv.created_at).toLocaleString()}
						</p>

						<a
							href={cv.file_link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 underline text-sm"
						>
							View File
						</a>

						<div className="mt-2">
							<p className="text-sm font-semibold">Feedback:</p>
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
						Prev
					</button>

					<span>
						Page {page} of {totalPages}
					</span>

					<button
						disabled={page === totalPages}
						onClick={() => setPage(page + 1)}
						className="px-3 py-1 border rounded disabled:opacity-50"
					>
						Next
					</button>
				</div>
			)}
		</div>
	)
}