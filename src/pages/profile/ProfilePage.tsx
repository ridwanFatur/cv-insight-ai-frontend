import ProfilePageProvider, { useProfilePage } from "./profile-page-context"

export default function ProfilePage() {
	return <ProfilePageProvider>
		<_ProfilePage />
	</ProfilePageProvider>
}

function _ProfilePage() {
	const { user, totalTokens, loading } = useProfilePage()

	if (loading) return <div className="p-6">Loading...</div>

	return (
		<div className="w-full h-full p-6">
			<h1 className="text-2xl font-bold mb-4">Profile Page</h1>

			<div className="bg-white p-4 rounded-lg shadow-md space-y-2">
				<p>
					<span className="font-semibold">Name:</span> {user?.name}
				</p>
				<p>
					<span className="font-semibold">Email:</span> {user?.email}
				</p>
				<p>
					<span className="font-semibold">Total Tokens:</span> {totalTokens}
				</p>
			</div>
		</div>
	)
}