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
	},
};

export function getLocalizedTexts(language: "en" | "id" | undefined) {
	if (language == undefined) {
		return localizedTexts["en"];
	}
	return localizedTexts[language];
}