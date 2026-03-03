import { Outlet } from "react-router-dom";
import { getTheme } from "@/utils/theme";
import { useGlobal } from "@/global-context/global";
import Header from "./components/Header";
import MobileSidebar from "./components/MobileSiedbar";
import Footer from "./components/Footer";
import LogoutDialog from "@/components/LogoutDialog";

export default function MainLayout() {
	const { isDarkTheme, isLogoutOpen, setIsLogoutOpen, handleLogout } = useGlobal();
	const theme = getTheme(isDarkTheme);

	return (
		<div className={`min-h-dvh flex flex-col ${theme.pageBg}`}>
			<Header />
			<MobileSidebar />
			<main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
				<Outlet />
			</main>
			<Footer />
			<LogoutDialog
				isOpen={isLogoutOpen}
				onCancel={() => setIsLogoutOpen(false)}
				onLogout={handleLogout}
			/>
		</div>
	);
}