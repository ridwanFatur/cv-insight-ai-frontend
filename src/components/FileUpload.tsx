import { useRef, useState } from "react"

type FileUploadProps = {
	onAttachFile?: (file: File) => void
}

export default function FileUpload({ onAttachFile }: FileUploadProps) {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleFile = (selectedFile: File) => {
		if (selectedFile.type !== "application/pdf") {
			setError("Only PDF files are allowed.")
			return
		}

		setError(null)
		setFile(selectedFile)
		onAttachFile?.(selectedFile)
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)

		const droppedFile = e.dataTransfer.files?.[0]
		if (droppedFile) {
			handleFile(droppedFile)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			handleFile(selectedFile)
		}
	}

	const removeFile = () => {
		setFile(null)
		setError(null)
		if (inputRef.current) {
			inputRef.current.value = ""
		}
	}

	return (
		<div className="w-full max-w-md">
			{!file ? (
				<div
					onClick={() => inputRef.current?.click()}
					onDragOver={(e) => {
						e.preventDefault()
						setIsDragging(true)
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={handleDrop}
					className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          `}
				>
					<p className="text-gray-600 font-medium">
						Drag & drop your PDF here
					</p>
					<p className="text-sm text-gray-400 mt-1">
						or click to browse (PDF only)
					</p>
				</div>
			) : (
				<div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-red-100 text-red-600 rounded-lg">
							PDF
						</div>
						<div>
							<p className="text-sm font-medium text-gray-800">
								{file.name}
							</p>
							<p className="text-xs text-gray-400">
								{(file.size / 1024 / 1024).toFixed(2)} MB
							</p>
						</div>
					</div>

					<button
						type="button"
						onClick={removeFile}
						className="text-sm text-red-500 hover:text-red-600 font-medium"
					>
						Remove
					</button>
				</div>
			)}

			{error && (
				<p className="text-sm text-red-500 mt-2">{error}</p>
			)}

			<input
				ref={inputRef}
				type="file"
				accept="application/pdf"
				className="hidden"
				onChange={handleChange}
			/>
		</div>
	)
}