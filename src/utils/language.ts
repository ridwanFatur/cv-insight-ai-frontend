const localizedTexts = {
	en: {
		welcome: "Welcome to CV Insight AI",
		signIn: "Upload your CV and get instant AI-powered feedback",
		googleButton: "Continue with Google",
		feature1: "AI-powered resume analysis",
		feature2: "Instant personalized feedback",
		feature3: "Secure & private document processing",
		rights: "All rights reserved.",
		checkCv: "Check Your CV",
		uploadedCv: "Uploaded CV",
		profile: "My Profile",
		builtBy: "Built by",
		github: "GitHub",
		logoutTitle: "Logout Confirmation",
		logoutDescription:
			"Are you sure you want to logout from your account?",
		logout: "Logout",
		cancel: "Cancel",

		fileUploadDrag: "Drag & drop your PDF here",
		fileUploadBrowse: "or click to browse (PDF only)",
		fileUploadOnlyPdf: "Only PDF files are allowed.",
		fileUploadLabel: "PDF",
		fileUploadRemove: "Remove",

		homeLoadingTokens: "Loading your tokens...",
		homeAvailableTokens: "Available Tokens",
		homeProcessing: "Processing...",
		homeUploadReview: "Upload & Review",
		homeCvReviewResult: "CV Review Result",
		viewFile: "View File",
		homeReviewedAt: "Reviewed at",

		profileTitle: "Profile Page",
		profileLoading: "Loading...",
		profileName: "Name:",
		profileEmail: "Email:",
		profileTotalTokens: "Total Tokens:",

		uploadedCvTitle: "Uploaded CV List",
		uploadedCvLoading: "Loading...",
		uploadedCvNoData: "No CV uploaded yet.",
		uploadedCvUploadedAt: "Uploaded at:",
		uploadedCvFeedbackLabel: "Feedback:",

		paginationPrev: "Prev",
		paginationNext: "Next",
		paginationPageOf: "Page {{page}} of {{total}}",

		darkMode: "Dark",
		lightMode: "Light",
		switchToEnglish: "Switch to English",
		switchToBahasa: "Ganti ke Bahasa",
	},

	id: {
		welcome: "Selamat datang di CV Insight AI",
		signIn: "Upload CV kamu dan dapatkan feedback instan dari AI",
		googleButton: "Lanjutkan dengan Google",
		feature1: "Analisis CV berbasis AI",
		feature2: "Feedback personal secara instan",
		feature3: "Proses dokumen aman & privat",
		rights: "Hak cipta dilindungi.",
		checkCv: "Cek CV Kamu",
		uploadedCv: "CV Terunggah",
		profile: "Profil Saya",
		builtBy: "Dibuat oleh",
		github: "GitHub",
		logoutTitle: "Konfirmasi Logout",
		logoutDescription:
			"Apakah kamu yakin ingin keluar dari akun ini?",
		logout: "Keluar",
		cancel: "Batal",

		fileUploadDrag: "Tarik & jatuhkan PDF kamu di sini",
		fileUploadBrowse: "atau klik untuk mencari (hanya PDF)",
		fileUploadOnlyPdf: "Hanya file PDF yang diperbolehkan.",
		fileUploadLabel: "PDF",
		fileUploadRemove: "Hapus",

		homeLoadingTokens: "Memuat token kamu...",
		homeAvailableTokens: "Token Tersedia",
		homeProcessing: "Memproses...",
		homeUploadReview: "Unggah & Tinjau",
		homeCvReviewResult: "Hasil Tinjauan CV",
		viewFile: "Lihat Berkas",
		homeReviewedAt: "Ditinjau pada",

		profileTitle: "Halaman Profil",
		profileLoading: "Memuat...",
		profileName: "Nama:",
		profileEmail: "Email:",
		profileTotalTokens: "Total Token:",

		uploadedCvTitle: "Daftar CV Terunggah",
		uploadedCvLoading: "Memuat...",
		uploadedCvNoData: "Belum ada CV yang terunggah.",
		uploadedCvUploadedAt: "Diunggah pada:",
		uploadedCvFeedbackLabel: "Umpan Balik:",

		paginationPrev: "Sebelumnya",
		paginationNext: "Berikutnya",
		paginationPageOf: "Halaman {{page}} dari {{total}}",

		darkMode: "Gelap",
		lightMode: "Terang",
		switchToEnglish: "Switch to English",
		switchToBahasa: "Ganti ke Bahasa",
	},
};

export function getLocalizedTexts(language: "en" | "id" | undefined) {
	if (language == undefined) {
		return localizedTexts["en"];
	}
	return localizedTexts[language];
}