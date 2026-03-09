import { useRef, useState } from "react"
import { getLocalizedTexts } from "@/utils/language"
import { getTheme } from "@/utils/theme"
import { useGlobal } from "@/global-context/global"

type FileUploadProps = {
	onAttachFile?: (file: File) => void
	uploading?: boolean
}

export default function FileUpload({ onAttachFile, uploading }: FileUploadProps) {
	const { isDarkTheme, language } = useGlobal()
	const theme = getTheme(isDarkTheme)
	const captions = getLocalizedTexts(language)

	const inputRef = useRef<HTMLInputElement | null>(null)

	const [file, setFile] = useState<File | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleFile = (selectedFile: File) => {
		if (selectedFile.type !== "application/pdf") {
			setError(captions.fileUploadOnlyPdf)
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
		if (uploading) return

		setFile(null)
		setError(null)

		if (inputRef.current) {
			inputRef.current.value = ""
		}
	}

	return (
		<div className="w-full">

			{/* Upload Area */}
			{!file ? (
				<div
					onClick={() => inputRef.current?.click()}
					onDragOver={(e) => {
						e.preventDefault()
						setIsDragging(true)
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={handleDrop}
					className={`flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-2xl cursor-pointer transition
					${isDragging
							? `${theme.dragBorder} ${theme.dragBg}`
							: `${theme.cardBorder} ${theme.cardBg}`
						}`}
				>

					<div className="text-3xl mb-3">📄</div>

					<p className={`font-semibold ${theme.textPrimary}`}>
						{captions.fileUploadDrag}
					</p>

					<p className={`text-sm mt-1 ${theme.textSecondary}`}>
						{captions.fileUploadBrowse}
					</p>

					<p className={`text-xs mt-3 ${theme.textSecondary}`}>
						PDF only • Max 10MB
					</p>

				</div>
			) : (
				<div className={`flex items-center justify-between p-4 border rounded-xl ${theme.fileCardBg} ${theme.fileCardBorder}`}>

					<div className="flex items-center gap-3">

						<div className="text-2xl">📄</div>

						<div>
							<p className={`text-sm font-semibold ${theme.fileNameText}`}>
								{file.name}
							</p>

							<p className={`text-xs ${theme.fileSizeText}`}>
								{(file.size / 1024 / 1024).toFixed(2)} MB
							</p>
						</div>

					</div>

					<button
						type="button"
						onClick={removeFile}
						disabled={uploading}
						className={`text-sm font-medium ${theme.textSecondary} hover:opacity-80 ${uploading ? "cursor-not-allowed" : "cursor-pointer"
							}`}
					>
						{captions.fileUploadRemove}
					</button>

				</div>
			)}

			{error && (
				<p className={`${theme.errorText} text-sm mt-2`}>
					{error}
				</p>
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