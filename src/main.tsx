import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import GlobalProvider from './global-context/global.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/query-client.ts'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</QueryClientProvider>
	</BrowserRouter>
)
