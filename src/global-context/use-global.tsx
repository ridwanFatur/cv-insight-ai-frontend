import { useContext } from "react"
import { GlobalContext } from "./global-state"

export function useGlobal() {
	const context = useContext(GlobalContext)
	if (!context) throw new Error('useGlobal must be used inside GlobalProvider')

	return context
}