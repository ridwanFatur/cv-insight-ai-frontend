export const ENDPOINT = {
	root: "/",
	user: "/api/user",
	auth: "/api/auth",
	userToken: "/api/user-token",
	cvFeedback: "/api/cv-feedback",
}
export const WS_URL = import.meta.env.VITE_BACKEND_API_URL.replace("http://", "ws://").replace(
	"https://",
	"wss://"
)