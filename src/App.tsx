import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import MainLayout from "./layouts/MainLayout"
import GoogleAuthCallback from "./callbacks/GoogleAuthCallback"
import LoadingPage from "./components/LoadingPage"
import ProfilePage from "./pages/profile/ProfilePage"
import UploadedCVPage from "./pages/uploaded-cv/UploadedCVPage"
import { useGlobal } from "./global-context/global"

function App() {
	const { isAppLoaded, user } = useGlobal()

	if (!isAppLoaded) {
		return <LoadingPage />
	}

	if (!user) {
		return (
			<div className="w-full h-dvh">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</div>
		)
	}

	return (
		<div className="w-full h-dvh">
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/uploaded-cv" element={<UploadedCVPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
