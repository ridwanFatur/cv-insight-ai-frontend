import { useRef, useState } from "react"
import { getLocalizedTexts } from "@/utils/language"
import { getTheme } from "@/utils/theme"
import { useGlobal } from "@/global-context/global"

type FileUploadProps = {
	onAttachFile?: (file: File) => void
}

export default function FileUpload({ onAttachFile }: FileUploadProps) {
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
            ${isDragging ? theme.dragBorder + " " + theme.dragBg : theme.cardBorder}
          `}
				>
					<p className={`${theme.textPrimary} font-medium`}>
						{captions.fileUploadDrag}
					</p>
					<p className={`${theme.textSecondary} text-sm mt-1`}>
						{captions.fileUploadBrowse}
					</p>
				</div>
			) : (
				<div className={`flex items-center justify-between p-4 border rounded-xl ${theme.fileCardBg} ${theme.fileCardBorder}`}>
					<div className="flex items-center gap-3">
						<div className="p-2 bg-red-100 text-red-600 rounded-lg">
							{captions.fileUploadLabel}
						</div>
						<div>
							<p className={`${theme.fileNameText} text-sm font-medium`}>
								{file.name}
							</p>
							<p className={`${theme.fileSizeText} text-xs`}>
								{(file.size / 1024 / 1024).toFixed(2)} MB
							</p>
						</div>
					</div>

					<button
						type="button"
						onClick={removeFile}
						className={`${theme.textSecondary} text-sm hover:opacity-80 font-medium`}
					>
						{captions.fileUploadRemove}
					</button>
				</div>
			)}

			{error && (
				<p className={`${theme.errorText} text-sm mt-2`}>{error}</p>
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