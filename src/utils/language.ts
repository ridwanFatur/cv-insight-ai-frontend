const localizedTexts = {
	en: {
		welcome: "Welcome back",
		signIn: "Sign in to continue",
		googleButton: "Continue with Google",
	},
	id: {
		welcome: "Selamat datang kembali",
		signIn: "Masuk untuk melanjutkan",
		googleButton: "Lanjutkan dengan Google",
	},
};

export function getLocalizedTexts(language: "en" | "id") {
	return localizedTexts[language];
}